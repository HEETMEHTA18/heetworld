"use client";

import { useTheme } from "next-themes";
import { Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-foreground/20 hover:text-foreground"
    >
      <Moon className={`h-4 w-4 transition-transform ${!isDark ? "rotate-180 opacity-60" : ""}`} />
    </button>
  );
}

