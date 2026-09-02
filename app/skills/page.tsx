import { skillGroups } from "@/content/data/skills";
import { StackPlayground } from "@/components/stack-playground";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { PageFlow } from "@/components/page-flow";

const levelLabel = {
  Primary: "Primary",
  Fluent: "Fluent",
  Intermediate: "Intermediate",
  Learning: "Learning",
};

const levelOrder = { Primary: 0, Fluent: 1, Intermediate: 2, Learning: 3 };

const levelColor = {
  Primary: "bg-accent",
  Fluent: "bg-foreground/60",
  Intermediate: "bg-foreground/30",
  Learning: "bg-foreground/15",
};

const groupColors: Record<string, string> = {
  languages: "#4ade80",
  "ml-ai": "#a78bfa",
  frontend: "#38bdf8",
  backend: "#fb923c",
  cloud: "#2dd4bf",
  devtools: "#f472b6",
  platforms: "#fbbf24",
};

export const metadata = {
  title: "Stack",
  description:
    "My tech stack as a literal stack — push, pop, and drag your way through the languages, frameworks, and tools I work with.",
  openGraph: {
    title: "Stack — Heet Mehta",
    description:
      "Interactive tech stack — languages, frameworks, and tools.",
    url: "https://heetworld.tech/skills",
  },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stack"
        title="My stack, as a stack."
        description="A working LIFO stack. Drag a block onto it to push, click or drag one off to remove it. The full grouped list lives below for reference."
      />
      <Container className="py-10 sm:py-14">
        <Reveal>
          <StackPlayground />
        </Reveal>

        {/* Reference section */}
        <div className="mt-20 border-t border-border pt-10">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              reference — the full list
            </p>
            <p className="font-mono text-[11px] text-muted-foreground">
              {skillGroups.reduce((acc, g) => acc + g.skills.length, 0)} skills
            </p>
          </div>

          <div className="grid gap-12">
            {skillGroups.map((group, gi) => {
              const accentColor = groupColors[group.key] ?? "#a78bfa";
              return (
                <Reveal key={group.key} delay={gi * 0.04}>
                  <div className="group">
                    {/* Group header */}
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card transition-colors"
                        style={{ color: accentColor }}
                      >
                        <group.icon className="h-4.5 w-4.5" />
                      </span>
                      <div className="flex flex-col">
                        <h2 className="font-serif text-xl tracking-tight text-foreground">
                          {group.label}
                        </h2>
                        <p className="text-[13px] text-muted-foreground">
                          {group.description}
                        </p>
                      </div>
                      <Pill variant="soft" size="sm" className="ml-auto">
                        {group.skills.length}
                      </Pill>
                    </div>

                    {/* Skills grid with proficiency bars */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {group.skills.map((sk) => (
                        <div
                          key={sk.name}
                          className="group/skill flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent/30"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-medium text-foreground truncate">
                                {sk.name}
                              </span>
                              <Pill variant="outline" size="sm" className="shrink-0 ml-2">
                                {levelLabel[sk.proficiency as keyof typeof levelLabel] ?? sk.proficiency}
                              </Pill>
                            </div>
                            {/* Proficiency bar */}
                            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  levelColor[sk.proficiency as keyof typeof levelColor] ?? "bg-foreground/30"
                                )}
                                style={{
                                  width:
                                    sk.proficiency === "Primary"
                                      ? "100%"
                                      : sk.proficiency === "Fluent"
                                        ? "75%"
                                        : sk.proficiency === "Intermediate"
                                          ? "50%"
                                          : "25%",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>

      <PageFlow currentPath="/skills" />
    </>
  );
}
