import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getContentSlugs, getProjectBySlug } from "@/lib/content";
import { getTocFromSource } from "@/lib/toc";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { MdxContentLayout } from "@/components/mdx/mdx-content-layout";
import { GitHubIcon } from "@/components/icons";

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
        <Container className="pb-12 pt-24 sm:pb-16 sm:pt-28">
          <Reveal>
            <div className="flex flex-col gap-5">
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

      {/* Hero image */}
      {metadata.image && (
        <Reveal>
          <div className="border-b border-border">
            <Container>
              <div className="relative -mx-4 aspect-[21/9] overflow-hidden rounded-xl sm:-mx-6">
                <Image
                  src={metadata.image}
                  alt={metadata.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </Container>
          </div>
        </Reveal>
      )}

      {/* Content */}
      <Container className="py-12 sm:py-16">
        <MdxContentLayout toc={toc}>
          <Content />
        </MdxContentLayout>
      </Container>
    </>
  );
}
