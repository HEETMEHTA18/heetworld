import * as React from "react";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  info: "border-accent/30 bg-accent-soft text-foreground",
  note: "border-border bg-muted text-foreground",
  warn: "border-amber-500/30 bg-amber-500/10 text-foreground",
  danger: "border-red-500/30 bg-red-500/10 text-foreground",
};

const labels: Record<string, string> = {
  info: "Info",
  note: "Note",
  warn: "Heads up",
  danger: "Caution",
};

export function Callout({
  type = "note",
  title,
  children,
  className,
}: {
  type?: keyof typeof styles;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "my-6 rounded-2xl border p-5 sm:p-6",
        styles[type] ?? styles.note,
        className
      )}
    >
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
        {title ?? labels[type]}
      </p>
      <div className="text-[15px] leading-relaxed [&>p]:my-0">{children}</div>
    </div>
  );
}

export function Caption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 text-center font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-6 shadow-card">
      <span className="font-serif text-4xl tracking-tight text-foreground">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}