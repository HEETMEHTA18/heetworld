import {
  Code2,
  Server,
  Layout,
  Brain,
  Cloud,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  name: string;
  proficiency: string;
};

export type SkillGroup = {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "languages",
    label: "Programming",
    description: "The everyday building blocks.",
    icon: Code2,
    skills: [
      { name: "Python", proficiency: "Primary" },
      { name: "JavaScript", proficiency: "Fluent" },
      { name: "TypeScript", proficiency: "Fluent" },
      { name: "Java", proficiency: "Intermediate" },
      { name: "C / C++", proficiency: "Intermediate" },
      { name: "SQL", proficiency: "Fluent" },
    ],
  },
  {
    key: "ml-ai",
    label: "Machine Learning & AI",
    description: "Where most of my time goes now.",
    icon: Brain,
    skills: [
      { name: "TensorFlow", proficiency: "Intermediate" },
      { name: "Scikit-learn", proficiency: "Fluent" },
      { name: "Neural Networks", proficiency: "Intermediate" },
      { name: "NLP", proficiency: "Intermediate" },
      { name: "LLM Applications", proficiency: "Fluent" },
      { name: "Embeddings", proficiency: "Intermediate" },
      { name: "Retrieval-based systems", proficiency: "Fluent" },
      { name: "AI Agents", proficiency: "Fluent" },
      { name: "Model Inference", proficiency: "Fluent" },
      { name: "AI Pipelines", proficiency: "Intermediate" },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    description: "Interfaces that hold up in the real world.",
    icon: Layout,
    skills: [
      { name: "React.js", proficiency: "Fluent" },
      { name: "Next.js", proficiency: "Fluent" },
      { name: "Vite", proficiency: "Intermediate" },
      { name: "Tailwind CSS", proficiency: "Fluent" },
      { name: "HTML", proficiency: "Fluent" },
      { name: "CSS", proficiency: "Fluent" },
      { name: "Responsive UI", proficiency: "Fluent" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    description: "APIs and services behind the product.",
    icon: Server,
    skills: [
      { name: "Node.js", proficiency: "Fluent" },
      { name: "Express.js", proficiency: "Fluent" },
      { name: "Firebase", proficiency: "Fluent" },
      { name: "MongoDB", proficiency: "Intermediate" },
      { name: "Mongoose", proficiency: "Intermediate" },
      { name: "REST APIs", proficiency: "Fluent" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud / Deployment",
    description: "Getting it live and reproducible.",
    icon: Cloud,
    skills: [
      { name: "Vercel", proficiency: "Fluent" },
      { name: "Netlify", proficiency: "Intermediate" },
      { name: "Render", proficiency: "Intermediate" },
      { name: "Firebase", proficiency: "Fluent" },
      { name: "Docker", proficiency: "Intermediate" },
      { name: "Linux dev environments", proficiency: "Fluent" },
    ],
  },
  {
    key: "devtools",
    label: "Developer Tools & Infrastructure",
    description: "How I make the work repeatable.",
    icon: Terminal,
    skills: [
      { name: "Git", proficiency: "Fluent" },
      { name: "GitHub", proficiency: "Fluent" },
      { name: "CLI development", proficiency: "Fluent" },
      { name: "MCP", proficiency: "Fluent" },
      { name: "AI developer tooling", proficiency: "Fluent" },
      { name: "Open-source workflows", proficiency: "Fluent" },
      { name: "API integrations", proficiency: "Fluent" },
      { name: "Automation", proficiency: "Fluent" },
    ],
  },
  {
    key: "platforms",
    label: "Tools & Platforms",
    description: "The daily surface area.",
    icon: Wrench,
    skills: [
      { name: "VS Code", proficiency: "Primary" },
      { name: "GitHub", proficiency: "Fluent" },
      { name: "Hugging Face", proficiency: "Intermediate" },
      { name: "Jupyter", proficiency: "Intermediate" },
      { name: "Docker", proficiency: "Intermediate" },
      { name: "Flutter", proficiency: "Intermediate" },
      { name: "Firebase", proficiency: "Fluent" },
      { name: "MongoDB", proficiency: "Intermediate" },
      { name: "NVIDIA CUDA ecosystem", proficiency: "Intermediate" },
    ],
  },
];
