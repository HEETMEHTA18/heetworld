"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Projector } from "lucide-react";

import type { ProjectMeta } from "@/types";

const IMAGE_MAP: Record<string, string> = {
  autodevs: "/images/projects/aaron-burden-aRya3uMiNIA-unsplash.jpg",
  tatvik: "/images/projects/alice-triquet-HeEJU3nrg_0-unsplash.jpg",
  "squad-qa": "/images/projects/casey-horner-4rDCa5hBlCs-unsplash.jpg",
  "ai-pipeline": "/images/projects/daniel-gomez-eKegp5f2PPk-unsplash.jpg",
};

const SLUGS = ["autodevs", "tatvik", "squad-qa", "ai-pipeline"] as const;

export function ProjectScroll({ projects }: { projects: ProjectMeta[] }) {
  const ordered = SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter((p): p is ProjectMeta => Boolean(p));

  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  }, []);

  const scrollAll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    if (hasOverflow) scrollAll();
  }, [scrollAll]);

  if (ordered.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ordered.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group flex w-[320px] shrink-0 snap-start items-stretch gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:w-[400px]"
          >
            <div className="relative h-full w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:w-36">
              <Image
                src={IMAGE_MAP[project.slug]}
                alt={`${project.title} — project thumbnail`}
                fill
                sizes="(min-width: 640px) 144px, 112px"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {project.year} · {project.category}
              </span>
              <h3 className="mt-1 font-serif text-lg leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                {project.tagline}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                View case study
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}

        <button
          onClick={scrollAll}
          className="group flex w-[240px] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          <Projector className="h-5 w-5" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            View all projects
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          scroll →
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
