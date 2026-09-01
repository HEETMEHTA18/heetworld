export type AboutSection = {
  id: string;
  label: string;
  title: string;
  body: string[];
};

export const about: AboutSection[] = [
  {
    id: "who",
    label: "Who I am",
    title: "Computer engineering student, building AI systems",
    body: [
      "I'm Heet — an AI engineer and builder based in India. I work at the intersection of machine learning, developer tooling, and systems design, usually with an eye toward privacy and clarity.",
      "I'm a student, but I spend my time the way an engineer would: shipping projects, contributing upstream, and writing down what I learn so it's useful later.",
    ],
  },
  {
    id: "philosophy",
    label: "My Philosophy",
    title: "Constraints make better systems",
    body: [
      "The best architectures come from constraints, not from freedom. A single-machine stack, a privacy-first requirement, or a one-week hackathon cadence — these aren't limitations, they're guardrails that keep the design honest.",
      "I prefer fewer abstractions that compose cleanly to more features that almost never touch ground. Good systems survive their authors leaving; most don't, and the difference is deliberate simplicity.",
    ],
  },
  {
    id: "thinking",
    label: "How I Think",
    title: "Measure the tax, then remove it",
    body: [
      "Before optimizing a model, I trace where the latency and complexity actually live. Often it's not the thing that seems slowest — it's the handoff between two systems that neither owns.",
      "I write for the future reader. Including the future me. Code and notes are the same thing: a message to someone who has forgotten the context.",
    ],
  },
  {
    id: "why",
    label: "Why I Build",
    title: "Because good tools compound",
    body: [
      "I build because the things I want usually don't exist yet, and because the things that do exist usually don't fit how I want to work.",
      "The most satisfying work sits quietly between a few people for a long time — a tool that saves a team a minute a day compounds into weeks saved.",
    ],
  },
  {
    id: "learning",
    label: "What I'm Learning",
    title: "Rust for low-latency, MCP as it settles",
    body: [
      "Rust is teaching me to think about memory and performance as design constraints, not afterthoughts — useful for the audio path in Tatvik.",
      "The MCP ecosystem is evolving fast. I'm reading the spec and building tooling against it, and revising my assumptions each release.",
    ],
  },
  {
    id: "focus",
    label: "Current Focus",
    title: "Local-first AI that people actually use",
    body: [
      "Right now I'm deepening work on local-first AI: making agents that can reason about your own tools without leaving your machine, and building the documentation that lets others adopt that model.",
      "Everything else feeds this question: how do we make intelligent systems that people can trust by default?",
    ],
  },
  {
    id: "journey",
    label: "My Journey",
    title: "From circuits to intelligence",
    body: [
      "I started in electronics, IoT, and software development, which gradually evolved into a deeper interest in AI and machine learning. My path has broadly moved through IoT → Web Development → Full-Stack Engineering → AI Applications → Machine Learning → Computer Vision → LLMs & AI Systems → Open Source.",
      "I like understanding systems end-to-end rather than working on a single layer. That means caring about how data is collected and stored, how a model makes predictions, how it's integrated into an application, how the system scales, and how people actually interact with it.",
    ],
  },
  {
    id: "ai-focus",
    label: "Technical Focus",
    title: "AI & Machine Learning fundamentals",
    body: [
      "My current focus is building a strong foundation in machine learning: supervised and unsupervised learning, neural networks, TensorFlow, and Scikit-learn, alongside Computer Vision, NLP, large language models, retrieval and question-answering systems, AI agents, LLM pipelines, model inference, and AI-powered developer tools.",
      "I'm particularly interested in moving beyond simply consuming AI APIs and understanding the complete pipeline: Data → Preprocessing → Model → Training → Evaluation → Inference → Application → Deployment.",
    ],
  },
  {
    id: "roadmap",
    label: "Learning Roadmap",
    title: "What I'm studying now",
    body: [
      "Machine Learning: linear algebra, probability, statistics, optimization, classical algorithms, model evaluation, and feature engineering.",
      "Deep Learning: neural networks, CNNs, transformers, transfer learning, and representation learning.",
      "Computer Vision: OpenCV, classification, detection, segmentation, tracking, and vision transformers.",
      "NLP & LLMs: transformers, tokenization, embeddings, retrieval, question answering, RAG, LLM agents, and inference systems.",
      "ML Engineering: data pipelines, experiment tracking, model serving, deployment, monitoring, optimization, and production AI systems.",
    ],
  },
  {
    id: "interests",
    label: "Where I'm Headed",
    title: "Areas I want to work in",
    body: [
      "AI / ML Engineering, Computer Vision, LLM Systems, AI Agents, Developer Tools, Open Source, AI Infrastructure, Intelligent IoT, and Real-Time AI Applications.",
    ],
  },
];
