"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to subscribe");

      setStatus("success");
      setMessage(data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Newsletter
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        Get notified when new projects, experiments, and blog posts are
        published.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          required
          className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="shrink-0 rounded-lg bg-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status !== "idle" && message && (
        <p
          className={`mt-2 font-mono text-[11px] ${
            status === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
