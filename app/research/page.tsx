import { getAllResearchNotes } from "@/lib/content";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ResearchCard } from "@/components/content-cards";
import { Pill } from "@/components/ui/pill";

export const metadata = {
  title: "Research",
  description:
    "Working notes on computer vision, LLMs, agentic AI, and distributed systems. Research is documented as live, in-progress notes.",
};

export default async function ResearchPage() {
  const notes = await getAllResearchNotes();

  const areas = Array.from(new Set(notes.map((n) => n.metadata.area)));

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="What I'm learning"
        description="Active areas: computer vision, large language models, agentic AI, distributed systems, and MLOps. These are working notes, not finished essays — expect iteration."
      />
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <Pill variant="soft">All areas</Pill>
          {areas.map((a) => (
            <Pill key={a} variant="outline">
              {a}
            </Pill>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((n, i) => (
            <ResearchCard key={n.slug} note={n.metadata} index={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
