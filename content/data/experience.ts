import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    period: "August 2026 — Present",
    role: "Vice President",
    org: "Machine Learning Club",
    type: "Education",
    description: "Vice President, Machine Learning Club at CHARUSAT University",
    bullets: [],
    tags: ["Leadership", "ML Club"],
  },
  {
    period: "2025 — Present",
    role: "Open Source Maintainer",
    org: "Tatvik & AutoDevs",
    type: "Open Source",
    description:
      "Designing, building, and maintaining open-source AI tooling used by a small but real community. Responsible for architecture, docs, releases, and triage.",
    bullets: [
      "Shipped 9 releases across two repositories",
      "Wrote architecture docs and changelogs that users cite",
      "Turned contributor feedback into a roadmap",
    ],
    tags: ["LLM", "MCP", "Developer Tools"],
  },
  {
    period: "2025",
    role: "Machine Learning Intern",
    org: "Charusat University",
    type: "Internship",
    description:
      "Worked on machine learning research and development at Charusat University, contributing to ML pipelines and data-driven solutions.",
    bullets: [
      "Developed and optimized ML models for real-world classification tasks",
      "Built data preprocessing pipelines and evaluation frameworks",
      "Collaborated with research faculty on applied ML projects",
    ],
    tags: ["Python", "TensorFlow", "Scikit-learn"],
  },
  {
    period: "2024 — 2025",
    role: "Computer Vision Researcher",
    org: "Retail Shelf Intelligence",
    type: "Research",
    legacy: true,
    description:
      "Independently researched and built a shelf-monitoring system, from dataset creation to deployment, and wrote up the findings.",
    bullets: [
      "Collected and labelled a 2,400-image shelf dataset",
      "Reached 87.4% mAP@0.5 on the custom dataset",
      "Documented lessons that other CV builders cite",
    ],
    tags: ["Computer Vision", "YOLO", "Dataset"],
  },
  {
    period: "2024 — Present",
    role: "Hackathon Builder",
    org: "Multiple events",
    type: "Hackathon",
    description:
      "Building fast with strangers, which is the best forcing function for scoping and demoing I know.",
    bullets: [
      "Led teams to shipping working demos in 24–48 hours",
      "Focused on sharp demos over broad feature sets",
      "Met collaborators who became long-term friends",
    ],
    tags: ["Prototyping", "Teamwork"],
  },
  {
    period: "2023 — 2027",
    role: "Computer Engineering Student",
    org: "University",
    type: "Education",
    description:
      "Studying computer engineering with a focus on AI/ML systems, distributed computing, and software architecture.",
    bullets: [
      "Core coursework in DS&A, OS, networks, and ML",
      "Built side projects that became open source",
      "Teaching assistantships in data structures",
    ],
    tags: ["CSE", "ML", "Systems"],
  },
  {
    period: "2023",
    role: "First Open Source PR",
    org: "Developer tools",
    type: "Project",
    description:
      "My first merged contribution — a documentation fix that taught me more about maintainers than any tutorial.",
    bullets: [
      "Learned the contribution workflow",
      "Committed to tiny, well-documented PRs",
      "Started writing issues that explained problems",
    ],
    tags: ["Open Source"],
  },
  {
    period: "Next",
    role: "What I'm working toward",
    org: "Future goals",
    type: "Goal",
    description:
      "Where the next few years are pointed: shipping ML infrastructure that other engineers trust.",
    bullets: [
      "Deepen distributed training and serving work",
      "Grow Tatvik and AutoDevs into adopted projects",
      "Write more — systems notes, essays, and docs",
    ],
    tags: ["MLOps", "Open Source", "Writing"],
  },
];
