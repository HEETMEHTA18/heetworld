import Link from "next/link";
import Image from "next/image";

import { site } from "@/lib/site";
import { getAllProjects, getAllArticles, getAllResearchNotes } from "@/lib/content";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { GreetingTyping } from "@/components/greeting-typing";
import { ProjectShowcase } from "@/components/project-scroll";
import { PageFlow } from "@/components/page-flow";

const journey = [
  ["01", "Started with electronics, IoT, and the joy of making things move."],
  ["02", "Found web development, then learned to care about the systems underneath."],
  ["03", "Moved into machine learning, natural language processing, and practical AI applications."],
  ["now", "Building local-first tools and AI systems that feel useful, clear, and human."],
];

export default async function HomePage() {
  const [allProjects, allArticles, allResearch] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllResearchNotes(),
  ]);

  const projects = allProjects.filter((p) => !p.metadata.legacy);
  const articles = allArticles.filter((a) => !a.metadata.legacy);
  const research = allResearch.filter((n) => !n.metadata.legacy);

  const currentFocus = [
    "NLP",
    "AI systems",
    "machine learning",
    "developer tooling",
  ];

  return (
    <div className="w-full">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
        </div>

        <Container className="relative z-10 py-28 sm:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {site.location} · computer engineering
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <GreetingTyping />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                I build software, AI systems, and experiments that make complex ideas useful.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  See my work <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground"
                >
                  About me
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                  currently
                </span>
                {currentFocus.map((item) => (
                  <span key={item} className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-border" id="work">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  selected work
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">
                  Systems I build, and the thinking underneath.
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                  Each project is a problem turned into software — AI assistants,
                  developer tools, and NLP systems, with an
                  architecture write-up.
                </p>
              </div>
              <Link
                href="/projects"
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                view all ↗
              </Link>
            </div>
          </Reveal>

          <ProjectShowcase projects={projects.map((p) => p.metadata)} />
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  the journey
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">
                  still learning,<br />still making.
                </h2>
              </div>
            </Reveal>

            <div className="space-y-6">
              {journey.map(([number, text]) => (
                <Reveal key={number}>
                  <div className="flex gap-4 border-b border-border pb-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {number}
                    </span>
                    <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>


      <section className="border-b border-border">
        <Container className="py-16 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                latest writing
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Link
                href="/writing"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                read notebook ↗
              </Link>
            </Reveal>
          </div>

          <div className="space-y-1">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                className="group flex flex-col gap-2 border-b border-border py-4 text-left transition-colors hover:border-foreground/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {article.metadata.date ?? "2026"}
                  </span>
                  <strong className="text-lg text-foreground group-hover:text-muted-foreground">
                    {article.metadata.title}
                  </strong>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Read ↗
                </span>
              </Link>
            ))}
            {research.slice(0, 1).map((note) => (
              <Link
                key={note.slug}
                href={`/research/${note.slug}`}
                className="group flex flex-col gap-2 border-b border-border py-4 text-left transition-colors hover:border-foreground/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    lab
                  </span>
                  <strong className="text-lg text-foreground group-hover:text-muted-foreground">
                    {note.metadata.title}
                  </strong>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Read ↗
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PageFlow currentPath="/" />
    </div>
  );
}

