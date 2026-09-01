"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const domain = site.url.replace(/^https?:\/\//, "");

    const subject = `Message from ${name || "your portfolio"} — via ${domain}`;
    const body = `${message}\n\n— ${name}\n${email}`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setOpened(true);
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        placeholder="Jane Doe"
        autoComplete="name"
        required
      />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="jane@example.com"
        autoComplete="email"
        required
      />
      <Textarea
        name="message"
        label="Message"
        placeholder="What's this about?"
        rows={5}
        required
      />
      <Button
        type="submit"
        variant="primary"
        className="inline-flex items-center gap-2 self-start"
      >
        <span>Send Message</span>
        <Send className="h-3.5 w-3.5" />
      </Button>
      {opened ? (
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Opening your mail app… if it doesn&apos;t, email {site.email} directly.
        </p>
      ) : null}
    </form>
  );
}