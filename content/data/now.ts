export const changelog = [
  {
    version: "v2.0",
    date: "2026-08-01",
    title: "Rebuilt with clarity",
    entries: [
      "Full redesign: editorial layout, more whitespace, better hierarchy",
      "Project pages rewritten as documentation",
      "Added research notes and writing collections",
      "Added /now, /reading, /bookmarks, /playground",
      "Light and dark themes tuned for readability",
    ],
  },
  {
    version: "v1.4",
    date: "2026-05-02",
    title: "Gallery and uses",
    entries: [
      "Launched gallery section",
      "Added /uses with full setup breakdown",
      "Performance pass — Lighthouse to 96+",
    ],
  },
  {
    version: "v1.2",
    date: "2026-02-14",
    title: "First projects",
    entries: [
      "Published Tatvik and AutoDevs write-ups",
      "Added RSS feed",
      "Open Graph and Twitter cards",
    ],
  },
  {
    version: "v1.0",
    date: "2025-12-01",
    title: "Initial launch",
    entries: [
      "Home, about, and contact",
      "Theme toggle and responsive navigation",
      "SEO metadata and sitemap",
    ],
  },
] as const;

export const thoughts = [
  {
    date: "2026-07-28",
    text: "The best debugging tool is often a smaller scope, not a better stack trace.",
  },
  {
    date: "2026-07-19",
    text: "Documentation is a feature. The README is the first user.",
  },
  {
    date: "2026-07-11",
    text: "A portfolio should be a notebook, not a trophy case.",
  },
  {
    date: "2026-06-30",
    text: "Constraints are a design gift. One machine. One network call. What survives?",
  },
  {
    date: "2026-06-21",
    text: "Speed is a feature; latency is a tax. Measure the tax.",
  },
  {
    date: "2026-06-10",
    text: "Ship small, ship often, ship honestly.",
  },
] as const;

export const currentStack = {
  update: "2026-08-01",
  build: [
    "Next.js (this site and most web projects)",
    "TypeScript everywhere I can",
    "Tailwind CSS for styling",
    "Framer Motion for motion",
    "Vercel for deployment",
  ],
  learning: [
    "Rust — writing the audio core of Tatvik",
    "Distributed training checkpoints",
    "MCP ecosystem as it settles",
    "Cleaner information architecture",
  ],
  using: [
    "Claude for pairing and review",
    "VS Code + Geist Mono",
    "Linear for tracking",
    "Notion for research notes",
    "RSS + Kindle for reading",
  ],
  next: [
    "Shard-aware checkpointing",
    "Tatvik tool calling",
    "A short essay on documentation",
  ],
} as const;

export const now = {
  update: "2026-08-01",
  working: [
    "Tatvik — adding tool calling and multi-language wake word",
    "AutoDevs — building persistent repo memory",
    "Retail Shelf Intelligence — expanding the dataset to new store layouts",
  ],
  studying: [
    "Rust systems programming for low-latency audio",
    "Distributed training and checkpointing",
    "The MCP ecosystem as it evolves",
  ],
  reading: [
    "Designing Machine Learning Systems — Chip Huyen",
    "The Rust Programming Language — Klabnik & Nichols",
  ],
  planning: [
    "A proper essay on documentation",
    "Co-authoring a workshop on local-first AI",
    "Growing both open-source projects' communities",
  ],
} as const;
