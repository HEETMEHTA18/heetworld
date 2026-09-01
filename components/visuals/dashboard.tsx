import { WindowFrame } from "@/components/visuals/window";
import { cn } from "@/lib/utils";

const bars = [34, 52, 40, 66, 48, 74, 58, 82, 62, 90, 70, 96];

export function DashboardVisual({ className }: { className?: string }) {
  return (
    <WindowFrame title="shelf-dashboard" className={className} active>
      <div className="flex h-full min-h-[220px] flex-col gap-3 p-4 text-[10px] sm:text-[11px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-8 rounded-full bg-accent/80" />
            <span className="h-2 w-6 rounded-full bg-muted" />
            <span className="h-2 w-6 rounded-full bg-muted" />
          </div>
          <div className="flex gap-1.5">
            <span className="h-2 w-10 rounded-full bg-accent/15" />
            <span className="h-2 w-6 rounded-full bg-muted" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Out of stock", value: "3", tone: "text-red-500" },
            { label: "Low stock", value: "12", tone: "text-amber-500" },
            { label: "In stock", value: "94%", tone: "text-emerald-500" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-muted/40 p-2.5">
              <p className="text-muted-foreground">{s.label}</p>
              <p className={cn("mt-0.5 font-mono text-sm font-medium", s.tone)}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-1 gap-3">
          <div className="flex flex-1 flex-col justify-end gap-1 rounded-xl border border-border bg-muted/40 p-2.5">
            <p className="mb-1 text-muted-foreground">Shelf health by aisle</p>
            <div className="flex h-16 items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-accent/30"
                  style={{ height: `${h}%`, opacity: 0.5 + (h / 100) * 0.5 }}
                />
              ))}
            </div>
          </div>
          <div className="hidden w-24 flex-col justify-between rounded-xl border border-border bg-muted/40 p-2.5 sm:flex">
            <p className="text-muted-foreground">Alerts</p>
            <div className="space-y-1.5">
              <div className="rounded-lg bg-red-500/10 px-2 py-1 text-red-500">A3 empty</div>
              <div className="rounded-lg bg-amber-500/10 px-2 py-1 text-amber-500">B2 low</div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}