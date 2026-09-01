"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HUD from "@/components/world-ui/HUD";
import Panels from "@/components/panels/Panels";
import Minimap from "@/components/world/Minimap";
import TouchControls from "@/components/world-ui/TouchControls";
import PhoneMockup from "@/components/world-ui/PhoneMockup";
import { ErrorBoundary } from "@/components/world-ui/ErrorCatcher";
import { useVillageStore } from "@/store/villageStore";
import { BUILDINGS } from "@/lib/world-constants";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Lazy-load Canvas containing WebGL/Three.js context to avoid SSR errors
const VillageScene = dynamic(() => import("@/components/world/VillageScene"), {
  ssr: false,
  loading: () => null,
});

export default function WorldPage() {
  const isLoading = useVillageStore((s) => s.isLoading);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && BUILDINGS.some((b) => b.id === hash)) {
      useVillageStore.getState().setSelectedDestination(hash);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) setShowLoader(false);
  }, [isLoading]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050505] select-none">
      {/* Return to identity site navigation bar */}
      <div className="absolute top-4 left-4 z-[100] flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 text-xs font-mono text-white/90 hover:bg-black hover:border-white/50 transition-all backdrop-blur-md shadow-lg"
        >
          ← heetworld.tech
        </Link>
      </div>

      <AnimatePresence>
        {showLoader && <LoadingScreen />}
      </AnimatePresence>

      <ErrorBoundary>
        {/* 3D WebGL Cinematic Canvas Layer */}
        <VillageScene />

        {/* 2D HUD UI Overlay */}
        <HUD />
        <Panels />
        <Minimap />
        <TouchControls />
        <PhoneMockup />
      </ErrorBoundary>
    </main>
  );
}

function LoadingScreen() {
  const dots = ["", ".", "..", "..."];
  const [dotIdx, setDotIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDotIdx((i) => (i + 1) % dots.length), 400);
    return () => clearInterval(t);
  }, [dots.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-5xl sm:text-6xl tracking-[0.2em] text-[#00FFCC] drop-shadow-[0_0_20px_rgba(0,255,204,0.3)]">
          HEET WORLD
        </span>
        <span className="font-mono text-xs text-[#00FFCC]/60 tracking-[0.3em] uppercase">
          Loading 3D Ecosystem{dots[dotIdx]}
        </span>
        <div className="w-6 h-6 border-2 border-[#00FFCC]/20 border-t-[#00FFCC] rounded-full animate-spin" />
      </div>
    </motion.div>
  );
}
