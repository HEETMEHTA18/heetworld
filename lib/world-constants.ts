export interface BuildingConfig {
  id: string;
  name: string;
  subtitle: string;
  position: [number, number, number];
  color: string;
  description: string;
  collisionRadius: number;
}

export const BUILDINGS: BuildingConfig[] = [
  {
    id: "town-square",
    name: "Central Plaza",
    subtitle: "Hero / Introduction",
    position: [0, 0, 0],
    color: "#D4A017",
    description: "Welcome — the central plaza introducing Heet's work and philosophy.",
    collisionRadius: 4.0
  },
  {
    id: "forge",
    name: "Development Studio",
    subtitle: "AutoDevs Project",
    position: [-20, 0, -6],
    color: "#C0392B",
    description: "Blacksmith workshop with glowing fires, where development automation tools are forged.",
    collisionRadius: 3.5
  },
  {
    id: "academy",
    name: "Research Institute",
    subtitle: "DevMentor Project",
    position: [20, 0, -6],
    color: "#2C3E6B",
    description: "A hall of learning featuring voice-to-PR agentic LLM pipelines.",
    collisionRadius: 3.5
  },
  {
    id: "watchtower",
    name: "Data Observatory",
    subtitle: "AI & ML projects",
    position: [0, 0, -22],
    color: "#D4A017",
    description: "Gothic tower monitoring neural networks, satellite analytics, and competitive platforms.",
    collisionRadius: 2.5
  },
  {
    id: "arena",
    name: "Competition Arena",
    subtitle: "Competitions",
    position: [18, 0, 14],
    color: "#E67E22",
    description: "Amphitheater celebrating competitive coding and event achievements.",
    collisionRadius: 4.5
  },
  {
    id: "guildhall",
    name: "Skills & Education Hall",
    subtitle: "Skills & Education",
    position: [-18, 0, 14],
    color: "#4A7C59",
    description: "Wide stone hall displaying skill trees and educational backgrounds.",
    collisionRadius: 3.5
  },
  {
    id: "town-hall",
    name: "Career Archives",
    subtitle: "Resume Timeline",
    position: [20, 0, 28],
    color: "#F2E6C9",
    description: "Grand civic building holding the timeline of Heet's developer journey.",
    collisionRadius: 3.5
  },
  {
    id: "harbor",
    name: "Communications Port",
    subtitle: "Contact & Connect",
    position: [-20, 0, 28],
    color: "#3498DB",
    description: "Docks with a rocking boat and lighthouse beacon for sending messages.",
    collisionRadius: 4.0
  },
  {
    id: "archive",
    name: "The Archive",
    subtitle: "ML Blog & Writings",
    position: [25, 0, 10],
    color: "#8B5CF6",
    description: "A quiet library filled with scrolls on machine learning, AI pipelines, and the journey of building intelligent systems.",
    collisionRadius: 3.5
  }
];

export const TOUR_SEQUENCE = [
  "town-square", "forge", "academy", "watchtower",
  "arena", "guildhall", "town-hall", "archive", "harbor"
];

