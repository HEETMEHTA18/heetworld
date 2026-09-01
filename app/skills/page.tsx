import { skillGroups } from "@/content/data/skills";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const levelLabel = {
  Primary: "Primary",
  Fluent: "Fluent",
  Intermediate: "Intermediate",
  Learning: "Learning",
};

export const metadata = {
  title: "Skills",
  description:
    "Languages, frameworks, AI/ML stacks, cloud, and tools I work with.",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="How I work, by tool"
        description="Grouped not graded. I list proficiency to keep my own map honest, not to rank myself."
      />
      <Container className="py-10">
        <div className="grid gap-14">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.key} delay={gi * 0.05}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card text-accent"
                    )}
                  >
                    <group.icon className="h-4 w-4" />
                  </span>
                  <h2 className="font-serif text-2xl tracking-tight text-foreground">
                    {group.label}
                  </h2>
                  <Pill variant="soft" size="sm" className="ml-auto">
                    {group.skills.length}
                  </Pill>
                </div>
                <p className="mb-5 max-w-xl text-sm text-muted-foreground">
                  {group.description}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {group.skills.map((sk) => (
                    <div
                      key={sk.name}
                      className="group flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="font-medium text-foreground">
                        {sk.name}
                      </span>
                      <Pill variant="outline" size="sm">
                        {levelLabel[sk.proficiency as keyof typeof levelLabel] ?? sk.proficiency}
                      </Pill>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
