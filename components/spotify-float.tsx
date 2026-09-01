"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Music2, X } from "lucide-react";

import { SpotifyEmbed } from "@/components/spotify-embed";
import { site } from "@/lib/site";

export function SpotifyFloatWidget() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="spotify-widget-card"
            role="dialog"
            aria-label="Now playing"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-72 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-lift backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                now playing
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close now playing"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="px-2.5 py-2.5">
              <SpotifyEmbed height={80} />
            </div>

            <a
              href={site.spotify.track}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-t border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Listen on Spotify ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="spotify-widget-card"
        aria-label={
          open
            ? "Close now playing — Safar by Talha Anjum"
            : "Open now playing — Safar by Talha Anjum"
        }
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1DB954] text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
      >
        {!reduceMotion && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#1DB954]/40 animate-ping"
          />
        )}
        <Music2 className="relative h-5 w-5" />
      </button>
    </div>
  );
}