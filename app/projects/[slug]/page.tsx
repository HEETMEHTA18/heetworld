import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getContentSlugs, getProjectBySlug } from "@/lib/content";
import { getTocFromSource } from "@/lib/toc";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { GitHubIcon } from "@/components/icons";
import { TocList } from "@/lib/toc";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = getContentSlugs("content/projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) return { title: "Project" };
  return {
    title: project.metadata.title,
    description: project.metadata.tagline,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.tagline,
    },
  };
}

export const dynamicParams = false;

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }
  const { metadata, Content } = project;
  const toc = getTocFromSource(`content/projects/${slug}.mdx`);

  return (
    <>
      {/* Project Header */}
      <header className="border-b border-border">
        <Container className="pb-8 pt-24 sm:pb-10 sm:pt-28">
          <Reveal>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Link
                  href="/projects"
                  className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  ← Projects
                </Link>
                <span className="text-border">/</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {metadata.category}
                </span>
              </div>

              <h1 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
                {metadata.title}
              </h1>

              <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {metadata.tagline}
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
                <span className="tabular-nums">{metadata.year}</span>
                <span className="text-border">·</span>
                <span
                  className={
                    metadata.status === "Active"
                      ? "text-emerald-500"
                      : metadata.status === "In Progress"
                        ? "text-amber-500"
                        : ""
                  }
                >
                  {metadata.status}
                </span>
                <span className="text-border">·</span>
                <span>{metadata.tags.join(" · ")}</span>
              </div>

              {/* Action links */}
              <div className="flex flex-wrap gap-3">
                {metadata.github && (
                  <a
                    href={metadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <GitHubIcon className="h-3.5 w-3.5" />
                    Source
                  </a>
                )}
                {metadata.demo && (
                  <a
                    href={metadata.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </header>

      {/* Two-column: sticky image + scrolling content */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-0 px-5 py-10 sm:px-8 md:grid-cols-[340px_1fr] md:py-14 lg:grid-cols-[400px_1fr]">
        {/* Left: sticky image */}
        {metadata.image && (
          <div className="relative order-1 mb-8 md:mb-0 md:sticky md:top-24 md:self-start">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={metadata.image}
                  alt={metadata.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 340px, 400px"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        )}

        {/* Right: scrolling content */}
        <div className="order-2 min-w-0 md:pl-10 lg:pl-14">
          <div className="prose-content">
            <div className="prose lg:prose-lg max-w-none">
              <Content />
            </div>
          </div>

          {/* TOC below content */}
          {toc && toc.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <TocList items={toc} />
            </div>
          )}

          {/* Project navigation arrows */}
          <div className="mt-8 pointer-events-auto">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              {/* Prev project link */}
              <a
                href="/projects"
                className="relative flex-1 rounded-xl border border-border bg-card p-4 sm:p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-foreground/20 group flex items-center justify-center gap-3"
                style={{ pointerEvents: 'auto' }}
              >
                <svg
                  className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6l6-6" />
                </svg>
                <span className="hidden md:inline">Prev</span>
              </a>

              {/* Next project link */}
              <a
                href="/projects"
                className="relative flex-1 rounded-xl border border-border bg-card p-4 sm:p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-foreground/20 group flex items-center justify-center gap-3"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="hidden md:inline">Next</span>
                <svg
                  className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6l-6-6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
