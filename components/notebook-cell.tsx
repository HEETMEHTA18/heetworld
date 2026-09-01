"use client";

import { Play, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotebookCell({
  index,
  command,
  children,
  isOpen = false,
  onToggle,
  className,
}: {
  index: number | string;
  command: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}) {
  const tag = `[${index}]`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20",
        className
      )}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="select-none pt-0.5 font-mono text-xs text-accent">
          In&nbsp;{tag}:
        </span>
        <code className="flex-1 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-foreground">
          {command}
        </code>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] transition-all",
            isOpen
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border bg-background text-muted-foreground hover:border-accent hover:text-foreground"
          )}
        >
          {isOpen ? (
            <Check className="h-3 w-3 text-accent" />
          ) : (
            <Play className="h-3 w-3 fill-current" />
          )}
          {isOpen ? "Ran" : "Run"}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-muted/30 px-4 py-3 animate-in fade-in-50 duration-150">
          <div className="flex items-start gap-3">
            <span className="select-none pt-0.5 font-mono text-xs text-muted-foreground">
              Out&nbsp;{tag}:
            </span>
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
