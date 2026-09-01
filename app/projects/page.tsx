import Link from "next/link";

import { getAllProjects } from "@/lib/content";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Projects",
  description:
    "Things I've built — AI assistants, developer tools, and NLP systems. Each has an architecture write-up.",
};

function ProjectRow({
  project,
  index,
  muted = false,
}: {
  project: Awaited<ReturnType<typeof getAllProjects>>[number];
  index: number;
  muted?: boolean;
}) {
  const meta = project.metadata;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex items-baseline justify-between border-b border-border py-4 transition-colors hover:border-foreground/30",
        muted && "opacity-60 hover:opacity-100"
      )}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-[15px] font-medium text-foreground transition-colors group-hover:text-muted-foreground">
            {meta.title}
          </h3>
          <p className="mt-0.5 max-w-lg text-[13px] text-muted-foreground">
            {meta.tagline}
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        <span className="font-mono text-[10px] text-muted-foreground">
          {meta.tags.slice(0, 3).join(" · ")}
        </span>
        <span
          className={
            meta.status === "Active"
              ? "font-mono text-[10px] text-emerald-500"
              : meta.status === "In Progress"
                ? "font-mono text-[10px] text-amber-500"
                : "font-mono text-[10px] text-muted-foreground"
          }
        >
          {meta.status}
        </span>
        <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const active = projects.filter((p) => !p.metadata.legacy);
  const archived = projects.filter((p) => p.metadata.legacy);

  const years = Array.from(new Set(active.map((p) => p.metadata.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const categories = Array.from(
    new Set(active.map((p) => p.metadata.category))
  );

  return (
    <>
      <PageHeader
        number="01"
        eyebrow="Projects"
        title="Things I've built, broken, rebuilt, and learned from."
      />

      <Container className="py-10 sm:py-14">
        {/* Filter pills */}
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {active.length} projects
            </span>
            <span className="text-border">·</span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Year-grouped archive */}
        <div className="space-y-12">
          {years.map((year) => {
            const yearProjects = active.filter(
              (p) => p.metadata.year === year
            );
            return (
              <div key={year}>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] font-semibold tabular-nums text-foreground">
                      {year}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </Reveal>

                <div className="mt-1">
                  {yearProjects.map((project, idx) => (
                    <Reveal key={project.slug} delay={idx * 0.04}>
                      <ProjectRow project={project} index={idx} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {archived.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Archived {archived.length > 0 ? `(${archived.length})` : ""}
                </span>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                  earlier work, kept for the record
                </span>
              </div>
            </Reveal>
            <div className="mt-1">
              {archived.map((project, idx) => (
                <Reveal key={project.slug} delay={idx * 0.04}>
                  <ProjectRow project={project} index={idx} muted />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}