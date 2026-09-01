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
      className="relative inline-flex h-8 w-[3.75rem] shrink-0 items-center justify-between rounded-full border border-border bg-card px-1 text-muted-foreground shadow-card transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-[3px] h-[26px] w-[26px] rounded-full border border-border bg-background shadow-md"
        animate={mounted ? { left: isDark ? 30 : 4 } : undefined}
        transition={
          reduceMotion
            ? { duration: 0, ease: "linear" }
            : { type: "spring", stiffness: 500, damping: 34 }
        }
      />

      <Sun
        className={cn(
          "relative z-10 h-4 w-4 transition-all duration-300",
          isDark ? "opacity-30" : "opacity-100 text-foreground"
        )}
      />
      <Moon
        className={cn(
          "relative z-10 h-4 w-4 transition-all duration-300",
          isDark ? "opacity-100 text-foreground" : "opacity-30"
        )}
      />
    </button>
  );
}