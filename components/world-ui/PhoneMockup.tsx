"use client";

import React, { useState, useEffect } from "react";
import { useVillageStore } from "@/store/villageStore";
import { X, Wifi, Battery, Signal, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhoneMockup() {
  const { activePhoneProject, setActivePhoneProject } = useVillageStore();
  const [currentTime, setCurrentTime] = useState("09:41");
  const [batteryLevel] = useState(87);
  const [iframeContent, setIframeContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Update clock inside the phone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const PROJECT_URLS: Record<string, string> = {
    autodevs: "https://github.com/HEETMEHTA18/autodev",
    devmentor: "https://github.com/HEETMEHTA18/devmentor",
    coastalguardian: "https://github.com/HEETMEHTA18/Coastal-Guardian",
    binarybattles: "https://binarybattles.dev",
    checkmate: "https://github.com/HEETMEHTA18/CheckMate",
    blog: "https://dev.to/heetmehta18",
    linkedin: "https://www.linkedin.com/in/heetmehta",
  };

  const url = activePhoneProject ? PROJECT_URLS[activePhoneProject] || "https://github.com/HEETMEHTA18" : "";

  // Fetch website HTML via proxy list to bypass X-Frame-Options dynamically
  useEffect(() => {
    if (!url) {
      setIframeContent("");
      return;
    }

    setIsLoading(true);
    setIframeContent("");

    const proxyRetrievers = [
      (u: string) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
      (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
      (u: string) => `https://thingproxy.freeboard.io/fetch/${u}`
    ];

    let proxyIndex = 0;

    const tryFetchWithProxy = () => {
      if (proxyIndex >= proxyRetrievers.length) {
        console.warn("All proxies failed, falling back to direct iframe integration");
        setIframeContent("");
        setIsLoading(false);
        return;
      }

      const proxyUrl = proxyRetrievers[proxyIndex](url);
      fetch(proxyUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`Proxy status ${res.status}`);
          return res.text();
        })
        .then((html) => {
          if (!html || html.trim().length === 0) {
            throw new Error("Empty response content from proxy");
          }
          
          let parsedHtml = html;
          const baseTag = `<base href="${url}" />`;
          
          // Remove frame-busting scripts
          parsedHtml = parsedHtml.replace(/window\.top/g, "window.self");
          parsedHtml = parsedHtml.replace(/top\.location/g, "self.location");
          parsedHtml = parsedHtml.replace(/window\s*!==\s*top/g, "false");
          
          if (parsedHtml.includes("<head>")) {
            parsedHtml = parsedHtml.replace("<head>", `<head>${baseTag}`);
          } else if (parsedHtml.includes("<html>")) {
            parsedHtml = parsedHtml.replace("<html>", `<html><head>${baseTag}</head>`);
          } else {
            parsedHtml = baseTag + parsedHtml;
          }

          setIframeContent(parsedHtml);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(`Proxy index ${proxyIndex} failed:`, err);
          proxyIndex++;
          tryFetchWithProxy();
        });
    };

    tryFetchWithProxy();
  }, [url]);

  if (!activePhoneProject) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        onClick={() => setActivePhoneProject(null)}
      >
        <motion.div
          initial={{ scale: 0.85, y: 50, rotate: -2 }}
          animate={{ scale: 1, y: 0, rotate: 0 }}
          exit={{ scale: 0.85, y: 50, rotate: 2 }}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          className="relative max-w-sm w-full aspect-[9/19] max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Stylized Hand holding the phone from the left side */}
          <div className="absolute -left-20 bottom-10 w-24 h-48 pointer-events-none z-10 hidden sm:block">
            <svg viewBox="0 0 100 200" className="w-full h-full fill-[#FFDAB9] drop-shadow-lg">
              <path d="M100,140 C80,140 60,120 60,90 C60,60 80,45 100,45 Z" />
              <rect x="75" y="50" width="30" height="15" rx="7.5" transform="rotate(-5 90 57)" />
              <rect x="70" y="75" width="35" height="16" rx="8" transform="rotate(-3 87 83)" />
              <rect x="73" y="100" width="32" height="15" rx="7.5" transform="rotate(2 89 107)" />
              <rect x="78" y="125" width="27" height="14" rx="7" transform="rotate(5 91 132)" />
              <path d="M100,85 C90,85 82,92 82,100 C82,108 90,115 100,115 Z" fill="#FCD5B5" />
            </svg>
          </div>

          {/* Right hand wrapping representation */}
          <div className="absolute -right-20 bottom-16 w-24 h-48 pointer-events-none z-10 hidden sm:block">
            <svg viewBox="0 0 100 200" className="w-full h-full fill-[#FFDAB9] drop-shadow-lg scale-x-[-1]">
              <path d="M100,130 C80,130 65,110 65,85 C65,60 80,45 100,45 Z" />
              <rect x="75" y="50" width="30" height="15" rx="7.5" transform="rotate(-5 90 57)" />
              <rect x="70" y="73" width="35" height="16" rx="8" transform="rotate(-3 87 81)" />
              <rect x="73" y="96" width="32" height="15" rx="7.5" transform="rotate(2 89 103)" />
              <rect x="78" y="118" width="27" height="14" rx="7" transform="rotate(5 91 125)" />
            </svg>
          </div>

          {/* Phone Frame Shell */}
          <div className="relative w-full h-full bg-[#1C1A14] rounded-[48px] p-3 shadow-[0_0_50px_rgba(212,160,23,0.25)] border-4 border-[#D4A017]/40 flex flex-col overflow-hidden">
            {/* Screen Glass Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-30" />

            {/* Speaker & Sensor Bezel (Top) */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0c0a07] rounded-full z-40 flex items-center justify-center border border-white/5">
              <div className="w-12 h-1 bg-white/20 rounded-full mb-1" />
              <div className="w-2.5 h-2.5 bg-blue-950/80 rounded-full absolute right-6 border border-white/5" />
            </div>

            {/* Home Bezel Line (Bottom) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-40" />

            {/* Screen Content Wrapper */}
            <div className="relative flex-1 w-full h-full bg-[#050505] rounded-[36px] overflow-hidden flex flex-col border border-[#D4A017]/10 z-20">
              
              {/* Phone Status Bar */}
              <div className="h-10 px-6 pt-1 flex items-center justify-between font-mono text-[10px] text-[#F9F7F3]/60 bg-[#0c0a07] z-30 select-none">
                <span>{currentTime}</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <div className="flex items-center gap-0.5">
                    <Battery className="w-3.5 h-3.5" />
                    <span className="text-[8px]">{batteryLevel}%</span>
                  </div>
                </div>
              </div>

              {/* Browser Search Bar */}
              <div className="bg-[#15130d] px-4 py-2 border-b border-[#D4A017]/10 flex items-center justify-between text-xs text-[#F2E6C9]">
                <div className="flex items-center gap-1.5 truncate max-w-[70%] bg-black/60 rounded-full px-3 py-1 font-mono text-[9px]">
                  <span className="text-[#D4A017]">🔒</span>
                  <span className="truncate select-all text-[#F9F7F3]/80">{url.replace("https://", "")}</span>
                </div>
                <button 
                  onClick={() => window.open(url, "_blank")}
                  className="text-[9px] bg-[#D4A017] hover:bg-[#B8860B] text-black font-bold px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Open Link ↗
                </button>
              </div>

              {/* Web Content Render Area */}
              <div className="flex-1 relative bg-white overflow-hidden flex flex-col">
                {isLoading && (
                  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0a07] text-[#F2E6C9] font-mono">
                    <Loader2 className="w-8 h-8 text-[#D4A017] animate-spin mb-4" />
                    <span className="text-xs">Loading Live Website...</span>
                  </div>
                )}

                {iframeContent ? (
                  <iframe 
                    srcDoc={iframeContent} 
                    className="w-full h-full border-0 bg-white" 
                    title="Live Website View"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                ) : (
                  <iframe 
                    src={url} 
                    className="w-full h-full border-0 bg-white" 
                    title="Live Website Fallback"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                )}
              </div>

            </div>
          </div>

          {/* Close Overlay Trigger */}
          <button
            onClick={() => setActivePhoneProject(null)}
            className="absolute -top-12 right-2 p-2 bg-red-950/60 border border-red-500/40 text-red-400 hover:text-red-200 rounded-full shadow-lg transition-colors cursor-pointer"
            title="Close Phone Mockup"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
