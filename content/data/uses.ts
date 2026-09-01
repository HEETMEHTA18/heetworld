export type UsesCategory = {
  key: string;
  label: string;
  command: string;
  description?: string;
  items?: { name: string; detail: string; link?: string }[];
  content?: React.ReactNode;
};

export const usesCategoriesData: UsesCategory[] = [
  {
    key: "hardware",
    label: "Hardware",
    command: "display(stack.hardware)  # Hardware",
    items: [
      { name: "Laptop", detail: "Daily driver for development, ML experiments, research, and general work" },
      { name: "NVIDIA RTX 4050 Max-Q", detail: "~6 GB VRAM — local ML inference and model experimentation" },
      { name: "External monitor", detail: "Used when working with multiple terminals, notebooks, documentation, and development tools" },
      { name: "Mechanical keyboard", detail: "Daily typing and development" },
      { name: "Mouse", detail: "Daily development and general use" },
      { name: "Headphones", detail: "Focus sessions, calls, and long coding sessions" },
    ],
  },
  {
    key: "software",
    label: "Software",
    command: "display(stack.software)  # Software",
    items: [
      { name: "VS Code", detail: "Primary editor for development, Python, ML, and web projects", link: "https://code.visualstudio.com/" },
      { name: "Git", detail: "Version control for everything I build" },
      { name: "GitHub", detail: "Source control, collaboration, and open-source work" },
      { name: "Terminal", detail: "My primary interface for development and system work" },
      { name: "tmux", detail: "Terminal sessions and multi-process workflows" },
      { name: "Chrome", detail: "Documentation, research, development, and testing" },
      { name: "Jupyter", detail: "Experiments, data analysis, ML learning, and notebooks" },
      { name: "Docker", detail: "Reproducible development environments and deployments" },
    ],
  },
  {
    key: "editor",
    label: "Editor setup",
    command: "display(stack.editor)  # Editor setup",
    items: [
      { name: "Editor", detail: "VS Code" },
      { name: "Font", detail: "Monospace developer font" },
      { name: "Formatting", detail: "Prettier" },
      { name: "Linting", detail: "ESLint" },
      { name: "Python tooling", detail: "Virtual environments, formatters, linters, and notebook workflows" },
      { name: "Workflow", detail: "Terminal-first, keyboard-heavy, minimal extensions" },
      { name: "Version control", detail: "Git integrated directly into the development workflow" },
    ],
  },
  {
    key: "ai",
    label: "AI & ML",
    command: "display(stack.ai)  # AI & ML",
    description: "This is where most of my experimentation happens.",
    items: [
      { name: "Python", detail: "Primary language for machine learning, data work, automation, and experiments" },
      { name: "PyTorch", detail: "Deep learning and model experimentation" },
      { name: "scikit-learn", detail: "Classical machine learning and practical experiments" },
      { name: "Jupyter", detail: "Interactive ML experiments and learning" },
      { name: "Hugging Face", detail: "Models, datasets, and open-source ML ecosystem" },
      { name: "LLMs", detail: "Experimenting with different models, APIs, and local inference" },
      { name: "Local inference", detail: "NVIDIA GPU for experimenting with models locally" },
      { name: "AI APIs", detail: "Used when a hosted model makes more sense than local inference" },
    ],
  },
  {
    key: "environment",
    label: "Development environment",
    command: "display(stack.environment)  # Development environment",
    items: [
      { name: "OS", detail: "Pop!_OS 24.04 LTS — Linux-first development environment", link: "https://pop.system76.com/" },
      { name: "GPU", detail: "NVIDIA RTX 4050 Max-Q" },
      { name: "VRAM", detail: "~6 GB" },
      { name: "CUDA", detail: "NVIDIA CUDA environment for local ML workloads" },
      { name: "Python", detail: "Python 3.12" },
      { name: "Node.js", detail: "JavaScript/TypeScript runtime for web development and tooling" },
      { name: "npm", detail: "Package management and JavaScript tooling" },
      { name: "Jupyter", detail: "ML notebooks and experimentation" },
      { name: "Docker", detail: "Containers and reproducible environments" },
      { name: "Git", detail: "Version control and project history" },
    ],
  },
  {
    key: "web",
    label: "Web development",
    command: "display(stack.web)  # Web development",
    description: "When I'm not working on ML, I'm usually building something for the web.",
    items: [
      { name: "Next.js", detail: "Full-stack React applications" },
      { name: "React", detail: "Interfaces and interactive applications" },
      { name: "TypeScript", detail: "Safer, maintainable application code" },
      { name: "Tailwind CSS", detail: "Utility-first styling" },
      { name: "Node.js", detail: "Backend services and developer tooling" },
      { name: "Vercel", detail: "Deployment and experimentation" },
      { name: "Cloudflare", detail: "DNS, networking, edge infrastructure, and future infrastructure projects" },
    ],
  },
  {
    key: "research",
    label: "Research & learning",
    command: "display(stack.research)  # Research & learning",
    description: "I spend a lot of time learning by building.",
    items: [
      { name: "arXiv", detail: "Reading and exploring ML research" },
      { name: "Documentation", detail: "Primary source for understanding tools and APIs" },
      { name: "GitHub", detail: "Learning from real implementations and open-source projects" },
      { name: "Jupyter notebooks", detail: "Turning concepts into experiments" },
      { name: "Courses & tutorials", detail: "Used as starting points, followed by hands-on implementation" },
      { name: "Technical articles", detail: "For discovering new ideas and approaches" },
    ],
  },
  {
    key: "productivity",
    label: "Productivity",
    command: "display(stack.productivity)  # Productivity",
    description: "I keep the productivity stack intentionally small.",
    items: [
      { name: "Notes", detail: "Used for ideas, learning notes, and things worth remembering" },
      { name: "Task management", detail: "Simple task lists rather than complicated productivity systems" },
      { name: "Pomodoro", detail: "Useful when I need structured focus" },
      { name: "Terminal", detail: "My fastest way to interact with projects and systems" },
      { name: "Browser", detail: "Research, documentation, debugging, and discovery" },
    ],
  },
  {
    key: "projects",
    label: "What this setup is for",
    command: "display(stack.projects)  # What this setup is for",
    description: "This environment exists to support the things I care about building:",
    items: [
      { name: "Machine learning projects", detail: "Core focus" },
      { name: "AI experiments", detail: "Autonomous & local" },
      { name: "LLM applications", detail: "Context-aware systems" },
      { name: "Developer tools", detail: "Productivity & automation" },
      { name: "Automation", detail: "Workflows & pipelines" },
      { name: "NLP systems", detail: "Language models & text processing" },
      { name: "Open-source projects", detail: "Community contributions" },
      { name: "Web applications", detail: "Editorial & web apps" },
      { name: "Technical experiments", detail: "Hands-on prototypes" },
      { name: "Learning projects", detail: "Skill development" },
    ],
  },
];
