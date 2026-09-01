import { BookOpen, CheckCircle2, Clock, BookMarked } from "lucide-react";
import { reading } from "@/content/data/reading";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Reading",
  description: "Books and papers I'm reading, finished, and planning to start.",
};

const statusIcons = {
  Reading: BookOpen,
  Finished: CheckCircle2,
  Queued: Clock,
  Default: BookMarked,
};

export default function ReadingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reading"
        title="Books and papers"
        description="A short, honest list of what's in my queue, open, or done."
      />
      <Container className="py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reading.map((b) => {
            const StatusIcon = statusIcons[b.status as keyof typeof statusIcons] || statusIcons.Default;
            return (
              <Reveal key={b.title}>
                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
                      <StatusIcon className="h-3 w-3 text-accent" />
                      <span>{b.status}</span>
                    </span>
                    {b.progress ? (
                      <span className="font-mono text-xs text-muted-foreground">{b.progress}%</span>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{b.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">by {b.author}</p>
                  </div>
                  <p className="mt-auto text-sm leading-relaxed text-muted-foreground">{b.note}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </>
  );
}
