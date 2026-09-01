"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

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
      className="relative inline-flex h-9 w-16 items-center justify-between rounded-full border border-border bg-card px-1.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-1 z-0 h-7 w-7 rounded-full border border-border bg-background shadow-md"
        animate={
          mounted && !reduceMotion ? { x: isDark ? 28 : 0 } : undefined
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 500, damping: 34 }
        }
      />

      <Sun
        className={cn(
          "relative z-10 h-4 w-4 transition-opacity duration-300",
          isDark ? "opacity-40" : "opacity-100"
        )}
      />
      <Moon
        className={cn(
          "relative z-10 h-4 w-4 transition-opacity duration-300",
          isDark ? "opacity-100" : "opacity-40"
        )}
      />
    </button>
  );
}