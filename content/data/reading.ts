import type { ReadingBook } from "@/types";

export const reading: ReadingBook[] = [
  {
    title: "Designing Machine Learning Systems",
    author: "Chip Huyen",
    status: "Reading",
    category: "MLOps",
    progress: 60,
    note: "The best mental model for production ML I've found so far.",
  },
  {
    title: "The Rust Programming Language",
    author: "Steve Klabnik & Carol Nichols",
    status: "Reading",
    category: "Systems",
    progress: 40,
    note: "Building towards the low-latency parts of Tatvik.",
  },
  {
    title: "Shape Up",
    author: "Ryan Singer",
    status: "Finished",
    category: "Product",
    note: "Shaping work so it ships — shaped how I run side projects.",
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: "Bryant & O'Hallaron",
    status: "Reading",
    category: "Systems",
    progress: 25,
    note: "The foundation under everything else in this list.",
  },
  {
    title: "Attention Is All You Need",
    author: "Vaswani et al.",
    status: "Finished",
    category: "Research",
    note: "The transformer paper, annotated. Everyone should read it once.",
  },
  {
    title: "The Manager's Path",
    author: "Camille Fournier",
    status: "Up next",
    category: "Leadership",
    note: "For understanding how engineering orgs actually work.",
  },
  {
    title: "Hands-On Large Language Models",
    author: "Jay Alammar & Maarten Grootendorst",
    status: "Up next",
    category: "LLM",
    note: "For the applied side of LLM engineering.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    status: "Finished",
    category: "Craft",
    note: "Revisited on repeat; still full of good advice.",
  },
];
