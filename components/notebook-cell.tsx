"use client";

import { Play, Check, ChevronDown } from "lucide-react";
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
        "relative overflow-hidden rounded-lg border transition-colors",
        isOpen
          ? "border-accent/40 bg-card"
          : "border-border bg-card hover:border-foreground/20",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-full w-[3px] transition-colors",
          isOpen ? "bg-accent" : "bg-transparent"
        )}
      />

      <div className="flex items-start gap-3 pl-4 pr-4 pt-3 pb-2">
        <span className="select-none pt-0.5 shrink-0 font-mono text-xs text-accent">
          In&nbsp;{tag}:
        </span>
        <code className="flex-1 whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-foreground">
          {command}
        </code>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse output" : "Run cell"}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] transition-all",
            isOpen
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border bg-background text-muted-foreground hover:border-accent hover:text-foreground"
          )}
        >
          {isOpen ? (
            <>
              <Check className="h-3 w-3" />
              Ran
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              Run
            </>
          )}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-muted/30 py-1 animate-in fade-in-50 duration-150">
          <div className="flex items-start gap-3 pl-4 pr-4 py-2">
            <span className="select-none pt-0.5 shrink-0 font-mono text-xs text-muted-foreground">
              Out&nbsp;{tag}:
            </span>
            <div className="min-w-0 flex-1">{children}</div>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="mx-auto mb-1 flex w-full items-center justify-center gap-1 border-t border-border/60 pt-1 font-mono text-[10px] text-muted-foreground/70 transition-colors hover:text-foreground"
          >
            <ChevronDown className="h-3 w-3" />
            collapse
          </button>
        </div>
      ) : null}
    </div>
  );
}