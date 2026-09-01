import fs from "fs";
import path from "path";
import Image from "next/image";

/**
 * Editorial portrait in a rounded frame.
 *
 * To replace the placeholder: drop a photo at `/public/portrait.jpg`
 * (square, ~1200px) and it is used automatically.
 */
export function Portrait({ className }: { className?: string }) {
  const exists = fs.existsSync(
    path.join(process.cwd(), "public", "portrait.jpg")
  );

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
        {exists ? (
          <Image
            src="/portrait.jpg"
            alt="Portrait of Heet Mehta"
            width={960}
            height={1200}
            priority
            sizes="(min-width: 768px) 42vw, 100vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder />
        )}

        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-foreground/5" />

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-border/80 bg-background/70 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft font-mono text-xs text-accent">
              HM
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Heet Mehta</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                AI Engineer · Builder
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            building
          </span>
        </div>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-muted to-card p-6">
      <div className="texture-dots pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Heet Mehta
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">2026</span>
      </div>

      <div className="relative flex flex-col gap-2">
        <p className="font-serif text-3xl leading-tight text-foreground">
          Add your
          <br />
          photograph.
        </p>
        <p className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
          Drop a file at <span className="font-mono text-foreground">public/portrait.jpg</span> to replace this placeholder.
        </p>
      </div>

      <div className="relative flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-[10px] text-muted-foreground">
          /portrait.jpg
        </span>
        <span className="h-1.5 w-10 rounded-full bg-accent/40" />
      </div>
    </div>
  );
}