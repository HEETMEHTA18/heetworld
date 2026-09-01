import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ProjectMeta } from "@/types";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { GitHubIcon } from "@/components/icons";

export function ProjectListItem({
  project,
  index = 0,
}: {
  project: ProjectMeta;
  index?: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-lift sm:flex-row sm:items-center">
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-accent">{project.year}</span>
            <span className="text-muted-foreground/40">•</span>
            <Pill variant="soft" size="sm">{project.category}</Pill>
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

          <h3 className="font-serif text-2xl tracking-tight text-foreground group-hover:text-accent transition-colors">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {project.title}
            </Link>
          </h3>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 pt-2 sm:pt-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              title="GitHub Repository"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              title="Live Demo"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
          >
            <span>Read Case Study</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
