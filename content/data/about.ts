export type AboutSection = {
  id: string;
  label: string;
  title: string;
  body: string[];
};

export const about: AboutSection[] = [
  {
    id: "who",
    label: "Who I Am",
    title: "AI engineer and builder based in India",
    body: [
      "I'm Heet — an AI engineer and builder based in India, working at the intersection of machine learning, developer tooling, and systems design, with an eye toward privacy and clarity.",
      "I'm a student, but I spend my time the way an engineer would: shipping projects, contributing upstream, and writing down what I learn so it's useful later.",
    ],
  },
  {
    id: "philosophy",
    label: "My Philosophy",
    title: "Constraints make better systems",
    body: [
      "The best architectures come from constraints, not freedom. A single-machine stack, a privacy-first requirement, a one-week hackathon deadline — these aren't limitations, they're guardrails that keep the design honest.",
      "I'd rather have a few abstractions that compose cleanly than many features that never quite touch ground. Good systems survive their authors leaving; most don't, and the difference is deliberate simplicity.",
    ],
  },
  {
    id: "thinking",
    label: "How I Think",
    title: "Measure the tax, then remove it",
    body: [
      "Before optimizing a model, I trace where the latency and complexity actually live — often it's not the slowest-looking part, but the handoff between two systems that neither one owns.",
      "I write for the future reader, including future me. Code and notes are the same thing: a message to someone who's forgotten the context.",
    ],
  },
  {
    id: "why",
    label: "Why I Build",
    title: "Because good tools compound",
    body: [
      "I build because the things I want usually don't exist yet — and the things that do exist rarely fit how I want to work.",
      "The most satisfying work sits quietly between a few people for a long time. A tool that saves a team a minute a day compounds into weeks saved.",
    ],
  },
  {
    id: "learning",
    label: "What I'm Learning",
    title: "Rust for low-latency, MCP as it settles",
    body: [
      "Rust is teaching me to treat memory and performance as design constraints, not afterthoughts — useful for the audio path in Tatvik.",
      "The MCP ecosystem is moving fast. I'm reading the spec, building tooling against it, and revising my assumptions with every release.",
    ],
  },
  {
    id: "focus",
    label: "Current Focus",
    title: "Local-first AI that people actually use",
    body: [
      "I'm deepening work on local-first AI: agents that reason about your own tools without leaving your machine, plus the documentation that helps others adopt that model.",
      "Everything else feeds one question: how do we make intelligent systems people can trust by default?",
    ],
  },
  {
    id: "journey",
    label: "My Journey",
    title: "From circuits to intelligence",
    body: [
      "I started in electronics and IoT, which gradually became a deeper interest in AI and machine learning. My path has moved roughly: IoT → Web Development → Full-Stack Engineering → AI Applications → Machine Learning → NLP & LLMs → AI Systems → Open Source.",
      "I like understanding systems end-to-end rather than working on a single layer — how data is collected and stored, how a model predicts, how it's wired into an application, how it scales, and how people actually use it.",
    ],
  },
  {
    id: "ai-focus",
    label: "Technical Focus",
    title: "AI & Machine Learning fundamentals",
    body: [
      "My current foundation is machine learning, with NLP as my chosen domain: supervised and unsupervised learning, neural networks, TensorFlow, Scikit-learn, plus large language models, retrieval and QA systems, AI agents, LLM pipelines, model inference, and AI-powered developer tools.",
      "I care about moving past just consuming AI APIs, toward understanding the full pipeline: Data → Preprocessing → Model → Training → Evaluation → Inference → Application → Deployment.",
    ],
  },
  {
    id: "roadmap",
    label: "Learning Roadmap",
    title: "What I'm studying now",
    body: [
      "Machine Learning — linear algebra, probability, statistics, optimization, classical algorithms, model evaluation, feature engineering.",
      "Deep Learning — neural networks, transformers, transfer learning, representation learning.",
      "NLP & LLMs — transformers, tokenization, embeddings, retrieval, QA, RAG, agents, inference systems.",
      "ML Engineering — data pipelines, experiment tracking, model serving, deployment, monitoring, optimization.",
    ],
  },
  {
    id: "interests",
    label: "Where I'm Headed",
    title: "Areas I want to work in",
    body: [
      "AI/ML Engineering, NLP, LLM Systems, AI Agents, Developer Tools, Open Source, AI Infrastructure, Intelligent IoT, Real-Time AI Applications.",
    ],
  },
];
