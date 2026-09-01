import { experience } from "@/content/data/experience";
import type { ExperienceItem } from "@/types";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill, Tag } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Experience",
  description:
    "A vertical timeline of open source, research, projects, and learning.",
};

const typeMeta: Record<ExperienceItem["type"], { tone: string }> = {
  Education: { tone: "text-sky-400" },
  Research: { tone: "text-violet-400" },
  Internship: { tone: "text-amber-400" },
  "Open Source": { tone: "text-emerald-400" },
  Hackathon: { tone: "text-pink-400" },
  Project: { tone: "text-cyan-400" },
  Goal: { tone: "text-muted-foreground" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Timeline"
        title="Experience"
        description="A non-linear path: open source, research, internships, hackathons, and a few things I shipped along the way."
      />
      <Container className="py-12">
        <div className="relative">
          {experience.map((item, i) => {
            const meta = typeMeta[item.type] ?? typeMeta.Project;
            return (
              <Reveal key={`${item.org}-${i}`} delay={i * 0.06} className="relative">
                <div className="absolute -left-[33px] top-6 h-full w-px bg-border" />
                <div className="mb-16 flex gap-5 pl-2">
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card",
                        item.type === "Goal" ? "bg-muted" : "bg-accent/10"
                      )}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                    </div>
                    <span
                      className={cn(
                        "mt-2 font-mono text-xs",
                        meta.tone
                      )}
                    >
                      {item.type}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-medium text-foreground">{item.role}</h3>
                      <Pill variant="soft" size="sm">{item.period}</Pill>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.org}
                    </p>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      <p>{item.description}</p>
                      <ul className="ml-4 list-disc space-y-1 pl-2">
                        {item.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    {item.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </>
  );
}
