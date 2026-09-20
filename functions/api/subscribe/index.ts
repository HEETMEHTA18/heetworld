export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const { email, name } = await context.request.json();

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
  } catch (error) {
    console.error("Subscribe error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
