"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { SpotifyEmbed } from "@/components/spotify-embed";
import { SpotifyIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function SpotifyFloatWidget() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id="spotify-widget-card"
            role="dialog"
            aria-label="Now playing"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card/95 shadow-lift backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5">
              <span className="flex items-center gap-2">
                <SpotifyIcon className="h-4 w-4 text-[#1DB954]" />
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  now playing
                </span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close now playing"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-[#1DB954]/5 px-2.5 py-2.5">
              <SpotifyEmbed height={152} />
            </div>

            <a
              href={site.spotify.track}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-t border-border px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {site.spotify.title} · open on spotify ↗
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
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#1DB954] text-white shadow-lift transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {!reduceMotion && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#1DB954]/40 animate-ping"
          />
        )}
        <SpotifyIcon className="relative h-5 w-5" />
      </button>
    </div>
  );
}