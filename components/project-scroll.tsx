import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { ProjectMeta } from "@/types";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const IMAGE_MAP: Record<string, string> = {
  autodevs: "/images/projects/aaron-burden-aRya3uMiNIA-unsplash.jpg",
  tatvik: "/images/projects/alice-triquet-HeEJU3nrg_0-unsplash.jpg",
  "squad-qa": "/images/projects/casey-horner-4rDCa5hBlCs-unsplash.jpg",
  "ai-pipeline": "/images/projects/daniel-gomez-eKegp5f2PPk-unsplash.jpg",
};

const SLUGS = ["autodevs", "tatvik", "squad-qa", "ai-pipeline"] as const;

export function ProjectShowcase({ projects }: { projects: ProjectMeta[] }) {
  const ordered = SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter((p): p is ProjectMeta => Boolean(p));

  if (ordered.length === 0) return null;

  return (
    <div className="space-y-16 sm:space-y-24">
      {ordered.map((project, i) => {
        const imageFirst = i % 2 === 1;
        return (
          <Reveal key={project.slug}>
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
              {/* Image */}
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-border bg-muted shadow-card",
                  imageFirst && "lg:order-2"
                )}
              >
                <div className="aspect-[16/11] w-full">
                  <Image
                    src={IMAGE_MAP[project.slug]}
                    alt={`${project.title} — ${project.category}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={cn(imageFirst && "lg:order-1")}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.year} · {project.category}
                </p>
                <h2 className="mt-3 font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                  {project.description ?? project.tagline}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent"
                  >
                    View case study
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      source ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
