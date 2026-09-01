import { cn } from "@/lib/utils";

export function WindowFrame({
  title,
  children,
  className,
  active = false,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-card",
        active && "shadow-lift ring-1 ring-accent/10",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        {title ? (
          <span className="ml-1 font-mono text-[11px] text-muted-foreground">
            {title}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}