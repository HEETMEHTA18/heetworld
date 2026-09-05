import { skillGroups } from "@/content/data/skills";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { PageFlow } from "@/components/page-flow";
import { StackPlayground } from "@/components/stack-playground";

export default function SkillsPage() {
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="My tech stack"
        description="Tools, languages, and frameworks I use — ordered and applied like the data structures they come from. Each stack block holds its own set of skills."
      />
      <Container className="py-10 sm:py-14">
        {/* 01 — The stack */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted-foreground">01</span>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-foreground">
              the stack
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              drag · click · pop
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <Reveal>
            <StackPlayground />
          </Reveal>
        </section>

        {/* 02 — Reference: the full list */}
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted-foreground">02</span>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-foreground">
              reference — the full list
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              {totalSkills} skills · {skillGroups.length} categories
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-12">
            {skillGroups.map((group, index) => (
              <Reveal key={group.key} delay={index * 0.04}>
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted"
                    style={{ color: group.color }}
                    aria-hidden="true"
                  >
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    {group.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {group.skills.length}
                  </span>
                  <span className="hidden text-[13px] text-muted-foreground sm:inline">
                    — {group.description}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: skill.color ?? "#6366F1" }}
                      />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Container>

      <PageFlow currentPath="/skills" />
    </>
  );
}