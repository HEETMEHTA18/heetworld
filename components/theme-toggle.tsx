"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isDark : false}
      aria-label="Toggle color theme"
      title={mounted ? (isDark ? "Switch to light" : "Switch to dark") : undefined}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-full border border-border bg-muted px-[3px] shadow-card transition-colors hover:border-foreground/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none flex h-[20px] w-[20px] items-center justify-center rounded-full border border-border bg-background shadow-md"
        animate={mounted ? { x: isDark ? 20 : 0 } : undefined}
        transition={
          reduceMotion
            ? { duration: 0, ease: "linear" }
            : { type: "spring", stiffness: 500, damping: 34 }
        }
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-foreground" />
        ) : (
          <Sun className="h-3 w-3 text-foreground" />
        )}
      </motion.span>
    </button>
  );
}