"use client";

import React, { useRef, useEffect, useState } from "react";
import { useVillageStore } from "@/store/villageStore";

const keysRef = { current: { w: false, a: false, s: false, d: false } };
export { keysRef };

export default function TouchControls() {
  const [isMobile, setIsMobile] = useState(false);
  const tourActive = useVillageStore((s) => s.tourActive);
  const introSequenceComplete = useVillageStore((s) => s.introSequenceComplete);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    setIsMobile(isTouch && isSmall);
  }, []);

  if (!isMobile || tourActive || !introSequenceComplete) return null;

  return <DPad />;
}

function DPad() {
  const handlePress = (key: 'w' | 'a' | 's' | 'd', isPressed: boolean) => {
    keysRef.current[key] = isPressed;
  };

  const buttonClass = (isActive: boolean) => `
    flex items-center justify-center w-12 h-12 rounded-full
    border transition-all duration-100 select-none touch-none
    ${isActive 
      ? "bg-[#D4A017]/20 border-[#D4A017] text-[#D4A017] scale-90 shadow-[0_0_15px_rgba(212,160,23,0.5)]" 
      : "bg-black/40 border-[#D4A017]/20 text-[#D4A017]/80 backdrop-blur-md active:bg-[#D4A017]/10"
    }
  `;

  // State to track active buttons visually
  const [active, setActive] = useState({ w: false, a: false, s: false, d: false });

  const setKeyState = (key: 'w' | 'a' | 's' | 'd', isPressed: boolean) => {
    setActive(prev => ({ ...prev, [key]: isPressed }));
    handlePress(key, isPressed);
  };

  const createButton = (key: 'w' | 'a' | 's' | 'd', icon: string, label: string) => {
    return (
      <button
        type="button"
        onPointerDown={(e) => {
          e.preventDefault();
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          setKeyState(key, true);
        }}
        onPointerUp={(e) => {
          e.preventDefault();
          setKeyState(key, false);
        }}
        onPointerCancel={(e) => {
          e.preventDefault();
          setKeyState(key, false);
        }}
        className={buttonClass(active[key])}
        aria-label={label}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {icon === "up" && <polyline points="18 15 12 9 6 15" />}
          {icon === "down" && <polyline points="6 9 12 15 18 9" />}
          {icon === "left" && <polyline points="15 18 9 12 15 6" />}
          {icon === "right" && <polyline points="9 18 15 12 9 6" />}
        </svg>
      </button>
    );
  };

  return (
    <div 
      className="fixed bottom-8 left-8 z-50 select-none touch-none" 
      style={{ touchAction: "none" }}
    >
      <div className="grid grid-cols-3 gap-2 p-2 rounded-full bg-black/15 border border-[#D4A017]/10 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        {/* Row 1 */}
        <div />
        {createButton("w", "up", "Move Up")}
        <div />

        {/* Row 2 */}
        {createButton("a", "left", "Turn Left")}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#D4A017]/5 border border-[#D4A017]/15 shadow-[inset_0_0_8px_rgba(212,160,23,0.1)]">
          <div className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
        </div>
        {createButton("d", "right", "Turn Right")}

        {/* Row 3 */}
        <div />
        {createButton("s", "down", "Move Down")}
        <div />
      </div>
    </div>
  );
}
