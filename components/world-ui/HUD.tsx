"use client";

import React, { useEffect, useState, useRef } from "react";
import { useVillageStore } from "@/store/villageStore";
import { useAmbientSound } from "@/lib/useAmbientSound";
import { Volume2, VolumeX, Download, Mail, Mouse, Map, CloudSun, CloudRain, CloudSnow, Eye, Plane, Sun, Moon, Maximize, Terminal, Send, ArrowRight, Settings, Play, Square, User } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { BUILDINGS } from "@/lib/world-constants";
import AboutMe from "./AboutMe";

export default function HUD() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    setIsMobile(isTouch && isSmall);
  }, []);

  const {
    soundOn,
    toggleSound,
    isLoading,
    setIsLoading,
    introSequenceComplete,
    nearbyBuilding,
    setSelectedDestination,
    isTraveling,
    activeBuilding,
    showMinimap,
    setShowMinimap,
    weather,
    setWeather,
    minimapExpanded,
    setMinimapExpanded,
    firstPerson,
    setFirstPerson,
    flying,
    setFlying,
    autoDayNight,
    setAutoDayNight,
    ghData,
    setGhData,
    characterPosition,
    tourActive,
    setTourActive,
    setTourIndex,
    setTourPause,
    setActiveBuilding,
    setTimeOfDay,
    setGuideGreeting,
    welcomeMessageActive,
    setShowAboutMe
  } = useVillageStore();

  const [loadingText, setLoadingText] = useState("Initializing environment...");
  const [isReady, setIsReady] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: "input" | "output"; text: string }>>([
    { type: "output", text: "⚙️ Portfolio Command Center v1.0.0" },
    { type: "output", text: "⚡ Navigate the 3D portfolio with commands." },
    { type: "output", text: "💡 Type 'help' to list available commands." },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showTerminal) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [showTerminal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "t" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        setShowTerminal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (showTerminal) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, showTerminal]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = terminalInput.trim();
    if (!input) return;

    const newHistory = [...terminalHistory, { type: "input" as const, text: input }];
    const cmdLower = input.toLowerCase();

    const addOutput = (text: string) => {
      newHistory.push({ type: "output" as const, text });
    };

    if (cmdLower === "help") {
      addOutput("Available commands:\n" +
                "  • about     - Learn about Heet Mehta\n" +
                "  • skills    - List core competencies & tech\n" +
                "  • projects  - Explore key creations\n" +
                "  • autodev   - Run the AutoDev Engine CLI tool (subcommands: skill, benchmark, audit, doctor, contact, blog)\n" +
                "  • weather   - Adjust atmosphere ('weather rain', 'weather snow', 'weather clear')\n" +
                "  • time      - Adjust lighting ('time day', 'time night', 'time auto')\n" +
                "  • fly       - Toggle flight mode\n" +
                "  • fp        - Toggle first-person perspective\n" +
                "  • go <dest> - Teleport: 'go forge', 'go academy', 'go arena', 'go watchtower', 'go harbor', 'go townsquare', 'go archive'\n" +
                "  • clear     - Clear terminal logs");
    } else if (cmdLower === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (cmdLower === "about") {
      addOutput("Heet Mehta: B.Tech Computer Science & Engineering student at CHARUSAT University (2024 - 2028). An agentic software developer building autonomous systems, full-stack architectures, and developer tooling.");
    } else if (cmdLower === "skills") {
      addOutput("Core Competencies:\n" +
                "  - Frontend: Next.js, React, TailwindCSS, Flutter\n" +
                "  - Backend: Node.js, Go, Python, WebSockets, REST\n" +
                "  - Systems & Devops: Docker, PostgreSQL, Redis, GitHub Actions");
    } else if (cmdLower === "projects") {
      addOutput("Featured Builds:\n" +
                "  - AutoDevs (Forge): Scaffolder and OSV audit CLI tool\n" +
                "  - DevMentor (Academy): Speech-to-PR automated codebase refactorer\n" +
                "  - Coastal Guardian (Watchtower): Erosion prediction with satellite CNNs\n" +
                "  - BinaryBattles (Watchtower): Real-time competitive coding platform");
    } else if (cmdLower.startsWith("autodev")) {
      const parts = cmdLower.split(" ").map(p => p.trim()).filter(Boolean);
      const sub = parts[1];
      if (!sub || sub === "help") {
        addOutput("AutoDev Engine CLI v1.0.0\n" +
                  "Available subcommands:\n" +
                  "  • autodev skill      - Scan codebase & output skills\n" +
                  "  • autodev benchmark  - Show token & pipeline efficiency\n" +
                  "  • autodev audit      - Scan portfolio packages for vulnerabilities\n" +
                  "  • autodev doctor     - Check framework environment runtimes\n" +
                  "  • autodev profile    - Fetch developer role profile\n" +
                  "  • autodev contact    - Trigger warp to Communications Port (Harbor)\n" +
                  "  • autodev blog       - Trigger warp to ML Blog Archive");
      } else if (sub === "skill" || sub === "skills") {
        setSelectedDestination("guildhall");
        addOutput("[autodev] Scanning developer skill matrix...\n" +
                  "✓ Profile detected: Web-dev & ML-engineer\n" +
                  "✓ Found 4 core skill categories in Heet's local registry:\n" +
                  "  • Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Flutter\n" +
                  "  • Backend & Systems: Node.js, Go, Python, Compiler Design, WebSockets, REST APIs\n" +
                  "  • Databases & DevOps: PostgreSQL, Redis, MongoDB, Docker, GitHub Actions\n" +
                  "  • AI/ML: TensorFlow, scikit-learn, Claude/Gemini APIs, RAG, LLM fine-tuning\n" +
                  "🚀 Teleport coordinates locked to Skills & Education Hall (Guildhall)...");
      } else if (sub === "benchmark" || sub === "benchmarks") {
        addOutput("[autodev] Compiling AI efficiency benchmarks:\n" +
                  "-------------------------------------------------------------\n" +
                  "Metric                 Traditional Prompting    AutoDev Engine\n" +
                  "-------------------------------------------------------------\n" +
                  "Token Overhead         100% (High redundant)    12% (Optimized)\n" +
                  "Response Latency       4.8s                     1.1s\n" +
                  "Success Rate (PRs)     68%                      94% (Agentic)\n" +
                  "Code Quality Lints     14 errors / run          0 errors / run\n" +
                  "-------------------------------------------------------------\n" +
                  "Conclusion: AutoDev achieves 8.3x token efficiency & 94% PR accuracy.");
      } else if (sub === "audit") {
        addOutput("[autodev] Scanning codebase dependencies via OSV database...\n" +
                  "🛡️ Scanned 28 npm packages in /portfolio:\n" +
                  "  - react (18.3.1): OK\n" +
                  "  - next (14.2.3): OK\n" +
                  "  - three (0.165.0): OK\n" +
                  "  - @react-three/fiber (8.16.8): OK\n" +
                  "  - framer-motion (11.2.10): OK\n" +
                  "Status: 0 vulnerabilities found. Environment secure.");
      } else if (sub === "doctor") {
        addOutput("[autodev] Diagnosing development environment runtimes:\n" +
                  "[PASS] Node.js v20.12.2\n" +
                  "[PASS] npm v10.5.0\n" +
                  "[PASS] Next.js Framework (v14.2.3)\n" +
                  "[PASS] Three.js Rendering Engine (WebGL 2.0)\n" +
                  "[PASS] Tailwind CSS Compiler\n" +
                  "System state: Healthy. All developer tools configured successfully.");
      } else if (sub === "profile") {
        addOutput("[autodev] Fetching role profile...\n" +
                  "Name: Heet Mehta\n" +
                  "Role: Agentic Full-Stack & ML Software Developer\n" +
                  "Institution: CHARUSAT University (B.Tech CSE, 2024-2028)\n" +
                  "Focus: Automating software pipelines, compiler logic, AI integration.");
      } else if (sub === "contact" || sub === "communication") {
        setSelectedDestination("harbor");
        addOutput("[autodev] Teleporting to the Communications Port (Harbor)...");
      } else if (sub === "blog" || sub === "archive") {
        setSelectedDestination("archive");
        addOutput("[autodev] Teleporting to the ML Archive (Blog Building)...");
      } else {
        addOutput(`[autodev] Unknown subcommand: '${sub}'. Type 'autodev help' for available options.`);
      }
    } else if (cmdLower === "fly") {
      setFlying(!flying);
      addOutput(`Flight systems: ${!flying ? "ENGAGED" : "OFFLINE"}`);
    } else if (cmdLower === "fp") {
      setFirstPerson(!firstPerson);
      addOutput(`Visual mode: ${!firstPerson ? "FIRST-PERSON" : "THIRD-PERSON"}`);
    } else if (cmdLower.startsWith("weather ")) {
      const wType = cmdLower.replace("weather ", "").trim();
      if (wType === "clear" || wType === "rain" || wType === "snow") {
        setWeather(wType as "clear" | "rain" | "snow");
        addOutput(`Weather altered to: ${wType.toUpperCase()}`);
      } else {
        addOutput("Unknown weather type. Use: 'weather clear', 'weather rain', or 'weather snow'");
      }
    } else if (cmdLower.startsWith("time ")) {
      const tType = cmdLower.replace("time ", "").trim();
      if (tType === "day" || tType === "golden") {
        setAutoDayNight(false);
        setTimeOfDay("golden");
        addOutput("Temporal system locked to: DAYLIGHT");
      } else if (tType === "night") {
        setAutoDayNight(false);
        setTimeOfDay("night");
        addOutput("Temporal system locked to: NIGHT");
      } else if (tType === "auto") {
        setAutoDayNight(true);
        addOutput("Day/Night timeline loop: ACTIVE");
      } else {
        addOutput("Unknown temporal state. Use: 'time day', 'time night', or 'time auto'");
      }
    } else if (cmdLower.startsWith("go ")) {
      const dest = cmdLower.replace("go ", "").trim();
      let targetId: string | null = null;
      let targetName = "";
      if (dest === "forge") { targetId = "forge"; targetName = "Development Studio"; }
      else if (dest === "academy") { targetId = "academy"; targetName = "Research Institute"; }
      else if (dest === "arena") { targetId = "arena"; targetName = "Competition Arena"; }
      else if (dest === "watchtower") { targetId = "watchtower"; targetName = "Data Observatory"; }
      else if (dest === "harbor") { targetId = "harbor"; targetName = "Communications Port"; }
      else if (dest === "townsquare" || dest === "square" || dest === "plaza" || dest === "central") { targetId = "town-square"; targetName = "Central Plaza"; }
      else if (dest === "townhall" || dest === "hall" || dest === "career" || dest === "resume") { targetId = "town-hall"; targetName = "Career Archives"; }
      else if (dest === "guild" || dest === "guildhall" || dest === "skills") { targetId = "guildhall"; targetName = "Skills & Education Hall"; }
      else if (dest === "archive" || dest === "blog") { targetId = "archive"; targetName = "The Archive (Blog)"; }

      if (targetId) {
        setSelectedDestination(targetId);
        addOutput(`Teleport coordinates locked. Commencing warp sequence to ${targetName}...`);
      } else {
        addOutput("Target location unrecognized. Select from: forge, academy, arena, watchtower, harbor, central/plaza, career/hall, guildhall/skills, archive/blog");
      }
    } else if (cmdLower.includes("contact") || cmdLower.includes("email") || cmdLower.includes("hire") || cmdLower.includes("message")) {
      addOutput("Direct transmission paths:\n" +
                "  • Email: heetmehta18.work@gmail.com\n" +
                "  • LinkedIn: linkedin.com/in/heetmehta18\n" +
                "  • Harbor: Send a direct message via the Communications Port panel!");
    } else if (cmdLower.includes("resume") || cmdLower.includes("cv") || cmdLower.includes("download")) {
      addOutput("Resume PDF transmission link: Click the 'Resume' button at the top header to download.");
    } else {
      addOutput(`Query not recognized: '${input}'. Type 'help' to review commands.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  useAmbientSound(soundOn);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  useEffect(() => {
    if (introSequenceComplete) {
      const showTimer = setTimeout(() => setShowScrollHint(true), 0);
      const hideTimer = setTimeout(() => setShowScrollHint(false), 6000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [introSequenceComplete]);

  // Fetch GitHub data — only show once both calls resolve
  useEffect(() => {
    let userData: { repos: number } | null = null;
    let reposData: { stars: number; lastCommit: string } | null = null;

    const trySet = () => {
      if (userData && reposData) {
        setGhData({ ...userData, ...reposData });
      }
    };

    fetch("https://api.github.com/users/HEETMEHTA18")
      .then((r) => r.json())
      .then((data) => {
        if (data.public_repos !== undefined) {
          userData = { repos: data.public_repos };
          trySet();
        }
      })
      .catch(() => {});

    fetch("https://api.github.com/users/HEETMEHTA18/repos?per_page=100&sort=updated")
      .then((r) => r.json())
      .then((repos) => {
        if (Array.isArray(repos) && repos.length > 0) {
          const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
          reposData = { stars: totalStars, lastCommit: repos[0].pushed_at || "" };
          trySet();
        }
      })
      .catch(() => {});
  }, [setGhData]);

  useEffect(() => {
    if (!introSequenceComplete || firstPerson || flying) return;
    const handleScroll = () => {
      if (window.scrollY > 50) setShowScrollHint(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introSequenceComplete, firstPerson, flying]);

  const handleNearbyClick = () => {
    if (nearbyBuilding && !activeBuilding) {
      setActiveBuilding(nearbyBuilding);
      setSelectedDestination(null);
    }
  };

  const nearbyName = nearbyBuilding ? BUILDINGS.find((b) => b.id === nearbyBuilding)?.name : null;

  const toggleMap = () => {
    if (minimapExpanded) {
      setMinimapExpanded(false);
    } else {
      setShowMinimap(!showMinimap);
    }
  };

  return (
    <>


      <AnimatePresence>
        {welcomeMessageActive && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/50 backdrop-blur-md px-10 py-6 rounded-3xl border border-[#00FFCC]/30 shadow-[0_0_50px_rgba(0,255,204,0.15)] flex flex-col items-center">
              <span className="font-display text-4xl sm:text-5xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00FFCC] to-white uppercase drop-shadow-md">
                Welcome
              </span>
              <p className="mt-2 text-white/70 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
                Explore my work & journey
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (<>
        <div className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-between p-6">
          <div className="w-full flex justify-end items-start pointer-events-auto">

            <div className={`flex ${isMobile ? "flex-wrap gap-1" : "gap-1 sm:gap-2"} items-center max-w-[60vw] justify-end`}>
              {!isMobile && (
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`bg-black/40 backdrop-blur-md p-1.5 sm:p-2.5 rounded-xl border transition-all ${showSettings ? "border-[#00FFCC]/60 text-[#00FFCC]" : "border-[#00FFCC]/20 text-[#00FFCC] hover:border-[#00FFCC]/60"}`}
                  title="Settings"
                >
                  <Settings className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 flex flex-col gap-2 bg-black/60 backdrop-blur-md border border-[#00FFCC]/20 rounded-xl p-2 min-w-[40px] items-center"
                    >
                      <button
                        onClick={() => setShowTerminal(!showTerminal)}
                        className={`p-1.5 sm:p-2 rounded-lg transition-all ${showTerminal ? "bg-[#00FFCC]/20 text-[#00FFCC]" : "text-[#F9F7F3]/50 hover:text-[#00FFCC]"}`}
                        title="Command Console (T)"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={toggleMap}
                        className={`p-1.5 sm:p-2 rounded-lg transition-all ${showMinimap ? "bg-[#00FFCC]/20 text-[#00FFCC]" : "text-[#F9F7F3]/50 hover:text-[#00FFCC]"}`}
                        title="Toggle Map"
                      >
                        <Map className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setFlying(!flying)}
                        className={`p-1.5 sm:p-2 rounded-lg transition-all ${flying ? "bg-[#00FFCC]/20 text-[#00FFCC]" : "text-[#F9F7F3]/50 hover:text-[#00FFCC]"}`}
                        title="Flying mode (Space)"
                      >
                        <Plane className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setAutoDayNight(!autoDayNight)}
                        className={`p-1.5 sm:p-2 rounded-lg transition-all ${autoDayNight ? "bg-[#00FFCC]/20 text-[#00FFCC]" : "text-[#F9F7F3]/50 hover:text-[#00FFCC]"}`}
                        title={autoDayNight ? "Auto day/night" : "Static time"}
                      >
                        {autoDayNight ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={toggleSound}
                        className={`p-1.5 sm:p-2 rounded-lg transition-all ${soundOn ? "bg-[#00FFCC]/20 text-[#00FFCC]" : "text-[#F9F7F3]/50 hover:text-[#00FFCC]"}`}
                        title={soundOn ? "Mute" : "Ambient Sound"}
                      >
                        {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex gap-1 border-t border-[#00FFCC]/10 pt-2 mt-1">
                        <button onClick={() => setWeather("clear")} className={`p-1.5 rounded-lg transition-all ${weather === "clear" ? "bg-[#00FFCC]/20 text-[#00FFCC]" : "text-[#F9F7F3]/50 hover:text-[#F9F7F3]"}`}><CloudSun className="w-3 h-3" /></button>
                        <button onClick={() => setWeather("rain")} className={`p-1.5 rounded-lg transition-all ${weather === "rain" ? "bg-[#2C3E6B]/30 text-[#6FA8DC]" : "text-[#F9F7F3]/50 hover:text-[#F9F7F3]"}`}><CloudRain className="w-3 h-3" /></button>
                        <button onClick={() => setWeather("snow")} className={`p-1.5 rounded-lg transition-all ${weather === "snow" ? "bg-[#FFF]/10 text-[#FFF]" : "text-[#F9F7F3]/50 hover:text-[#F9F7F3]"}`}><CloudSnow className="w-3 h-3" /></button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              )}

              {!isMobile && (
                <button
                  onClick={() => {
                    if (tourActive) {
                      setTourActive(false);
                    } else {
                      setTourIndex(0); setTourPause(0); setTourActive(true); setActiveBuilding(null);
                    }
                  }}
                  className={`bg-black/40 backdrop-blur-md p-1.5 sm:p-2.5 rounded-xl border transition-all text-[#D4A017] ${tourActive ? 'border-[#D4A017] shadow-[0_0_15px_rgba(212,160,23,0.3)]' : 'border-[#D4A017]/40 hover:border-[#D4A017]'}`}
                  title={tourActive ? "Stop Tour" : "Take a guided tour"}
                >
                  {tourActive ? <Square className="w-3 sm:w-4 h-3 sm:h-4" /> : <Play className="w-3 sm:w-4 h-3 sm:h-4" />}
                </button>
              )}

              <button
                onClick={() => setShowAboutMe(true)}
                className="bg-black/40 backdrop-blur-md p-1.5 sm:p-2.5 rounded-xl border border-[#00FFCC]/20 hover:border-[#00FFCC]/60 transition-all text-[#00FFCC] hover:shadow-[0_0_15px_rgba(0,255,204,0.2)]"
                title="About Heet"
              >
                <User className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>

              <a
                href="/Heet_Mehta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-black/40 backdrop-blur-md px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-xl border border-[#D4A017]/30 hover:border-[#D4A017] transition-all text-[#D4A017] flex items-center gap-1 sm:gap-2 font-mono ${isMobile ? "text-[8px]" : "text-xs"} shadow-[0_0_15px_rgba(212,160,23,0.1)] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]`}
              >
                <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                {isMobile ? "" : "Resume"}
              </a>
            </div>
          </div>

          {/* GitHub stats bar */}
          {ghData && !isMobile && (
            <div className={`absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 pointer-events-auto bg-black/30 backdrop-blur-md px-3 sm:px-4 py-1 rounded-full border border-[#00FFCC]/10`}>
              <div className="flex items-center gap-3 sm:gap-4 font-mono text-[8px] sm:text-[9px] text-[#F9F7F3]/60">
                <span>{ghData.repos} repos</span>
                <span>✦ {ghData.stars} stars</span>
              </div>
            </div>
          )}

          {/* Mode indicator */}
            <div className={`absolute ${isMobile ? "top-16 right-4" : "top-20 right-24"} pointer-events-none flex flex-wrap gap-2 justify-end max-w-[200px]`}>
              {flying && (
              <span className="bg-[#00FFCC]/20 text-[#00FFCC] font-mono text-[9px] px-2 py-0.5 rounded-full border border-[#00FFCC]/30">
                FLYING
              </span>
            )}
            {firstPerson && (
              <span className="bg-[#D4A017]/20 text-[#D4A017] font-mono text-[9px] px-2 py-0.5 rounded-full border border-[#D4A017]/30">
                FP
              </span>
            )}
            {autoDayNight && (
              <span className="bg-[#3498DB]/20 text-[#3498DB] font-mono text-[9px] px-2 py-0.5 rounded-full border border-[#3498DB]/30">
                24H
              </span>
            )}
          </div>

          <div className="w-full flex justify-between items-end pointer-events-auto">
            <div className={`flex ${isMobile ? "flex-row gap-2" : "flex-col gap-3"}`}>
              <a
                href="https://github.com/HEETMEHTA18"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/40 backdrop-blur-md p-2 sm:p-3 rounded-full border border-[#00FFCC]/20 hover:border-[#00FFCC]/60 transition-all text-[#00FFCC]"
              >
                <GitHubIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="https://linkedin.com/in/heetmehta18"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/40 backdrop-blur-md p-2 sm:p-3 rounded-full border border-[#00FFCC]/20 hover:border-[#00FFCC]/60 transition-all text-[#00FFCC]"
              >
                <LinkedInIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
              <a
                href="mailto:heetmehta18.work@gmail.com"
                className="bg-black/40 backdrop-blur-md p-2 sm:p-3 rounded-full border border-[#00FFCC]/20 hover:border-[#00FFCC]/60 transition-all text-[#00FFCC]"
                title="Email Heet"
              >
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
              </a>
            </div>

            <AnimatePresence>
              {showScrollHint && !firstPerson && !flying && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col items-center gap-2 mb-4 pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="p-3 rounded-full bg-[#00FFCC]/10 border border-[#00FFCC]/30 text-[#00FFCC]"
                  >
                    <Mouse className="w-6 h-6" />
                  </motion.div>
                  <span className="font-mono text-xs text-[#00FFCC]/80 tracking-widest uppercase shadow-black drop-shadow-md text-center">
                    Click Building To Travel
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom-right controls hint */}
            {!isMobile && (
              <div className="flex flex-col items-end gap-1 mb-4">
                <span className="font-mono text-[8px] text-[#F9F7F3]/30">F: first-person</span>
                <span className="font-mono text-[8px] text-[#F9F7F3]/30">Space: fly</span>
                <span className="font-mono text-[8px] text-[#F9F7F3]/30">N: day/night cycle</span>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {nearbyBuilding && nearbyName && !activeBuilding && !isTraveling && !flying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              key="nearby-prompt"
              className={`fixed ${isMobile ? "bottom-36" : "bottom-20 sm:bottom-24"} left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm`}
            >
              <button
                type="button"
                onClick={handleNearbyClick}
                className="flex items-center gap-2 sm:gap-3 bg-[#050505]/85 backdrop-blur-md border border-[#00FFCC]/40 rounded-xl px-3 sm:px-5 py-2 sm:py-3 shadow-[0_0_25px_rgba(0,255,204,0.15)] hover:border-[#00FFCC] transition-all group cursor-pointer w-full"
              >
                <div className="p-1.5 sm:p-2 rounded-full bg-[#00FFCC]/10 border border-[#00FFCC]/30">
                  <Eye className="w-4 sm:w-5 h-4 sm:h-5 text-[#00FFCC]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-mono text-[10px] sm:text-xs text-[#00FFCC] font-semibold truncate">{nearbyName}</p>
                  <p className="font-mono text-[8px] sm:text-[10px] text-[#F9F7F3]/50">Click to explore this place</p>
                </div>
                <div className="p-1 sm:p-1.5 rounded-full bg-[#00FFCC]/10 text-[#00FFCC] group-hover:bg-[#00FFCC]/20 transition-all">
                  <Mouse className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Holographic Console */}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`fixed ${isMobile ? "bottom-24 left-4 right-4 max-w-full" : "bottom-6 left-6 w-full max-w-sm sm:max-w-md"} z-[60] h-72 bg-[#050505]/90 backdrop-blur-xl border border-[#00FFCC]/30 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,255,204,0.15)] pointer-events-auto`}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between bg-black/50 border-b border-[#00FFCC]/15 px-4 py-2.5 text-[#00FFCC]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 animate-pulse" />
                    <span className="font-mono text-xs font-bold tracking-wider uppercase font-semibold">Portfolio Console</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] text-[#F9F7F3]/40">Press T to close</span>
                  <button
                    onClick={() => setShowTerminal(false)}
                    className="font-mono text-xs text-[#00FFCC]/65 hover:text-[#00FFCC] transition-colors p-1"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] sm:text-xs space-y-2 select-text text-left text-[#F9F7F3]">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={item.type === "input" ? "text-[#00FFCC]" : "text-[#F9F7F3]/85"}>
                    {item.type === "input" ? `visitor@heet:~$ ${item.text}` : item.text.split("\n").map((line, lIdx) => (
                      <p key={lIdx} className="leading-relaxed whitespace-pre-wrap">{line}</p>
                    ))}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleTerminalSubmit} className="border-t border-[#00FFCC]/15 flex items-center bg-black/40 px-3 py-2">
                <span className="font-mono text-xs text-[#00FFCC] mr-2">visitor@heet:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'help'..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#F9F7F3] placeholder-[#F9F7F3]/25"
                />
                <button
                  type="submit"
                  className="p-1 rounded-lg hover:bg-[#00FFCC]/10 text-[#00FFCC] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </>)}
      <AboutMe />
    </>
  );
}
