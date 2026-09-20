export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle /api/subscribe
    if (url.pathname === "/api/subscribe" && request.method === "POST") {
      try {
        const { email, name } = await request.json();

        if (!email || typeof email !== "string" || !email.includes("@")) {
          return new Response(
            JSON.stringify({ error: "A valid email address is required." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        const normalizedEmail = email.toLowerCase().trim();

        console.log("New subscriber:", JSON.stringify({
          email: normalizedEmail,
          name: name?.trim() || undefined,
          subscribedAt: new Date().toISOString(),
        }));

        return new Response(
          JSON.stringify({ message: "Subscribed successfully!" }),
          { headers: { "Content-Type": "application/json" } }
        );
      } catch {
        return new Response(
          JSON.stringify({ error: "Something went wrong." }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Handle /api/subscribe GET
    if (url.pathname === "/api/subscribe" && request.method === "GET") {
      return new Response(
        JSON.stringify({ message: "Subscribe endpoint is live." }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle /api/contact
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const { name, email, subject, message } = await request.json();

        if (!name || !email || !message) {
          return new Response(
            JSON.stringify({ error: "Name, email, and message are required." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        console.log("Contact form submission:", JSON.stringify({
          name, email, subject, message,
          submittedAt: new Date().toISOString(),
        }));

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { "Content-Type": "application/json" } }
        );
      } catch {
        return new Response(
          JSON.stringify({ error: "Failed to send message." }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Fallback: serve static assets
    return (env.ASSETS as any).fetch(request);
  },
};

interface Env {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ASSETS: any;
}
