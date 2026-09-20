"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

type TerminalLine = {
  type: "input" | "output" | "success" | "error" | "link";
  text: string;
  href?: string;
  label?: string;
};

interface TerminalWidgetProps {
  mode: "contact";
}

export function TerminalWidget({ mode }: TerminalWidgetProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<
    "idle" | "email" | "name" | "subject" | "message" | "confirm" | "done"
  >("idle");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setLines([
      { type: "output", text: "Heet Mehta — AI / ML · Software · Experiments" },
      { type: "output", text: "" },
      { type: "output", text: "Email is the fastest way to reach me." },
      { type: "output", text: "I reply within 24 hours." },
      { type: "output", text: "" },
      { type: "output", text: 'Type "contact" to send a message, or "social" for links.' },
      { type: "output", text: "" },
    ]);
  }, [mode]);

  const handleSendEmail = useCallback(async () => {
    if (!email || !name) return;
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setLines((prev) => [
        ...prev,
        { type: "input", text: `> ${email}` },
        { type: "output", text: "" },
        { type: "success", text: "Message sent successfully!" },
        { type: "output", text: `  From: ${name} <${email}>` },
        { type: "output", text: `  To: explore@heetworld.tech` },
        {
          type: "output",
          text: `  Subject: ${subject || `Hello from ${name}`}`,
        },
        { type: "output", text: "" },
        { type: "output", text: "A confirmation has been sent to your email." },
        { type: "output", text: "I'll get back to you within 24 hours." },
        { type: "output", text: "" },
        { type: "output", text: "Thanks for reaching out!" },
      ]);
    } catch {
      setLines((prev) => [
        ...prev,
        { type: "input", text: `> ${email}` },
        {
          type: "error",
          text: "Failed to send. Try again or email explore@heetworld.tech directly.",
        },
      ]);
    }

    setSending(false);
    setStep("done");
    setEmail("");
    setName("");
    setSubject("");
    setMessage("");
  }, [email, name, subject, message]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      if (step === "idle" && trimmed.toLowerCase() === "contact") {
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          { type: "output", text: "" },
          { type: "output", text: "Let's get in touch." },
          { type: "output", text: "What's your name?" },
        ]);
        setStep("name");
      } else if (step === "idle" && trimmed.toLowerCase() === "social") {
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          { type: "output", text: "" },
          {
            type: "link",
            text: "GitHub",
            href: "https://github.com/heetmehta18",
            label: "github.com/heetmehta18",
          },
          {
            type: "link",
            text: "LinkedIn",
            href: "https://linkedin.com/in/heetmehta18",
            label: "linkedin.com/in/heetmehta18",
          },
          {
            type: "link",
            text: "Twitter",
            href: "https://x.com/heetmehta33176",
            label: "x.com/heetmehta33176",
          },
          {
            type: "link",
            text: "Email",
            href: "mailto:explore@heetworld.tech",
            label: "explore@heetworld.tech",
          },
          { type: "output", text: "" },
        ]);
      } else if (step === "idle" && trimmed.toLowerCase() === "clear") {
        setLines([]);
      } else if (step === "idle" && trimmed.toLowerCase() === "help") {
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          { type: "output", text: "" },
          { type: "output", text: "Available commands:" },
          { type: "output", text: "  contact  Send a message" },
          { type: "output", text: "  social   View social links" },
          { type: "output", text: "  clear    Clear terminal" },
          { type: "output", text: "  help     Show this help" },
          { type: "output", text: "" },
        ]);
      } else if (step === "name") {
        setName(trimmed);
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          { type: "output", text: "" },
          { type: "output", text: `Hey ${trimmed}. What's your email?` },
        ]);
        setStep("email");
      } else if (step === "email") {
        if (!trimmed.includes("@") || !trimmed.includes(".")) {
          setLines((prev) => [
            ...prev,
            { type: "input", text: `> ${trimmed}` },
            { type: "error", text: "Invalid email. Try again." },
          ]);
        } else {
          setEmail(trimmed);
          setLines((prev) => [
            ...prev,
            { type: "input", text: `> ${trimmed}` },
            { type: "output", text: "" },
            { type: "output", text: "What's this about? (brief subject)" },
          ]);
          setStep("subject");
        }
      } else if (step === "subject") {
        setSubject(trimmed);
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          { type: "output", text: "" },
          { type: "output", text: "Write your message:" },
        ]);
        setStep("message");
      } else if (step === "message") {
        setMessage(trimmed);
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          { type: "output", text: "" },
          { type: "output", text: "Preview:" },
          { type: "output", text: `  To: explore@heetworld.tech` },
          { type: "output", text: `  From: ${name} <${email}>` },
          { type: "output", text: `  Subject: ${subject}` },
          { type: "output", text: `  Message: ${trimmed}` },
          { type: "output", text: "" },
          {
            type: "output",
            text: 'Type "send" to open your email client, or "cancel" to abort.',
          },
        ]);
        setStep("confirm");
      } else if (step === "confirm") {
        if (trimmed.toLowerCase() === "send") {
          handleSendEmail();
        } else {
          setLines((prev) => [
            ...prev,
            { type: "input", text: `> ${trimmed}` },
            { type: "output", text: "Cancelled. Message discarded." },
            { type: "output", text: "" },
          ]);
          setStep("idle");
          setEmail("");
          setName("");
          setSubject("");
          setMessage("");
        }
      } else {
        setLines((prev) => [
          ...prev,
          { type: "input", text: `> ${trimmed}` },
          {
            type: "error",
            text: `Command not found: ${trimmed}. Type "help" for commands.`,
          },
        ]);
      }

      setInput("");
    },
    [input, step, handleSendEmail]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape" && step !== "idle") {
        setLines((prev) => [
          ...prev,
          { type: "output", text: "Cancelled." },
          { type: "output", text: "" },
        ]);
        setStep("idle");
        setEmail("");
        setName("");
        setSubject("");
        setMessage("");
        setInput("");
      }
    },
    [step]
  );

  const promptLabel =
    step === "email"
      ? "email"
      : step === "name"
        ? "name"
        : step === "subject"
          ? "subject"
          : step === "message"
            ? "message"
            : step === "confirm"
              ? "send/cancel"
              : "~";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card"
      onClick={focusInput}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#f87171]" />
          <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
          <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          contact
        </span>
        <div className="w-12" />
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="h-[320px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:h-[380px]"
        style={{
          fontFamily:
            "var(--font-pixelcode), var(--font-geist-mono), monospace",
        }}
      >
        {lines.map((line, i) => {
          if (line.type === "input") {
            return (
              <div key={i} className="text-foreground">
                <span className="text-green-500">$ </span>
                <span>{line.text.slice(2)}</span>
              </div>
            );
          }
          if (line.type === "success") {
            return (
              <div key={i} className="text-green-500">
                {line.text}
              </div>
            );
          }
          if (line.type === "error") {
            return (
              <div key={i} className="text-red-500">
                {line.text}
              </div>
            );
          }
          if (line.type === "link" && line.href) {
            return (
              <div key={i}>
                <span className="text-muted-foreground">{line.text} → </span>
                <a
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 transition-colors hover:text-green-500"
                >
                  {line.label}
                </a>
              </div>
            );
          }
          return (
            <div key={i} className="text-muted-foreground">
              {line.text || "\u00A0"}
            </div>
          );
        })}

        {step !== "done" && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-500">$ </span>
            <input
              ref={inputRef}
              type={step === "email" ? "email" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border-none bg-transparent text-foreground outline-none"
              placeholder={
                step === "idle"
                  ? "type 'contact' or 'help'"
                  : step === "confirm"
                    ? "send or cancel"
                    : `your ${promptLabel}...`
              }
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              disabled={sending}
              aria-label="Terminal input"
            />
            <span
              aria-hidden="true"
              className={`ml-px inline-block h-[1.1em] w-[0.6em] bg-foreground transition-opacity ${
                showCursor && !sending ? "opacity-100" : "opacity-0"
              }`}
            />
          </form>
        )}
      </div>

      {/* Hint */}
      <div className="border-t border-border bg-muted/30 px-4 py-2">
        <p className="font-mono text-[10px] text-muted-foreground">
          Type &quot;contact&quot; to message · &quot;social&quot; for links
          · &quot;help&quot; for commands
        </p>
      </div>
    </div>
  );
}
