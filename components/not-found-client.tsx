"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Mountain } from "lucide-react";

export function NotFoundClient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[90vh] flex flex-col">
      {/* Mountain background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/projects/daniel-gomez-eKegp5f2PPk-unsplash.jpg"
          alt="Mountain landscape"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* 404 number with mountain icon */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <span className="text-[140px] font-bold leading-none tracking-[-0.06em] text-foreground/10 sm:text-[200px]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Mountain className="h-20 w-20 text-foreground/20 sm:h-28 sm:w-28" />
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Lost in the mountains
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            This page doesn&apos;t exist — or it moved to a different peak.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
