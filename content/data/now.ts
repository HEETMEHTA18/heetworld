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
