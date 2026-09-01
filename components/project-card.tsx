import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { ProjectMeta } from "@/types";
import { Pill } from "@/components/ui/pill";
import { ProjectVisual } from "@/components/visuals";
import { Reveal } from "@/components/reveal";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: ProjectMeta;
  index?: number;
}) {
  return (
    <Reveal delay={index * 0.06}>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:rounded-3xl"
      >
        <div className="relative overflow-hidden border-b border-border bg-background p-4 sm:p-6">
          <ProjectVisual type={project.visual} className="transition-transform duration-500 group-hover:scale-[1.02]" />
          <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              <Pill variant="soft">{project.category}</Pill>
              <Pill variant="outline">{project.year}</Pill>
            </div>
            <span
              className={
                project.status === "Active"
                  ? "font-mono text-[11px] text-emerald-500"
                  : project.status === "In Progress"
                    ? "font-mono text-[11px] text-amber-500"
                    : "font-mono text-[11px] text-muted-foreground"
              }
            >
              {project.status}
            </span>
          </div>

          <h3 className="font-serif text-2xl tracking-tight text-foreground transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}