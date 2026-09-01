import Link from "next/link";

import { getAllProjects } from "@/lib/content";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { WorkGallery } from "@/components/work-gallery";

export const metadata = {
  title: "Projects",
  description:
    "Things I've built — AI assistants, developer tools, and computer vision systems. Each has an architecture write-up.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const years = Array.from(new Set(projects.map((p) => p.metadata.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const categories = Array.from(
    new Set(projects.map((p) => p.metadata.category))
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
              {projects.length} projects
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
            const yearProjects = projects.filter(
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
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group flex items-baseline justify-between border-b border-border py-4 transition-colors hover:border-foreground/30"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="text-[15px] font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                              {project.metadata.title}
                            </h3>
                            <p className="mt-0.5 max-w-lg text-[13px] text-muted-foreground">
                              {project.metadata.tagline}
                            </p>
                          </div>
                        </div>
                        <div className="hidden items-center gap-4 sm:flex">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {project.metadata.tags.slice(0, 3).join(" · ")}
                          </span>
                          <span
                            className={
                              project.metadata.status === "Active"
                                ? "font-mono text-[10px] text-emerald-500"
                                : project.metadata.status === "In Progress"
                                  ? "font-mono text-[10px] text-amber-500"
                                  : "font-mono text-[10px] text-muted-foreground"
                            }
                          >
                            {project.metadata.status}
                          </span>
                          <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected work visuals */}
        <div className="mt-16 border-t border-border pt-10">
          <Reveal>
            <div className="mb-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                selected work visuals
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                A look at the work in progress — prototypes, experiments, and
                systems at various stages of being built.
              </p>
            </div>
          </Reveal>
          <WorkGallery />
        </div>
      </Container>
    </>
  );
}
