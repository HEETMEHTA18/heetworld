import { cn } from "@/lib/utils";

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-t-2xl border-b border-border bg-background p-4">
      {children}
    </div>
  );
}

export function LaptopVisual({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-md", className)}>
      <div className="relative rounded-2xl border border-border bg-card p-2 shadow-card">
        {/* camera notch */}
        <div className="absolute left-1/2 top-3 h-1 w-12 -translate-x-1/2 rounded-full bg-muted" />
        <Screen>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-muted-foreground">werar — marketplace</span>
            <span className="h-2 w-8 rounded-full bg-accent/50" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-14 rounded-lg bg-gradient-to-br from-accent/30 to-accent/10" />
            <div className="grid grid-cols-3 gap-2">
              {[60, 80, 40].map((h, i) => (
                <div key={i} className="rounded-lg border border-border bg-muted/40 p-1.5">
                  <div className="h-6 rounded bg-muted" style={{ height: `${h * 0.5}px` }} />
                  <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </Screen>
      </div>
      {/* base */}
      <div className="mx-auto h-2.5 w-[108%] -translate-x-[4%] rounded-b-2xl bg-border/70" />
    </div>
  );
}

export function MobileVisual({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-[180px]", className)}>
      <div className="relative flex flex-col gap-4 rounded-[2rem] border border-border bg-card p-4 shadow-card">
        <div className="h-1.5 w-16 self-center rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-muted-foreground">expense</span>
            <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[8px] text-emerald-500">+₹841</span>
          </div>
          <div className="flex h-16 items-end gap-1.5">
            {[30, 45, 38, 60, 50, 72, 58].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-accent/30" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="rounded-xl border border-border bg-muted/40 p-2">
            <p className="font-mono text-[8px] text-muted-foreground">Receipt scan</p>
            <div className="mt-1.5 flex gap-2">
              <span className="h-8 flex-1 rounded-md bg-muted" />
              <span className="h-8 flex-1 rounded-md bg-accent/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}