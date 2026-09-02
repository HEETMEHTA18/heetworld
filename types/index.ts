export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  status: "Active" | "In Progress" | "Archived";
  legacy?: boolean;
  category: string;
  tags: string[];
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  order: number;
  visual: "terminal" | "dashboard" | "diagram" | "laptop" | "architecture" | "mobile";
  image?: string;
  accent?: string;
  problem?: string;
  solution?: string;
  metrics?: { value: string; label: string }[];
  timeline: { period: string; label: string }[];
};

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  topics: string[];
  readingMinutes?: number;
  published?: boolean;
  draft?: boolean;
  legacy?: boolean;
};

export type ResearchNoteMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  area: string;
  tags: string[];
  readingMinutes?: number;
  legacy?: boolean;
};

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  type: "Open Source" | "Hackathon" | "Research" | "Project" | "Education" | "Internship" | "Goal";
  description: string;
  bullets: string[];
  tags: string[];
  link?: string;
  legacy?: boolean;
};

export type Photo = {
  number: string;
  title: string;
  description: string;
  credit?: string;
  src: string;
  alt: string;
  ratio: "tall" | "wide" | "square";
};
