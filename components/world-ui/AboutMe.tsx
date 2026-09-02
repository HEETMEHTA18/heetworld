"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVillageStore } from "@/store/villageStore";
import { Mail, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import Image from "next/image";

export default function AboutMe() {
  const { showAboutMe, setShowAboutMe } = useVillageStore();

  if (!showAboutMe) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
        onClick={() => setShowAboutMe(false)}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-[#F4F1E1] rounded-2xl shadow-2xl flex flex-col md:flex-row border-4 border-[#1E0B9B] custom-scrollbar"
          style={{ backgroundImage: "radial-gradient(#1E0B9B 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowAboutMe(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-[#1E0B9B] hover:bg-[#FF4500] text-white rounded-full transition-colors shadow-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Content */}
          <div className="flex-1 p-6 sm:p-8 md:p-12 z-10 flex flex-col justify-center bg-[#F4F1E1]/90 md:bg-transparent">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-[#1E0B9B] uppercase tracking-tighter mb-6 md:mb-8 leading-none drop-shadow-[4px_4px_0_#FF4500]">
              Hello there!
              <div className="w-full max-w-[150px] md:max-w-[200px] mt-2 border-b-8 border-dotted border-[#FF4500]"></div>
            </h1>

            <div className="space-y-4 md:space-y-6 font-mono text-base md:text-lg text-[#1E0B9B] max-w-lg font-medium">
              <p>
                The name is <span className="font-bold underline decoration-[#FF4500] decoration-[3px] md:decoration-4 underline-offset-4">Heet Mehta.</span>
              </p>
              
              <p>
                I'm a Full-Stack AI Developer & Researcher based in India who loves to <span className="font-bold underline decoration-[#FF4500] decoration-[3px] md:decoration-4 underline-offset-4">work with magic.</span>
              </p>

              <p>
                My main goal is to <span className="font-bold underline decoration-[#FF4500] decoration-[3px] md:decoration-4 underline-offset-4">build agentic systems</span> with my code and help businesses to find their <span className="font-bold underline decoration-[#FF4500] decoration-[3px] md:decoration-4 underline-offset-4">automated future.</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-8 md:mt-12 space-y-3 font-mono text-xs sm:text-sm font-bold flex flex-col items-start">
              <a href="mailto:heetmehta18.work@gmail.com" className="flex items-center gap-3 text-[#1E0B9B] hover:text-[#FF4500] transition-colors group">
                <div className="p-1.5 sm:p-2 bg-[#FF4500] text-white rounded-md group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                heetmehta18.work@gmail.com
              </a>
              <a href="https://linkedin.com/in/heetmehta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#1E0B9B] hover:text-[#FF4500] transition-colors group">
                <div className="p-1.5 sm:p-2 bg-[#FF4500] text-white rounded-md group-hover:scale-110 transition-transform">
                  <LinkedInIcon className="w-4 h-4" />
                </div>
                linkedin.com/in/heetmehta
              </a>
              <a href="https://github.com/HEETMEHTA18" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#1E0B9B] hover:text-[#FF4500] transition-colors group">
                <div className="p-1.5 sm:p-2 bg-[#FF4500] text-white rounded-md group-hover:scale-110 transition-transform">
                  <GitHubIcon className="w-4 h-4" />
                </div>
                github.com/HEETMEHTA18
              </a>
            </div>
          </div>

          {/* Right Image/Graphic Area */}
          <div className="flex-1 min-h-[250px] sm:min-h-[300px] bg-[#1E0B9B] relative flex items-end justify-center pt-8 md:pt-12 overflow-hidden border-t-4 md:border-t-0 md:border-l-4 border-[#1E0B9B]">
            {/* Minimal stylized character representation */}
            <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-full md:max-w-[300px] md:aspect-square bg-[#F4F1E1] rounded-full translate-y-12 sm:translate-y-16 border-4 border-[#1E0B9B] flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full border-[8px] md:border-[12px] border-[#FF4500] scale-90 opacity-20"></div>
              {/* Profile Image (using github avatar) */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#1E0B9B] shadow-[6px_6px_0_#FF4500] md:shadow-[8px_8px_0_#FF4500] relative z-10 bg-white">
                <Image src="https://avatars.githubusercontent.com/u/108343753?v=4" alt="Heet Mehta" fill className="object-cover" />
              </div>
            </div>
            
            {/* Color swatches decoration mimicking the screenshot */}
            <div className="absolute bottom-0 right-0 w-full flex justify-center translate-y-1/2 scale-[1.2] md:scale-150 rotate-12 opacity-80 pointer-events-none">
              <div className="w-12 md:w-16 h-24 md:h-32 bg-[#FF4500] border-4 border-[#1E0B9B] -rotate-12 transform origin-bottom"></div>
              <div className="w-12 md:w-16 h-32 md:h-40 bg-[#00FFCC] border-4 border-[#1E0B9B] -rotate-6 transform origin-bottom -ml-4"></div>
              <div className="w-12 md:w-16 h-40 md:h-48 bg-[#F4F1E1] border-4 border-[#1E0B9B] transform origin-bottom -ml-4"></div>
              <div className="w-12 md:w-16 h-32 md:h-40 bg-[#D4A017] border-4 border-[#1E0B9B] rotate-6 transform origin-bottom -ml-4"></div>
              <div className="w-12 md:w-16 h-24 md:h-32 bg-[#8B5CF6] border-4 border-[#1E0B9B] rotate-12 transform origin-bottom -ml-4"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
