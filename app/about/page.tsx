import Link from "next/link";
import Image from "next/image";

import { about } from "@/content/data/about";
import { experience } from "@/content/data/experience";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionDivider } from "@/components/section";
import { Reveal } from "@/components/reveal";

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
  { id: "01", label: "Machine Learning", detail: "supervised learning · deep learning · transformers" },
  { id: "02", label: "LLM Systems", detail: "RAG · agents · fine-tuning · inference" },
  { id: "03", label: "NLP", detail: "tokenization · embeddings · retrieval · language models" },
  { id: "04", label: "Developer Tools", detail: "MCP · CLI · AI coding workflows" },
  { id: "05", label: "Product Engineering", detail: "React · Node.js · Firebase · full-stack systems" },
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

      <Container className="py-12 sm:py-16">
        {/* Banner */}
        <Reveal>
          <div className="mb-14 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <Image
              src="/images/Blue Modern Motivational LinkedIn Banner (1).png"
              alt="Personal banner — Heet Mehta, NLP engineer and builder"
              width={2000}
              height={600}
              priority
              sizes="(max-width: 640px) 100vw, 672px"
              className="h-auto w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Introduction */}
        <div className="max-w-2xl">
          {about.slice(0, 3).map((section, i) => (
            <Reveal key={section.id} delay={i * 0.06}>
              <div className="mt-12 first:mt-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {section.label}
                </p>
                <h2
                  id={section.id}
                  className="mt-3 text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((p, j) => (
                    <p key={j} className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
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
      <Container className="py-12 sm:py-16">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Current Focus
          </p>
          <div className="mt-4 h-px w-full bg-border" />
        </Reveal>

        <div className="mt-6 space-y-0">
          {focus.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.05}>
              <div className="flex items-start gap-4 border-b border-border py-4 sm:items-center sm:gap-6">
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                  {f.id}
                </span>
                <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
                  <span className="min-w-[140px] text-[15px] font-medium text-foreground">
                    {f.label}
                  </span>
                  <span className="font-mono text-[12px] text-muted-foreground">
                    {f.detail}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Philosophy */}
      <Container className="py-12 sm:py-16">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Philosophy
          </p>
          <div className="mt-4 h-px w-full bg-border" />
        </Reveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.word} delay={i * 0.05}>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
                  {p.word}
                </p>
                <p className="mt-1 text-[15px] text-muted-foreground">
                  {p.statement}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <SectionDivider />

      {/* Remaining about sections */}
      <Container className="py-12 sm:py-16">
        <div className="max-w-2xl">
          {about.slice(3).map((section, i) => (
            <Reveal key={section.id} delay={i * 0.06}>
              <div className="mt-12 first:mt-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {section.label}
                </p>
                <h2
                  id={section.id}
                  className="mt-3 text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((p, j) => (
                    <p key={j} className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
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
      <Container className="py-12 sm:py-16">
        <Reveal>
          <div className="flex items-baseline justify-between">
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

          <div className="mt-6 space-y-4">
            {experience
              .filter((item) => !item.legacy)
              .slice(0, 3)
              .map((item, i) => (
              <div key={`${item.org}-${i}`} className="flex items-start gap-4 sm:gap-6">
                <span className="min-w-[100px] font-mono text-[11px] text-muted-foreground">
                  {item.period}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-foreground">{item.role}</p>
                  <p className="text-[13px] text-muted-foreground">{item.org}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </>
  );
}
