"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Mountain } from "lucide-react";

export function NotFoundClient() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.querySelector(".flex.min-h-dvh.flex-col") as HTMLElement | null;
    if (!root) return;
    const header = root.querySelector("header") as HTMLElement | null;
    const footer = root.querySelector("footer") as HTMLElement | null;
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";
    root.style.minHeight = "100dvh";
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
      root.style.minHeight = "";
    };
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Full-screen mountain background */}
      <Image
        src="/images/projects/casey-horner-4rDCa5hBlCs-unsplash.jpg"
        alt="Mountain landscape"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* 404 number */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <span className="text-[140px] font-bold leading-none tracking-[-0.06em] text-white/20 sm:text-[200px]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Mountain className="h-20 w-20 text-white/30 sm:h-28 sm:w-28" />
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
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Lost in the mountains
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-white/70">
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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/50 hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
