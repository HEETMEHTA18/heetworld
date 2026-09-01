import { getAllResearchNotes } from "@/lib/content";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ResearchCard } from "@/components/content-cards";
import { Pill } from "@/components/ui/pill";

export const metadata = {
  title: "Research",
  description:
    "Working notes on NLP, LLMs, agentic AI, and distributed systems. Research is documented as live, in-progress notes.",
};

export default async function ResearchPage() {
  const notes = await getAllResearchNotes();
  const active = notes.filter((n) => !n.metadata.legacy);
  const archived = notes.filter((n) => n.metadata.legacy);

  const areas = Array.from(new Set(active.map((n) => n.metadata.area)));

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="What I'm learning"
        description="Active areas: NLP, large language models, agentic AI, distributed systems, and MLOps. These are working notes, not finished essays — expect iteration."
      />
      <Container className="py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          <Pill variant="soft">All areas</Pill>
          {areas.map((a) => (
            <Pill key={a} variant="outline">
              {a}
            </Pill>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((n, i) => (
            <ResearchCard key={n.slug} note={n.metadata} index={i} />
          ))}
          {active.length === 0 && (
            <p className="col-span-full font-mono text-sm text-muted-foreground">
              New research notes are on the way.
            </p>
          )}
        </div>

        {archived.length > 0 && (
          <div className="mt-14">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Archived ({archived.length}) — earlier notes
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {archived.map((n, i) => (
                <div key={n.slug} className="opacity-70 hover:opacity-100">
                  <ResearchCard note={n.metadata} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}