"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const GREETINGS = ["hi", "hola", "hello", "hey", "namaste", "bonjour", "hallo"];

const TYPE_MS = 90;
const HOLD_MS = 1600;
const DELETE_MS = 45;
const PAUSE_MS = 300;

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GreetingTyping() {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    getReduced,
    () => false
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = GREETINGS[wordIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % GREETINGS.length);
      }, PAUSE_MS);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
          );
        },
        deleting ? DELETE_MS : TYPE_MS
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, reduced]);

  const greeting = reduced ? GREETINGS[0] : text;

  return (
    <h1 className="mt-6 text-4xl font-medium tracking-[-0.06em] text-foreground sm:text-6xl">
      <span className="text-foreground">{greeting}</span>
      <span className="text-muted-foreground">, i&apos;m heet mehta.</span>
      {!reduced && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-[0.08em] animate-pulse text-foreground"
        >
          |
        </span>
      )}
    </h1>
  );
}