export const SKILLS_DATA = {
  categories: [
    { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { title: "Backend", skills: ["Node.js", "Go", "Python", "REST API", "GraphQL"] },
    { title: "AI/ML", skills: ["TensorFlow", "scikit-learn", "Claude API", "RAG", "LLMs"] },
    { title: "Databases & DevOps", skills: ["PostgreSQL", "Redis", "MongoDB", "Docker", "GitHub Actions"] },
    { title: "Others", skills: ["Flutter", "C++", "Compiler Design", "Shell Scripting"] }
  ],
  education: [
    { degree: "B.Tech Computer Science & Engineering", institution: "CHARUSAT University, Anand, Gujarat", duration: "2024 – 2028" },
    { degree: "Analytics with Python / Algorithm Design", institution: "Coursera", duration: "Certifications" }
  ]
};

export interface BlogPost {
  title: string;
  url: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Building DevMentor: A Voice-to-PR AI Pipeline",
    url: "https://dev.to/heetmehta18/building-devmentor-voice-to-pr-ai-pipeline-3a1b",
    date: "2026",
    summary: "How I built an autonomous agent that turns voice commands into validated GitHub pull requests using Claude API and the self-correcting Ralph Loop. Deep dive into agentic architectures.",
    tags: ["AI/ML", "LLM", "Agentic"],
    readTime: "8 min",
    featured: true
  },
  {
    title: "AutoDevs: Scaffolding the Future of Development",
    url: "https://dev.to/heetmehta18/autodevs-scaffolding-future-of-development-2c4k",
    date: "2025",
    summary: "The story behind AutoDevs — a cross-platform CLI that bootstraps full-stack architectures in seconds with integrated security and containerization.",
    tags: ["DevTools", "CLI", "DevOps"],
    readTime: "6 min",
    featured: false
  },
  {
    title: "Coastal Guardian: AI for Satellite Erosion Detection",
    url: "https://dev.to/heetmehta18/coastal-guardian-ai-satellite-erosion-detection-5e9f",
    date: "2025",
    summary: "A deep dive into building CNN models to analyze NASA satellite imagery for detecting coastal erosion and predicting vulnerable segments.",
    tags: ["AI/ML", "CNN", "Computer Vision"],
    readTime: "10 min",
    featured: true
  },
  {
    title: "BinaryBattles: Real-Time Multiplayer Coding Arena",
    url: "https://dev.to/heetmehta18/binarybattles-real-time-multiplayer-coding-arena-8g2h",
    date: "2025",
    summary: "Engineering a competitive programming platform with WebSocket rooms, Redis-backed scoring, and Docker-isolated code execution sandboxes.",
    tags: ["Backend", "Real-Time", "DevOps"],
    readTime: "7 min",
    featured: false
  },
  {
    title: "Introduction to Machine Learning: A Beginner's Guide",
    url: "https://dev.to/heetmehta18/introduction-to-machine-learning-beginners-guide-9k1l",
    date: "2026",
    summary: "A comprehensive walkthrough of ML fundamentals — supervised vs unsupervised learning, model evaluation metrics, overfitting, and the complete ML workflow from data to deployment.",
    tags: ["AI/ML", "Beginner", "Tutorial"],
    readTime: "12 min",
    featured: true
  },
  {
    title: "Understanding CNNs: How Convolutional Neural Networks See Images",
    url: "https://dev.to/heetmehta18/understanding-cnns-how-convolutional-neural-networks-see-4f6m",
    date: "2026",
    summary: "Breaking down the architecture of CNNs — convolution layers, pooling, activation functions, and how these building blocks enable machines to recognize patterns in visual data.",
    tags: ["AI/ML", "CNN", "Deep Learning"],
    readTime: "9 min",
    featured: false
  },
  {
    title: "MLOps: Taking Machine Learning Models to Production",
    url: "https://dev.to/heetmehta18/mlops-taking-machine-learning-models-to-production-1p7n",
    date: "2026",
    summary: "A practical guide to MLOps pipelines — model versioning with DVC, containerization with Docker, CI/CD for ML, monitoring drift, and A/B testing in production.",
    tags: ["MLOps", "DevOps", "Production"],
    readTime: "11 min",
    featured: true
  },
  {
    title: "Feature Engineering: The Secret Sauce of Better Models",
    url: "https://dev.to/heetmehta18/feature-engineering-secret-sauce-better-models-6q8o",
    date: "2025",
    summary: "Exploring feature encoding strategies, handling missing data, creating interaction features, dimensionality reduction with PCA, and domain-specific feature extraction techniques.",
    tags: ["AI/ML", "Data Science", "Tutorial"],
    readTime: "8 min",
    featured: false
  },
  {
    title: "The Rise of Open-Source LLMs: From LLaMA to Fine-Tuning",
    url: "https://dev.to/heetmehta18/rise-of-open-source-llms-from-llama-to-fine-tuning-3r9s",
    date: "2026",
    summary: "Examining the open-source LLM landscape — architecture differences, fine-tuning with LoRA, quantization techniques, and building RAG applications on consumer hardware.",
    tags: ["AI/ML", "LLM", "Open Source"],
    readTime: "14 min",
    featured: true
  }
];

export const RESUME_TIMELINE = [
  {
    year: "2026",
    title: "AI Agent Engineering & ML Research",
    desc: "Architected DevMentor, a voice-to-PR agentic LLM pipeline with the self-correcting 'Ralph Loop' retry system. Completed an ML Research Internship at CHARUSAT, improving classifier F1-scores by 12%. Contributed to Ollama (PR #14992) and designed Coastal Guardian CNN model on NASA satellite data."
  },
  {
    year: "2025",
    title: "AutoDevs CLI & Competitive Programming",
    desc: "Shipped AutoDevs, a cross-platform developer CLI with 40+ boilerplates for smart developement and smooth devlopment for the coders. Built BinaryBattles, a real-time multiplayer competitive programming arena utilizing Redis queues and isolated Docker submission judging sandboxes."
  },
  {
    year: "2024",
    title: "University Entry & HSC Science",
    desc: "Began B.Tech in Computer Science & Engineering at CHARUSAT University (CSPIT), maintaining a CGPA of 8.23. Completed GSEB HSC Board examinations with a 95.40 percentile in the Science stream. Certified in Foundations of DSA."
  }
];
