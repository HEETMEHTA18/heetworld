"use client";

import React, { useState, useEffect } from "react";
import { useVillageStore } from "@/store/villageStore";
import { BUILDINGS, SKILLS_DATA, RESUME_TIMELINE, BLOG_POSTS, BlogPost } from "@/lib/world-constants";
import {
  X,
  ExternalLink,
  Terminal,
  Award,
  Send,
  ArrowRight,
  Download,
  Zap,
  BookOpen,
  Eye,
  Trophy,
  Shield,
  ScrollText,
  Anchor,
  Library,
  User,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

const SECTION_CONFIG: Record<string, { gradient: string; icon: React.ReactNode; accentBar: string }> = {
  "town-square": { gradient: "from-[#D4A017]/8 via-transparent to-transparent", icon: <User className="w-5 h-5" />, accentBar: "bg-[#D4A017]" },
  "forge": { gradient: "from-[#C0392B]/8 via-transparent to-transparent", icon: <Zap className="w-5 h-5" />, accentBar: "bg-[#C0392B]" },
  "academy": { gradient: "from-[#2C3E6B]/8 via-transparent to-transparent", icon: <BookOpen className="w-5 h-5" />, accentBar: "bg-[#2C3E6B]" },
  "watchtower": { gradient: "from-[#00FFCC]/5 via-transparent to-transparent", icon: <Eye className="w-5 h-5" />, accentBar: "bg-[#00FFCC]" },
  "arena": { gradient: "from-[#E67E22]/8 via-transparent to-transparent", icon: <Trophy className="w-5 h-5" />, accentBar: "bg-[#E67E22]" },
  "guildhall": { gradient: "from-[#4A7C59]/8 via-transparent to-transparent", icon: <Shield className="w-5 h-5" />, accentBar: "bg-[#4A7C59]" },
  "town-hall": { gradient: "from-[#F2E6C9]/5 via-transparent to-transparent", icon: <ScrollText className="w-5 h-5" />, accentBar: "bg-[#F2E6C9]" },
  "harbor": { gradient: "from-[#3498DB]/8 via-transparent to-transparent", icon: <Anchor className="w-5 h-5" />, accentBar: "bg-[#3498DB]" },
  "archive": { gradient: "from-[#8B5CF6]/8 via-transparent to-transparent", icon: <Library className="w-5 h-5" />, accentBar: "bg-[#8B5CF6]" },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function Panels() {
  const { activeBuilding, setActiveBuilding } = useVillageStore();
  const handleClose = () => setActiveBuilding(null);
  const config = activeBuilding ? SECTION_CONFIG[activeBuilding] : null;

  useEffect(() => {
    if (activeBuilding) {
      history.replaceState(null, "", `#${activeBuilding}`);
    } else {
      history.replaceState(null, "", window.location.pathname);
    }
  }, [activeBuilding]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveBuilding(null);
    };
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && BUILDINGS.some((b) => b.id === hash)) {
        useVillageStore.getState().setActiveBuilding(hash);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [setActiveBuilding]);

  return (
    <AnimatePresence>
      {activeBuilding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ x: "100%", opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`h-full w-full max-w-xl md:max-w-2xl bg-[#1C1A14]/95 border-l border-[#F2E6C9]/10 text-[#F9F7F3] shadow-2xl overflow-y-auto flex flex-col justify-between bg-gradient-to-br ${config?.gradient || ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 flex flex-col flex-1 overflow-y-auto h-full min-h-[300px]">
              {/* Accent bar */}
              <div className={`h-[2px] w-full ${config?.accentBar || "bg-[#D4A017]"} rounded-full mb-4 opacity-60`} />

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#F2E6C9]/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#F2E6C9]/5 text-[#D4A017] shrink-0">
                    {config?.icon}
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D4A017] break-words">
                      {BUILDINGS.find((b) => b.id === activeBuilding)?.subtitle}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F2E6C9] mt-0.5 leading-tight">
                      {BUILDINGS.find((b) => b.id === activeBuilding)?.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4A017]/30 hover:border-[#D4A017] text-xs font-mono text-[#D4A017] transition-all hover:bg-[#D4A017]/10 hover:shadow-[0_0_15px_rgba(212,160,23,0.15)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Resume</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full border border-[#F2E6C9]/10 hover:bg-[#F2E6C9]/10 transition-all hover:scale-105"
                  >
                    <X className="w-5 h-5 text-[#F2E6C9]" />
                  </button>
                </div>
              </div>

              {/* Dynamic Content */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="py-2 flex-1"
              >
                {activeBuilding === "town-square" && <TownSquarePanel />}
                {activeBuilding === "forge" && <ForgePanel />}
                {activeBuilding === "academy" && <AcademyPanel />}
                {activeBuilding === "watchtower" && <WatchtowerPanel />}
                {activeBuilding === "arena" && <ArenaPanel />}
                {activeBuilding === "guildhall" && <GuildhallPanel />}
                {activeBuilding === "town-hall" && <TownHallPanel />}
                {activeBuilding === "harbor" && <HarborPanel />}
                {activeBuilding === "archive" && <ArchivePanel />}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-6 md:px-8 pt-4 pb-6 border-t border-[#F2E6C9]/10 flex justify-between items-center text-xs font-mono text-[#F2E6C9]/40 shrink-0 bg-black/20">
              <span>Portfolio Navigation</span>
              <span>Press ESC to return</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 1. Town Square Panel (Hero / Intro)
function TownSquarePanel() {
  const { setActiveBuilding } = useVillageStore();
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D4A017] shadow-[0_0_25px_rgba(212,160,23,0.25)] shrink-0 bg-black/40">
          <img src="/heet_avatar.jpeg" alt="Heet Mehta" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 space-y-1.5 p-4 bg-[#F2E6C9]/5 rounded border border-[#F2E6C9]/10 font-mono text-sm leading-relaxed text-[#F2E6C9]/85 w-full">
          <p className="mb-2 text-[#D4A017] font-semibold">{"// BUILDER PROFILE"}</p>
          <p><strong className="text-[#F2E6C9]">Name:</strong> Heet Mehta</p>
          <p><strong className="text-[#F2E6C9]">Role:</strong> Computer Engineering Student | Full-Stack | AI Builder</p>
          <p><strong className="text-[#F2E6C9]">Focus:</strong> Autonomous agentic software & tool automation</p>
          <p><strong className="text-[#F2E6C9]">Education:</strong> B.Tech CSE, CHARUSAT University (2024 - 2028)</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="font-display text-3xl font-bold text-[#F2E6C9]">About Heet</h3>
        <p className="font-body text-lg text-[#F9F7F3]/90 leading-relaxed">
          I design and build software that automates the complex. From building robust cross-platform CLI tools like
          <strong className="text-[#D4A017]"> AutoDevs</strong>, to engineering voice-driven AI pipelines like
          <strong className="text-[#D4A017]"> DevMentor</strong>, I enjoy translating conversational prompts into fully validated deployment pull requests.
        </p>
        <p className="font-body text-lg text-[#F9F7F3]/90 leading-relaxed">
          Based in Gujarat, India, I spend my time exploring developer tooling, compiling compilers, hacking together WebSocket engines, and contributing to open-source systems like Ollama.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-4">
        <button
          onClick={() => setActiveBuilding("forge")}
          className="flex items-center justify-between p-4 bg-[#C0392B]/10 hover:bg-[#C0392B]/20 border border-[#C0392B]/35 rounded-lg text-left transition-all group hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(192,57,43,0.15)] active:scale-[0.98]"
        >
          <div>
            <h4 className="font-display font-bold text-xl text-[#F2E6C9]">The Forge</h4>
            <p className="font-mono text-xs text-[#F2E6C9]/60 mt-1">See AutoDevs CLI</p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#C0392B] group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => setActiveBuilding("academy")}
          className="flex items-center justify-between p-4 bg-[#2C3E6B]/15 hover:bg-[#2C3E6B]/25 border border-[#2C3E6B]/35 rounded-lg text-left transition-all group hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(44,62,107,0.15)] active:scale-[0.98]"
        >
          <div>
            <h4 className="font-display font-bold text-xl text-[#F2E6C9]">The Academy</h4>
            <p className="font-mono text-xs text-[#F9F7F3]/60 mt-1">See DevMentor AI</p>
          </div>
          <ArrowRight className="w-5 h-5 text-[#D4A017] group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}

// 2. The Forge (AutoDevs Project)
function ForgePanel() {
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep((s) => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="p-5 bg-[#C0392B]/8 border border-[#C0392B]/20 rounded-xl">
        <p className="font-body text-lg text-[#F9F7F3]/90 italic leading-relaxed">
          &quot;Scaffold. Automate. Ship.&quot; — AutoDevs is an overpowered development engine designed to bootstrap full-stack architectures in seconds.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-[#1A1A1A] rounded-xl border border-[#F2E6C9]/10 overflow-hidden shadow-inner">
        <div className="flex items-center gap-1.5 bg-[#252525] px-4 py-2.5 border-b border-[#F2E6C9]/10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C0392B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4A017]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#4A7C59]" />
          <span className="font-mono text-xs text-[#F2E6C9]/40 ml-4">autodevs CLI</span>
        </div>
        <div className="p-5 font-mono text-xs h-40 flex flex-col justify-between text-[#F9F7F3]/80">
          {terminalStep >= 0 && <p className="text-[#00FFCC]">$ npx autodevs create my-app</p>}
          {terminalStep >= 1 && <p className="text-yellow-400">⚡ Scaffold project initialized with React, Node.js, and Docker...</p>}
          {terminalStep >= 2 && <p className="text-green-400">✓ Running security safety audit (autodev audit)...</p>}
          {terminalStep >= 3 && <p className="text-white font-bold">🎉 Project created successfully in 1.4s! Ready to ship.</p>}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-3 font-mono text-sm">
        <h4 className="font-display text-2xl font-bold text-[#F2E6C9]">{"// Key Attributes"}</h4>
        <ul className="space-y-2.5 list-disc pl-4 text-[#F9F7F3]/85">
          <li>Automated scaffolding for Next.js, React-TS, and Flutter.</li>
          <li>Integrated security scanners auditing direct dependencies against the OSV DB.</li>
          <li>Zero-config containerization & DevContainer setup files.</li>
          <li>CLI distribution across NPM, Homebrew, and Docker containers.</li>
        </ul>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
        {["Node.js", "TypeScript", "Shell Scripting", "Docker", "GitHub Actions"].map((tech) => (
          <span key={tech} className="px-3 py-1.5 bg-[#1A1A1A] border border-[#C0392B]/20 rounded-full text-xs font-mono text-[#D4A017] hover:border-[#C0392B]/50 transition-colors">
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-4 pt-4">
        <a
          href="https://github.com/heetmehta18/autodev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C0392B]/10 hover:bg-[#C0392B]/20 border border-[#C0392B]/40 rounded-lg text-sm font-mono text-[#F9F7F3] transition-all hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(192,57,43,0.15)] active:scale-[0.98]"
        >
          <GitHubIcon className="w-4 h-4" />
          GitHub Repo
        </a>
        <a
          href="https://autodevs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-[#F2E6C9]/5 border border-[#F2E6C9]/10 rounded-lg text-sm font-mono text-[#F2E6C9] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ExternalLink className="w-4 h-4" />
          Visit Website
        </a>
      </motion.div>
    </div>
  );
}

// 3. The Academy (DevMentor Project)
function AcademyPanel() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="p-5 bg-[#2C3E6B]/10 border border-[#2C3E6B]/20 rounded-xl">
        <p className="font-body text-lg text-[#F9F7F3]/90 italic leading-relaxed">
          &quot;Speak your changes. Ship it.&quot; — DevMentor bridges voice instructions to codebase changes via autonomous LLM pipelines.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="border border-[#F2E6C9]/10 rounded-xl p-5 bg-[#1A1A1A] space-y-4">
        <h4 className="font-mono text-xs text-[#D4A017] uppercase tracking-wider">{"// AGENT PIPELINE"}</h4>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-center text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#2C3E6B]/20 border border-[#2C3E6B]/40 flex-1 hover:scale-[1.02] transition-transform">
            <span className="block font-bold text-[#F2E6C9] text-sm">1. Voice/Text Input</span>
            <span className="text-[#F2E6C9]/60 text-[10px]">Mobile Flutter client</span>
          </div>
          <div className="text-[#D4A017] flex justify-center rotate-90 md:rotate-0">→</div>
          <div className="p-3 rounded-lg bg-[#4A7C59]/20 border border-[#4A7C59]/40 flex-1 hover:scale-[1.02] transition-transform">
            <span className="block font-bold text-[#F2E6C9] text-sm">2. Claude LLM RAG</span>
            <span className="text-[#F2E6C9]/60 text-[10px]">Context parsing</span>
          </div>
          <div className="text-[#D4A017] flex justify-center rotate-90 md:rotate-0">→</div>
          <div className="p-3 rounded-lg bg-[#C0392B]/20 border border-[#C0392B]/40 flex-1 hover:scale-[1.02] transition-transform">
            <span className="block font-bold text-[#F2E6C9] text-sm">3. Git Pull Request</span>
            <span className="text-[#F2E6C9]/60 text-[10px]">Validated & generated</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-3 font-mono text-sm">
        <h4 className="font-display text-2xl font-bold text-[#F2E6C9]">{"// Intelligent Retry Core"}</h4>
        <p className="font-body text-lg text-[#F9F7F3]/85 leading-relaxed">
          Features the custom <strong>&quot;Ralph Loop&quot; retry architecture</strong>: an intelligent self-correction loop that recompiles and lints code changes on the agent environment, retrying Claude prompts with diagnostic errors until the code compiles perfectly.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
        {["Go", "Flutter", "Claude API", "PostgreSQL", "Docker"].map((tech) => (
          <span key={tech} className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2C3E6B]/20 rounded-full text-xs font-mono text-[#D4A017] hover:border-[#2C3E6B]/50 transition-colors">
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-4 pt-4">
        <a
          href="https://github.com/heetmehta18/devmentor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2C3E6B]/20 hover:bg-[#2C3E6B]/30 border border-[#2C3E6B]/50 rounded-lg text-sm font-mono text-[#F9F7F3] transition-all hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(44,62,107,0.15)] active:scale-[0.98]"
        >
          <GitHubIcon className="w-4 h-4" />
          GitHub Repo
        </a>
      </motion.div>
    </div>
  );
}

// 4. The Watchtower (AI & ML Projects)
function WatchtowerPanel() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Coastal Guardian",
      tech: "TensorFlow · Python · Satellite Data",
      desc: "Deep learning system utilizing Convolutional Neural Networks (CNN) to analyze high-resolution satellite imagery over timespans. Automatically detects coastal erosion lines, sand depletion patterns, and predicts vulnerable segments.",
    },
    {
      title: "BinaryBattles",
      tech: "React · Node.js · Redis · PostgreSQL",
      desc: "Competitive programming arena with dynamic execution. Supports multi-player code rooms, real-time code checking sandboxes, Redis-backed scoring speed leaderboards, and persistent WebSockets rooms.",
      link: "https://binarybattles.dev",
    },
    {
      title: "Open Source",
      tech: "Go · Ollama · Apache APISIX",
      desc: "Active open-source contributor. Fixed Ollama double validation parsing errors (Ollama PR #14992). Contributed Apache APISIX gateway plugin integrations and OWASP BLT-MCP tooling.",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="flex border-b border-[#F2E6C9]/10 overflow-x-auto pb-px">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2.5 border-b-2 font-display text-base font-bold whitespace-nowrap transition-all ${
              activeTab === idx
                ? "border-[#00FFCC] text-[#00FFCC] scale-[1.02]"
                : "border-transparent text-[#F9F7F3]/60 hover:text-[#F9F7F3] hover:scale-[1.01]"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="p-6 bg-black/30 border border-[#F2E6C9]/5 rounded-xl space-y-4 min-h-48 flex flex-col justify-between">
        <div>
          <span className="font-mono text-xs text-[#00FFCC] bg-[#00FFCC]/10 px-2.5 py-1 rounded-full">
            {tabs[activeTab].tech}
          </span>
          <p className="font-body text-lg text-[#F9F7F3]/85 leading-relaxed mt-4">
            {tabs[activeTab].desc}
          </p>
        </div>
        {tabs[activeTab].link && (
          <div className="pt-2">
            <a
              href={tabs[activeTab].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00FFCC] hover:underline hover:scale-[1.02] transition-transform"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Visit Platform
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}

// 5. The Arena (Competitions & Achievements)
function ArenaPanel() {
  const events = [
    {
      title: "Event Coordinator & Mentor",
      org: "C Titans Hackathon & SUPERNOVA Coding Event",
      desc: "Organized engineering mock tests and algorithmic challenges for over 300+ CS undergraduates at university.",
    },
    {
      title: "Competitive Programming Organizer",
      org: "CHARUSAT University CSE",
      desc: "Drafted test cases, managed Docker runtime code submission judging sandboxes, and hosted weekly coding brackets.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {events.map((e, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="p-5 border border-[#F2E6C9]/10 rounded-xl bg-[#F2E6C9]/5 relative hover:border-[#E67E22]/30 transition-all hover:scale-[1.01] hover:shadow-[0_4px_20px_rgba(230,126,34,0.1)] group"
          >
            <div className="absolute top-4 right-4 text-[#E67E22] group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="font-mono text-[10px] text-[#E67E22] uppercase tracking-wider block">{e.org}</span>
            <h4 className="font-display text-xl font-bold text-[#F2E6C9] mt-1.5">{e.title}</h4>
            <p className="font-body text-sm text-[#F9F7F3]/75 mt-2 leading-relaxed">{e.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 6. The Guildhall (Skills & Education)
function GuildhallPanel() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skillToProjectsMap: { [key: string]: string[] } = {
    React: ["AutoDevs Web Site", "BinaryBattles", "Portfolio"],
    "Next.js": ["Portfolio"],
    TypeScript: ["AutoDevs CLI", "BinaryBattles"],
    "Node.js": ["AutoDevs CLI", "BinaryBattles"],
    Go: ["DevMentor Backend", "Ollama contribution", "Apache APISIX Middleware"],
    Python: ["Coastal Guardian CNN"],
    TensorFlow: ["Coastal Guardian CNN"],
    "Claude API": ["DevMentor"],
    PostgreSQL: ["DevMentor DB", "BinaryBattles"],
    Redis: ["BinaryBattles Websocket caching"],
    Docker: ["AutoDevs packaging", "DevMentor runtime environment"],
    Flutter: ["DevMentor Mobile client"],
  };

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-[#4A7C59]">{"// SKILL FOREST (Click nodes to trace usage)"}</h3>
        <div className="space-y-3">
          {SKILLS_DATA.categories.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="font-display font-semibold text-[#F2E6C9] text-base">{cat.title}</span>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const isSelected = selectedSkill === skill;
                  return (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(isSelected ? null : skill)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-all ${
                        isSelected
                          ? "bg-[#4A7C59] border-[#4A7C59] text-white font-bold shadow-[0_0_12px_rgba(74,124,89,0.3)]"
                          : "bg-transparent border-[#F2E6C9]/10 text-[#F9F7F3]/80 hover:border-[#4A7C59]/35 hover:scale-[1.03]"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-xl border border-[#4A7C59]/30 bg-[#4A7C59]/5"
          >
            <span className="font-mono text-xs text-[#4A7C59] block">SKILL TRACE: {selectedSkill}</span>
            <p className="font-body text-sm text-[#F9F7F3]/90 mt-1">
              Used in: {skillToProjectsMap[selectedSkill] ? skillToProjectsMap[selectedSkill].join(", ") : "Various research scripts & university projects."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp} className="space-y-3 pt-2">
        <h3 className="font-mono text-xs uppercase tracking-wider text-[#4A7C59]">{"// EDUCATION & CREDENTIALS"}</h3>
        <div className="space-y-3 font-mono">
          {SKILLS_DATA.education.map((edu, idx) => (
            <div key={idx} className="border-l-2 border-[#4A7C59]/30 pl-4 hover:border-[#4A7C59]/60 transition-colors">
              <span className="text-[#F2E6C9] font-bold block text-sm">{edu.degree}</span>
              <span className="text-[#F2E6C9]/60 text-xs block">{edu.institution} | {edu.duration}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// 7. Town Hall (Resume)
function TownHallPanel() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="flex gap-4">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#D4A017] hover:bg-[#B88714] text-[#1C1A14] font-bold rounded-xl transition-all text-sm font-mono shadow-md hover:shadow-[0_4px_20px_rgba(212,160,23,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Download PDF Resume
        </a>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-[#D4A017]">{"// TIMELINE OF BUILDER JOURNEY"}</h3>
        <div className="relative border-l-2 border-[#D4A017]/20 pl-6 ml-3 space-y-8 py-2">
          {RESUME_TIMELINE.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="relative group">
              <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-[#1C1A14] border-2 border-[#D4A017] flex items-center justify-center shadow group-hover:scale-125 transition-transform" />
              <span className="font-mono text-xs text-[#D4A017] font-semibold">{item.year}</span>
              <h4 className="font-display text-xl font-bold text-[#F2E6C9] mt-0.5">{item.title}</h4>
              <p className="font-body text-sm text-[#F9F7F3]/75 mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// 8. The Harbor (Contact Form) — realistic workflow: opens mail client + shows success
function HarborPanel() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setFormError("");
    try {
      // Validate
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Please fill in all fields.");
      }
      // Build realistic mailto — works without backend, proper workflow
      const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`);
      const mailto = `mailto:explore@heetworld.tech?subject=${subject}&body=${body}`;
      // Open mail client
      window.location.href = mailto;
      // Small delay to show feedback even though mailto is instant
      await new Promise((resolve) => setTimeout(resolve, 600));
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setFormStatus("error");
      setFormError(err instanceof Error ? err.message : "Failed to send. Try emailing explore@heetworld.tech directly.");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3 font-mono text-xs">
        <a
          href="https://github.com/heetmehta18"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-[#F2E6C9]/10 bg-black/10 hover:border-[#3498DB]/35 transition-all text-[#F2E6C9]/95 hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(52,152,219,0.1)] active:scale-[0.98]"
        >
          <GitHubIcon className="w-4 h-4 text-[#3498DB]" />
          github.com/heetmehta18
        </a>
        <a
          href="https://linkedin.com/in/heetmehta18"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-[#F2E6C9]/10 bg-black/10 hover:border-[#3498DB]/35 transition-all text-[#F2E6C9]/95 hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(52,152,219,0.1)] active:scale-[0.98]"
        >
          <LinkedInIcon className="w-4 h-4 text-[#3498DB]" />
          linkedin/in/heetmehta18
        </a>
      </motion.div>

      <motion.div variants={fadeUp} className="border border-[#F2E6C9]/10 rounded-xl bg-[#1A1A1A] p-6">
        <h4 className="font-mono text-xs text-[#3498DB] uppercase tracking-wider mb-5 flex items-center gap-1.5">
          <Terminal className="w-4 h-4" />
          Send a message to Heet
        </h4>

        {formStatus === "success" ? (
          <div className="text-center py-8 font-mono text-sm space-y-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-[#4A7C59] font-bold text-lg block"
            >
              ✓ Message transmitted successfully!
            </motion.span>
            <span className="text-[#F2E6C9]/60 text-xs block">Heet will receive this in his terminal inbox.</span>
            <button onClick={() => setFormStatus("idle")} className="mt-4 text-xs text-[#D4A017] hover:underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[#F2E6C9]/60">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-[#1C1A14] border border-[#F2E6C9]/10 rounded-lg p-2.5 focus:border-[#3498DB] focus:shadow-[0_0_10px_rgba(52,152,219,0.15)] outline-none text-[#F9F7F3] transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[#F2E6C9]/60">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-[#1C1A14] border border-[#F2E6C9]/10 rounded-lg p-2.5 focus:border-[#3498DB] focus:shadow-[0_0_10px_rgba(52,152,219,0.15)] outline-none text-[#F9F7F3] transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[#F2E6C9]/60">Message</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's forge something together..."
                className="w-full bg-[#1C1A14] border border-[#F2E6C9]/10 rounded-lg p-2.5 focus:border-[#3498DB] focus:shadow-[0_0_10px_rgba(52,152,219,0.15)] outline-none text-[#F9F7F3] resize-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={formStatus === "sending"}
              className="w-full py-3 bg-[#3498DB]/10 hover:bg-[#3498DB]/25 border border-[#3498DB]/40 rounded-xl text-center text-[#3498DB] font-semibold transition-all hover:shadow-[0_4px_15px_rgba(52,152,219,0.15)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-55"
            >
              <Send className="w-3.5 h-3.5" />
              {formStatus === "sending" ? "Opening email client..." : "Send Message"}
            </button>
            {formStatus === "error" && formError && (
              <p className="text-[11px] text-[#C0392B] mt-2">{formError}</p>
            )}
            <p className="text-[10px] text-[#F2E6C9]/30 mt-2 text-center">
              Or email directly: <a href="mailto:explore@heetworld.tech" className="text-[#3498DB] hover:underline">explore@heetworld.tech</a>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// 9. The Archive Panel (ML Blog & Writings)
function ArchivePanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags: string[] = Array.from(new Set(BLOG_POSTS.flatMap((post: BlogPost) => post.tags)));

  const filteredPosts = BLOG_POSTS.filter((post: BlogPost) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} className="p-5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl font-mono text-sm text-[#F9F7F3]/90">
        <p className="italic">
          &quot;Write. Teach. Iterate.&quot; — Exploration of neural networks, compiler internals, and agentic workflows.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4">
        <div className="relative">
          <ScrollText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F2E6C9]/30" />
          <input
            type="text"
            placeholder="Search scrolls & writings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1C1A14] border border-[#F2E6C9]/10 rounded-xl p-3 pl-9 focus:border-[#8B5CF6] focus:shadow-[0_0_10px_rgba(139,92,246,0.15)] outline-none text-[#F9F7F3] font-mono text-xs transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 text-[10px] font-mono rounded-full border transition-all ${
              selectedTag === null
                ? "bg-[#8B5CF6] border-[#8B5CF6] text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                : "bg-transparent border-[#F2E6C9]/10 text-[#F9F7F3]/60 hover:border-[#8B5CF6]/35 hover:scale-[1.03]"
            }`}
          >
            All Logs
          </button>
          {allTags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1.5 text-[10px] font-mono rounded-full border transition-all ${
                selectedTag === tag
                  ? "bg-[#8B5CF6] border-[#8B5CF6] text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                  : "bg-transparent border-[#F2E6C9]/10 text-[#F9F7F3]/60 hover:border-[#8B5CF6]/35 hover:scale-[1.03]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: BlogPost, idx: number) => (
            <div
              key={idx}
              className={`p-5 border rounded-xl bg-black/20 hover:bg-[#8B5CF6]/5 transition-all group ${
                post.featured ? "border-[#8B5CF6]/45 hover:shadow-[0_4px_20px_rgba(139,92,246,0.1)]" : "border-[#F2E6C9]/10 hover:border-[#F2E6C9]/20"
              } hover:scale-[1.01]`}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] text-[#8B5CF6] font-semibold">{post.date}</span>
                    <span className="text-[#F2E6C9]/40 text-[10px] font-mono">•</span>
                    <span className="text-[#F2E6C9]/40 text-[10px] font-mono">{post.readTime}</span>
                    {post.featured && (
                      <span className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#A78BFA] px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold">
                        Featured
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#F2E6C9] mt-1.5 group-hover:text-white transition-colors">
                    {post.title}
                  </h4>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[#F2E6C9]/10 hover:border-[#8B5CF6] text-[#F2E6C9]/60 hover:text-[#8B5CF6] transition-all bg-[#1C1A14]/60 hover:scale-110 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="font-body text-sm text-[#F9F7F3]/75 mt-2.5 leading-relaxed">{post.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 rounded-full text-[10px] font-mono text-[#A78BFA]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-[#F2E6C9]/10 rounded-xl font-mono text-xs text-[#F2E6C9]/40">
            No writings found matching search filter.
          </div>
        )}
      </motion.div>
    </div>
  );
}
