const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const subscribeAttempts = new Map<string, { count: number; resetAt: number }>();

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://api.github.com; frame-src 'self' https://open.spotify.com https://github.com https://binarybattles.dev https://dev.to https://www.linkedin.com",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...SECURITY_HEADERS },
  });
}

function clientKey(request: Request) {
  return request.headers.get("CF-Connecting-IP") || "anonymous";
}

function isRateLimited(
  bucket: Map<string, { count: number; resetAt: number }>,
  key: string,
  limit: number,
  windowMs: number
) {
  const now = Date.now();
  const current = bucket.get(key);
  if (!current || current.resetAt <= now) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

function isAllowedRequest(request: Request, env: Env) {
  const fetchSite = request.headers.get("Sec-Fetch-Site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("Origin");
  return !origin || !env.PUBLIC_ORIGIN || origin === env.PUBLIC_ORIGIN;
}

function hasValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function readJson(request: Request) {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new Error("Expected a JSON request.");
  }
  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 16_384) {
    throw new Error("Request too large.");
  }
  return JSON.parse(body) as Record<string, unknown>;
}

function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, { status: response.status, headers });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: { Allow: "POST, OPTIONS", ...SECURITY_HEADERS },
        });
      }
      const isSubscribeHealthCheck =
        url.pathname === "/api/subscribe" && request.method === "GET";
      if (request.method !== "POST" && !isSubscribeHealthCheck) {
        return jsonResponse({ error: "Method not allowed." }, 405);
      }
      if (request.method === "POST" && !isAllowedRequest(request, env)) {
        return jsonResponse({ error: "Origin not allowed." }, 403);
      }
    }

    // Handle /api/subscribe
    if (url.pathname === "/api/subscribe" && request.method === "POST") {
      try {
        if (isRateLimited(subscribeAttempts, clientKey(request), 3, 60 * 60 * 1000)) {
          return jsonResponse({ error: "Too many attempts. Try again later." }, 429);
        }
        const { email, name } = await readJson(request);

        if (!hasValidEmail(email) || email.length > 254 || (typeof name === "string" && name.length > 100)) {
          return jsonResponse({ error: "A valid email address is required." }, 400);
        }

        const normalizedEmail = email.toLowerCase().trim();
        if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
          return jsonResponse({ error: "Newsletter signup is not configured yet." }, 503);
        }

        const resendResponse = await fetch(
          `https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: normalizedEmail,
              first_name: typeof name === "string" ? name.trim() : undefined,
              unsubscribed: false,
            }),
          }
        );
        if (!resendResponse.ok) {
          console.error("Resend newsletter signup failed:", await resendResponse.text());
          return jsonResponse({ error: "Unable to subscribe right now." }, 502);
        }
        return jsonResponse({ message: "Subscribed successfully!" });
      } catch (error) {
        return jsonResponse(
          { error: error instanceof Error ? error.message : "Something went wrong." },
          400
        );
      }
    }

    // Handle /api/subscribe GET
    if (url.pathname === "/api/subscribe" && request.method === "GET") {
      return jsonResponse({ message: "Subscribe endpoint is live." });
    }

    // Handle /api/contact
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        if (isRateLimited(contactAttempts, clientKey(request), 5, 60 * 60 * 1000)) {
          return jsonResponse({ error: "Too many attempts. Try again later." }, 429);
        }
        const { name, email, subject, message, website } = await readJson(request);

        if (
          typeof name !== "string" ||
          typeof message !== "string" ||
          !name.trim() ||
          !message.trim() ||
          !hasValidEmail(email) ||
          name.length > 100 ||
          email.length > 254 ||
          (typeof subject !== "undefined" && (typeof subject !== "string" || subject.length > 160)) ||
          message.length > 5000
        ) {
          return jsonResponse({ error: "Please provide a valid name, email, subject, and message." }, 400);
        }
        if (typeof website === "string" && website.trim()) {
          return jsonResponse({ success: true, message: "Message delivered successfully." });
        }

        if (!env.RESEND_API_KEY) {
          return jsonResponse({ error: "Contact email is not configured yet." }, 503);
        }

        const senderName = name.trim();
        const senderEmail = email.trim().toLowerCase();
        const emailSubject =
          typeof subject === "string" && subject.trim()
            ? subject.trim()
            : `Message from ${senderName}`;
        const emailMessage = message.trim();

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: env.CONTACT_FROM_EMAIL || "Heetworld Contact <onboarding@resend.dev>",
            to: [env.CONTACT_TO_EMAIL || "explore@heetworld.tech"],
            reply_to: senderEmail,
            subject: emailSubject,
            text: `Name: ${senderName}\nEmail: ${senderEmail}\n\n${emailMessage}`,
          }),
        });

        if (!resendResponse.ok) {
          console.error("Resend contact email failed:", await resendResponse.text());
          return jsonResponse({ error: "Unable to deliver the message right now." }, 502);
        }

        return new Response(
          JSON.stringify({ success: true, message: "Message delivered successfully." }),
          { headers: { "Content-Type": "application/json", ...SECURITY_HEADERS } }
        );
      } catch {
        return jsonResponse({ error: "Failed to send message." }, 400);
      }
    }

    // Fallback: serve static assets
    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};

export default worker;

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  RESEND_AUDIENCE_ID?: string;
  PUBLIC_ORIGIN?: string;
}
