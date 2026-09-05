import { Briefcase, GraduationCap, BookOpen, Compass, Clock, type LucideIcon } from "lucide-react";
import { now } from "@/content/data/now";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/utils";
import { PageFlow } from "@/components/page-flow";

export const metadata = {
  title: "Now",
  description:
    "What Heet is focused on right now — the work in progress, the problems he's turning over, the things shipping this week.",
};

const sections: {
  key: string;
  title: string;
  icon: LucideIcon;
  items: readonly string[];
  tint: string;
  mono: string;
}[] = [
  {
    key: "working",
    title: "Working on",
    icon: Briefcase,
    items: now.working,
    tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    mono: "bg-blue-500/15",
  },
  {
    key: "studying",
    title: "Studying",
    icon: GraduationCap,
    items: now.studying,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    mono: "bg-emerald-500/15",
  },
  {
    key: "reading",
    title: "Reading",
    icon: BookOpen,
    items: now.reading,
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    mono: "bg-amber-500/15",
  },
  {
    key: "planning",
    title: "Planning",
    icon: Compass,
    items: now.planning,
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    mono: "bg-violet-500/15",
  },
];

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Now"
        title="What I'm doing today"
        description="Updated on the first Sunday of each month. This is the stuff in flight, not a plan."
      />
      <Container className="py-10 sm:py-14">
        <Reveal>
          <div className="mb-12 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>
              last updated{" "}
              <span className="text-foreground">{formatDate(now.update)}</span>
            </span>
          </div>
        </Reveal>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <Reveal key={section.key}>
              <section>
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border ${section.tint}`}
                    aria-hidden="true"
                  >
                    <section.icon className="h-5 w-5" />
                  </span>
                  <div className="flex items-baseline gap-3">
                    <h2 className="font-serif text-2xl tracking-tight text-foreground">
                      {section.title}
                    </h2>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] ${section.mono} px-1.5 py-0.5 rounded-md text-muted-foreground`}
                    >
                      {String(i + 1).padStart(2, "0")}/{sections.length}
                    </span>
                  </div>
                </div>
                <ul className="mt-5 max-w-2xl space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>

      <PageFlow currentPath="/now" />
    </>
  );
}