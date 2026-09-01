"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const TRACK = {
  title: "Safar",
  artist: "on repeat",
  total: 222, // seconds (3:42)
};

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function NowPlaying({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(64);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= TRACK.total) {
          clearInterval(t);
          return TRACK.total;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [playing]);

  const pct = (elapsed / TRACK.total) * 100;

  return (
    <div
      className={cn(
        "flex w-full max-w-xs items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-card sm:w-auto",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause" : "Play"}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 translate-x-[1px]" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Now playing
        </p>
        <div className="flex items-baseline gap-2">
          <p className="truncate text-sm font-medium text-foreground">
            {TRACK.title}
          </p>
          <span className="truncate text-xs text-muted-foreground">
            {TRACK.artist}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
            {fmt(elapsed)} / {fmt(TRACK.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
