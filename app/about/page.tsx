import Link from "next/link";
import Image from "next/image";

import { about } from "@/content/data/about";
import { experience } from "@/content/data/experience";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionDivider } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { PageFlow } from "@/components/page-flow";

export const metadata = {
  title: "About",
  description:
    "Heet Mehta — AI engineer and builder. Writing about how I think, what I build, and why.",
  openGraph: {
    title: "About — Heet Mehta",
    description:
      "AI engineer and builder. Writing about how I think, what I build, and why.",
    url: "https://heetworld.tech/about",
  },
};

const focus = [
  {
    id: "01",
    label: "Machine Learning",
    detail: "supervised learning, deep learning, transformers",
  },
  {
    id: "02",
    label: "LLM Systems",
    detail: "RAG, agents, fine-tuning, inference",
  },
  {
    id: "03",
    label: "NLP",
    detail: "tokenization, embeddings, retrieval, language models",
  },
  {
    id: "04",
    label: "Developer Tools",
    detail: "MCP, CLI, AI coding workflows",
  },
  {
    id: "05",
    label: "Product Engineering",
    detail: "React, Node.js, Firebase, full-stack systems",
  },
];

const principles = [
  { word: "Build", statement: "Learn by shipping." },
  { word: "Experiment", statement: "Turn questions into prototypes." },
  { word: "Understand", statement: "Don't hide behind abstractions." },
  { word: "Iterate", statement: "Every version should teach something." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        number="05"
        eyebrow="About"
        title="Who I am"
        description="I'm Heet — an AI engineer and builder. I design systems that run on-device, ship developer tools, and document what I learn."
      />

      <Container className="py-12 sm:py-20">
        {/* Banner */}
        <Reveal>
          <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:mb-16">
            <Image
              src="/images/linkedin-banner.png"
              alt="Personal banner — Heet Mehta, NLP engineer and builder"
              width={2000}
              height={600}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Introduction — Who I Am, Philosophy, How I Think */}
        <div className="max-w-2xl">
          {about.slice(0, 3).map((section, i) => (
            <Reveal key={section.id} delay={i * 0.06}>
              <div className="mt-12 first:mt-0 sm:mt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {section.label}
                </p>
                <h2
                  id={section.id}
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-pretty text-base leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Current Focus */}
      <Container className="py-12 sm:py-20">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Current Focus
          </p>
          <div className="mt-4 h-px w-full bg-border" />
        </Reveal>

        <div className="mt-8 space-y-0">
          {focus.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.05}>
              <div className="border-b border-border py-5">
                {/* Desktop: single row */}
                <div className="hidden items-center gap-6 sm:flex">
                  <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground/50">
                    {f.id}
                  </span>
                  <span className="w-[180px] shrink-0 text-base font-medium text-foreground">
                    {f.label}
                  </span>
                  <span className="font-mono text-[13px] text-muted-foreground">
                    {f.detail}
                  </span>
                </div>
                {/* Mobile: stacked */}
                <div className="flex flex-col gap-2 sm:hidden">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground/50">
                      {f.id}
                    </span>
                    <span className="text-base font-medium text-foreground">
                      {f.label}
                    </span>
                  </div>
                  <span className="pl-7 font-mono text-[13px] text-muted-foreground">
                    {f.detail}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Philosophy in Four Words */}
      <Container className="py-12 sm:py-20">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Philosophy
          </p>
          <div className="mt-4 h-px w-full bg-border" />
        </Reveal>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.word} delay={i * 0.05}>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                  {p.word}
                </p>
                <p className="mt-2 text-base text-muted-foreground">
                  {p.statement}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Why I Build + What I'm Learning + Current Focus */}
      <Container className="py-12 sm:py-20">
        <div className="max-w-2xl">
          {about.slice(3, 6).map((section, i) => (
            <Reveal key={section.id} delay={i * 0.06}>
              <div className="mt-12 first:mt-0 sm:mt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {section.label}
                </p>
                <h2
                  id={section.id}
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-pretty text-base leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* My Journey + Technical Focus + Roadmap + Where I'm Headed */}
      <Container className="py-12 sm:py-20">
        <div className="max-w-2xl">
          {about.slice(6).map((section, i) => (
            <Reveal key={section.id} delay={i * 0.06}>
              <div className="mt-12 first:mt-0 sm:mt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {section.label}
                </p>
                <h2
                  id={section.id}
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl"
                >
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-pretty text-base leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Where I've been */}
      <Container className="py-12 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Where I&apos;ve Been
            </p>
            <Link
              href="/experience"
              className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Full timeline →
            </Link>
          </div>
          <div className="mt-4 h-px w-full bg-border" />

          <div className="mt-8 space-y-5">
            {experience
              .filter((item) => !item.legacy)
              .slice(0, 3)
              .map((item, i) => (
                <div
                  key={`${item.org}-${i}`}
                  className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-8"
                >
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground sm:min-w-[110px]">
                    {item.period}
                  </span>
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {item.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.org}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Reveal>
      </Container>

      <PageFlow currentPath="/about" />
    </>
  );
}
