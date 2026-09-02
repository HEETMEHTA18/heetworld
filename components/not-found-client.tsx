"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Compass, Mountain } from "lucide-react";

const primary = [
  { href: "/", label: "Home", number: "01" },
  { href: "/projects", label: "Projects", number: "02" },
  { href: "/writing", label: "Writing", number: "03" },
  { href: "/about", label: "About", number: "04" },
  { href: "/contact", label: "Contact", number: "05" },
];

const more = [
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/thoughts", label: "Thoughts" },
];

export function NotFoundClient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[85vh] flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/projects/daniel-gomez-eKegp5f2PPk-unsplash.jpg"
          alt="Mountain landscape"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <span className="text-[120px] font-bold leading-none tracking-[-0.06em] text-foreground/5 sm:text-[180px]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Mountain className="h-16 w-16 text-foreground/30 sm:h-24 sm:w-24" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Lost in the mountains
          </h1>
          <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            This page doesn&apos;t exist — or it moved to a different peak.
            Let me guide you back to solid ground.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 w-full max-w-2xl"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Compass className="h-4 w-4 text-muted-foreground" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {primary.map((link, i) => (
              <motion.div
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background/60 backdrop-blur-sm p-4 transition-all hover:border-foreground/30 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {link.number}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center mb-4">
              explore more
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {more.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-border bg-background/40 backdrop-blur-sm px-3 py-1.5 text-[12px] text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
