import {
  Code2,
  Server,
  Layout,
  Brain,
  Cloud,
  Terminal,
  Wrench,
  Database,
  Cpu,
  Globe,
  Shield,
  GitBranch,
  Container,
  FileCode,
  TerminalSquare,
  GitFork,
  Image,
  Paintbrush2,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  name: string;
  icon?: string; // SVG icon or class name
  color?: string; // hex color for the icon
  proficiency: string;
};

export type SkillGroup = {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string; // hex color for the category
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "languages",
    label: "Languages",
    description: "Core programming languages I use daily",
    icon: Code2,
    color: "#F7DF1E",
    skills: [
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E", proficiency: "Expert" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6", proficiency: "Expert" },
      { name: "Python", icon: "python", color: "#3776AB", proficiency: "Expert" },
      { name: "Rust", icon: "rust", color: "#CE422B", proficiency: "Intermediate" },
      { name: "C++", icon: "cplusplus", color: "#00599C", proficiency: "Beginner" },
      { name: "SQL", icon: "sql", color: "#CC2927", proficiency: "Advanced" },
      { name: "HTML/CSS", icon: "html5", color: "#E34F26", proficiency: "Expert" },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    description: "Building beautiful, performant user interfaces",
    icon: Layout,
    color: "#61DAFB",
    skills: [
      { name: "React", icon: "react", color: "#61DAFB", proficiency: "Expert" },
      { name: "Next.js", icon: "nextjs", color: "#000000", proficiency: "Expert" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4", proficiency: "Expert" },
      { name: "Framer Motion", icon: "framer", color: "#0055FF", proficiency: "Advanced" },
    ],
  },
  {
    key: "ml-ai",
    label: "ML / AI",
    description: "Machine learning and AI engineering",
    icon: Brain,
    color: "#FF6F00",
    skills: [
      { name: "TensorFlow", icon: "tensorflow", color: "#FF6F00", proficiency: "Advanced" },
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C", proficiency: "Advanced" },
      { name: "Scikit-learn", icon: "scikitlearn", color: "#F7931E", proficiency: "Advanced" },
      { name: "Hugging Face", icon: "huggingface", color: "#FFD21E", proficiency: "Advanced" },
      { name: "Neural Networks", icon: "neural", color: "#FF6F00", proficiency: "Advanced" },
      { name: "NLP", icon: "nlp", color: "#FF6F00", proficiency: "Advanced" },
      { name: "LLM Applications", icon: "llm", color: "#10A37F", proficiency: "Expert" },
      { name: "Embeddings", icon: "embeddings", color: "#10A37F", proficiency: "Advanced" },
      { name: "Retrieval-based systems", icon: "rag", color: "#10A37F", proficiency: "Advanced" },
      { name: "AI Agents", icon: "agents", color: "#10A37F", proficiency: "Expert" },
      { name: "Model Inference", icon: "inference", color: "#10A37F", proficiency: "Advanced" },
      { name: "AI Pipelines", icon: "pipeline", color: "#FF6F00", proficiency: "Advanced" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    description: "Building robust server-side systems",
    icon: Server,
    color: "#339933",
    skills: [
      { name: "Node.js", icon: "nodejs", color: "#339933", proficiency: "Expert" },
      { name: "Express", icon: "express", color: "#000000", proficiency: "Expert" },
      { name: "Firebase", icon: "firebase", color: "#FFCA28", proficiency: "Advanced" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud / Deployment",
    description: "Getting it live and reproducible.",
    icon: Cloud,
    color: "#4285F4",
    skills: [
      { name: "Vercel", icon: "vercel", color: "#000000", proficiency: "Expert" },
      { name: "Container", icon: "container", color: "#2496ED", proficiency: "Advanced" },
      { name: "Linux dev environments", icon: "linux", color: "#FCC624", proficiency: "Advanced" },
      { name: "Cloudflare", icon: "cloudflare", color: "#F38020", proficiency: "Intermediate" },
      { name: "DigitalOcean", icon: "digitalocean", color: "#0080FF", proficiency: "Beginner" },
      { name: "Oracle Cloud", icon: "oracle", color: "#F80000", proficiency: "Intermediate" },
    ],
  },
  {
    key: "databases",
    label: "Databases & ORMs",
    description: "Data storage and management",
    icon: Database,
    color: "#336791",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", color: "#336791", proficiency: "Expert" },
      { name: "Prisma", icon: "prisma", color: "#2D3748", proficiency: "Expert" },
      { name: "NeonDB", icon: "neon", color: "#0077CC", proficiency: "Advanced" },
    ],
  },
  {
    key: "devtools",
    label: "Developer Tools & Infrastructure",
    description: "How I make the work repeatable",
    icon: Terminal,
    color: "#4E81D1",
    skills: [
      { name: "Git", icon: "git", color: "#F05032", proficiency: "Expert" },
      { name: "GitHub", icon: "github", color: "#181717", proficiency: "Expert" },
      { name: "CLI development", icon: "terminal", color: "#4E81D1", proficiency: "Expert" },
      { name: "MCP", icon: "mcp", color: "#000000", proficiency: "Expert" },
      { name: "AI developer tooling", icon: "ai", color: "#10A37F", proficiency: "Expert" },
      { name: "Open-source workflows", icon: "opensource", color: "#24292E", proficiency: "Expert" },
      { name: "API integrations", icon: "api", color: "#000000", proficiency: "Expert" },
      { name: "Automation", icon: "automation", color: "#000000", proficiency: "Expert" },
      { name: "VS Code", icon: "vscode", color: "#007ACC", proficiency: "Expert" },
      { name: "Jupyter", icon: "jupyter", color: "#F37626", proficiency: "Advanced" },
      { name: "ESLint", icon: "eslint", color: "#4B32C3", proficiency: "Advanced" },
      { name: "Prettier", icon: "prettier", color: "#F7B93E", proficiency: "Advanced" },
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    description: "CI/CD, infrastructure, and deployment automation",
    icon: Cpu,
    color: "#0DB7ED",
    skills: [
      { name: "Github Actions (CI/CD)", icon: "githubactions", color: "#2088FF", proficiency: "Expert" },
      { name: "Authentication (OAuth, JWT)", icon: "auth", color: "#000000", proficiency: "Expert" },
    ],
  },
  {
    key: "integrations",
    label: "Integrations & APIs",
    description: "Third-party services and APIs",
    icon: Globe,
    color: "#6366F1",
    skills: [
      { name: "Razorpay", icon: "razorpay", color: "#3395FF", proficiency: "Advanced" },
      { name: "Stripe", icon: "stripe", color: "#635BFF", proficiency: "Expert" },
    ],
  },
];

export const archivedSkillGroups: SkillGroup[] = [
  {
    key: "languages",
    label: "Languages",
    description: "Exploring, or evaluated and set aside for now",
    icon: Code2,
    color: "#F7DF1E",
    skills: [
      { name: "Go", icon: "go", color: "#00ADD8", proficiency: "Beginner" },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    description: "Exploring, or evaluated and set aside for now",
    icon: Layout,
    color: "#61DAFB",
    skills: [
      { name: "React Native", icon: "react", color: "#61DAFB", proficiency: "Beginner" },
      { name: "Vite", icon: "vite", color: "#646CFF", proficiency: "Beginner" },
      { name: "Redux", icon: "redux", color: "#764ABC", proficiency: "Beginner" },
      { name: "TanStack Query", icon: "tanstack", color: "#FF4154", proficiency: "Beginner" },
      { name: "GSAP", icon: "gsap", color: "#88CE02", proficiency: "Beginner" },
      { name: "Motion.dev", icon: "motion", color: "#0055FF", proficiency: "Beginner" },
      { name: "MUI", icon: "mui", color: "#007FFF", proficiency: "Beginner" },
      { name: "React Email", icon: "reactemail", color: "#61DAFB", proficiency: "Beginner" },
      { name: "BetterAuth", icon: "betterauth", color: "#000000", proficiency: "Beginner" },
      { name: "Electron", icon: "electron", color: "#47848F", proficiency: "Beginner" },
      { name: "Flutter", icon: "flutter", color: "#02569B", proficiency: "Beginner" },
      { name: "Angular", icon: "angular", color: "#DD0031", proficiency: "Beginner" },
      { name: "Vue.js", icon: "vuejs", color: "#42B883", proficiency: "Beginner" },
      { name: "Nuxt.js", icon: "nuxtjs", color: "#00C58E", proficiency: "Beginner" },
      { name: "Svelte", icon: "svelte", color: "#FF3E00", proficiency: "Beginner" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    description: "Exploring, or evaluated and set aside for now",
    icon: Server,
    color: "#339933",
    skills: [
      { name: "Flask", icon: "flask", color: "#000000", proficiency: "Beginner" },
      { name: "Django", icon: "django", color: "#092E20", proficiency: "Beginner" },
      { name: "Spring", icon: "spring", color: "#6DB33F", proficiency: "Beginner" },
      { name: "FastAPI", icon: "fastapi", color: "#009688", proficiency: "Beginner" },
      { name: "GraphQL", icon: "graphql", color: "#E10098", proficiency: "Beginner" },
      { name: "Apollo", icon: "apollo", color: "#311C87", proficiency: "Beginner" },
      { name: "WebRTC", icon: "webrtc", color: "#333333", proficiency: "Beginner" },
    ],
  },
  {
    key: "cloud",
    label: "Cloud / Deployment",
    description: "Exploring, or evaluated and set aside for now",
    icon: Cloud,
    color: "#4285F4",
    skills: [
      { name: "Netlify", icon: "netlify", color: "#00C7B7", proficiency: "Beginner" },
      { name: "Render", icon: "render", color: "#46E3B7", proficiency: "Beginner" },
      { name: "GCP", icon: "gcp", color: "#4285F4", proficiency: "Beginner" },
      { name: "AWS", icon: "aws", color: "#FF9900", proficiency: "Beginner" },
      { name: "Railway", icon: "railway", color: "#0B0D0E", proficiency: "Beginner" },
      { name: "Heroku", icon: "heroku", color: "#430098", proficiency: "Beginner" },
    ],
  },
  {
    key: "databases",
    label: "Databases & ORMs",
    description: "Exploring, or evaluated and set aside for now",
    icon: Database,
    color: "#336791",
    skills: [
      { name: "MongoDB", icon: "mongodb", color: "#47A248", proficiency: "Beginner" },
      { name: "MySQL", icon: "mysql", color: "#4479A1", proficiency: "Beginner" },
      { name: "Drizzle", icon: "drizzle", color: "#C5F74F", proficiency: "Beginner" },
      { name: "Redis", icon: "redis", color: "#DC382D", proficiency: "Beginner" },
      { name: "Elasticsearch", icon: "elasticsearch", color: "#005571", proficiency: "Beginner" },
      { name: "Supabase", icon: "supabase", color: "#3ECF8E", proficiency: "Beginner" },
    ],
  },
  {
    key: "devtools",
    label: "Developer Tools & Infrastructure",
    description: "Exploring, or evaluated and set aside for now",
    icon: Terminal,
    color: "#4E81D1",
    skills: [
      { name: "Webpack", icon: "webpack", color: "#8DD6F9", proficiency: "Beginner" },
      { name: "Rollup", icon: "rollup", color: "#EC4A3F", proficiency: "Beginner" },
      { name: "Parcel", icon: "parcel", color: "#F7B93E", proficiency: "Beginner" },
      { name: "Babel", icon: "babel", color: "#F9DC3E", proficiency: "Beginner" },
      { name: "Jest", icon: "jest", color: "#C21325", proficiency: "Beginner" },
      { name: "Cypress", icon: "cypress", color: "#17202C", proficiency: "Beginner" },
      { name: "Playwright", icon: "playwright", color: "#2EAD33", proficiency: "Beginner" },
      { name: "Storybook", icon: "storybook", color: "#FF4785", proficiency: "Beginner" },
    ],
  },
  {
    key: "devops",
    label: "DevOps",
    description: "Exploring, or evaluated and set aside for now",
    icon: Cpu,
    color: "#0DB7ED",
    skills: [
      { name: "TRPC", icon: "trpc", color: "#2596BE", proficiency: "Beginner" },
      { name: "Nginx", icon: "nginx", color: "#009639", proficiency: "Beginner" },
      { name: "Apache", icon: "apache", color: "#D22128", proficiency: "Beginner" },
      { name: "Kubernetes", icon: "kubernetes", color: "#326CE5", proficiency: "Beginner" },
      { name: "Jenkins", icon: "jenkins", color: "#D24939", proficiency: "Beginner" },
      { name: "GitLab CI/CD", icon: "gitlab", color: "#FC6D26", proficiency: "Beginner" },
      { name: "Terraform", icon: "terraform", color: "#7B42BC", proficiency: "Beginner" },
      { name: "Ansible", icon: "ansible", color: "#EE0000", proficiency: "Beginner" },
      { name: "Prometheus", icon: "prometheus", color: "#E6522C", proficiency: "Beginner" },
      { name: "Grafana", icon: "grafana", color: "#F46800", proficiency: "Beginner" },
      { name: "Sentry", icon: "sentry", color: "#362D59", proficiency: "Beginner" },
      { name: "New Relic", icon: "newrelic", color: "#008C99", proficiency: "Beginner" },
    ],
  },
  {
    key: "integrations",
    label: "Integrations & APIs",
    description: "Exploring, or evaluated and set aside for now",
    icon: Globe,
    color: "#6366F1",
    skills: [
      { name: "Twilio", icon: "twilio", color: "#F22F46", proficiency: "Beginner" },
      { name: "SendGrid", icon: "sendgrid", color: "#1A82E2", proficiency: "Beginner" },
    ],
  },
  {
    key: "design",
    label: "Design & Creative",
    description: "Exploring, or evaluated and set aside for now",
    icon: Paintbrush2,
    color: "#F24E1E",
    skills: [
      { name: "Figma", icon: "figma", color: "#F24E1E", proficiency: "Beginner" },
      { name: "Photoshop", icon: "paintbrush2", color: "#31A8FF", proficiency: "Beginner" },
    ],
  },
];

export const levelLabel = {
  Primary: "Primary",
  Expert: "Expert",
  Advanced: "Advanced",
  Intermediate: "Intermediate",
  Beginner: "Beginner",
  Fluent: "Fluent",
  Learning: "Learning",
};

export const levelColor = {
  Primary: "bg-[#00C950]",
  Expert: "bg-[#00C950]",
  Advanced: "bg-[#00C950]",
  Intermediate: "bg-[#F59E0B]",
  Beginner: "bg-[#EF4444]",
  Fluent: "bg-[#00C950]",
  Learning: "bg-[#8B5CF6]",
};

export const levelOrder = { Primary: 0, Expert: 1, Advanced: 2, Intermediate: 3, Beginner: 4, Fluent: 5, Learning: 6 };