import { archivedSkillGroups, skillGroups } from "@/content/data/skills";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { PageFlow } from "@/components/page-flow";
import { SkillIcon } from "@/components/skill-icon";
import { StackPlayground } from "@/components/stack-playground";

export default function SkillsPage() {
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);
  const archivedSkills = archivedSkillGroups.reduce(
    (acc, g) => acc + g.skills.length,
    0
  );

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
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      title={`${skill.name} — ${skill.proficiency}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card px-2 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                    >
                      <SkillIcon
                        name={skill.name}
                        icon={skill.icon}
                        color={skill.color}
                        className="h-3.5 w-3.5 shrink-0"
                      />
                      <span className="truncate">{skill.name}</span>
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 03 — Archived */}
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted-foreground">03</span>
            <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-foreground">
              archive
            </h2>
            <span className="font-mono text-[10px] text-muted-foreground">
              {archivedSkills} skills · explored or set aside
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="max-w-xl text-pretty text-[13px] leading-relaxed text-muted-foreground">
            Tools and frameworks I&apos;ve explored or evaluated but don&apos;t
            actively use — kept here as a reference, not part of my stack.
          </p>

          <div className="mt-8 space-y-12">
            {archivedSkillGroups.map((group, index) => (
              <Reveal key={`archive-${group.key}`} delay={index * 0.03}>
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted opacity-70"
                    style={{ color: group.color }}
                    aria-hidden="true"
                  >
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    {group.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    {group.skills.length} archived
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      title={`${skill.name} — archived`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card px-2 py-1.5 text-[12px] text-muted-foreground/70"
                    >
                      <SkillIcon
                        name={skill.name}
                        icon={skill.icon}
                        color={skill.color}
                        className="h-3.5 w-3.5 shrink-0 grayscale"
                      />
                      <span className="truncate">{skill.name}</span>
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