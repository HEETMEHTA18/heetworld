import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ProjectVisual } from "@/components/visuals";
import type { ProjectVisualType } from "@/components/visuals";

export const metadata = {
  title: "Playground",
  description:
    "Small experiments and half-finished ideas in AI and web craft.",
};

const experiments = [
  {
    id: "mcp-host-skeleton",
    title: "MCP host skeleton",
    description: "A minimal host for MCP tools, as a reference for AutoDevs.",
    visual: "terminal",
  },
  {
    id: "local-vector-store",
    title: "Tiny vector store",
    description: "An SQLite-backed vector index for local RAG experiments.",
    visual: "diagram",
  },
  {
    id: "signal-playground",
    title: "Signal playground",
    description: "A tiny playground for visualising signal processing on audio.",
    visual: "dashboard",
  },
];

export default function PlaygroundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Playground"
        title="Experiments"
        description="Half-finished ideas and small explorations — mostly AI tooling and a few front-end curiosities."
      />
      <Container className="py-10">
        <div className="grid gap-10 sm:grid-cols-2">
          {experiments.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <div className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <ProjectVisual type={e.visual as ProjectVisualType} />
                <div className="mt-4">
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {e.description}
                  </p>
                  <span className="mt-3 block font-mono text-[10px] text-muted-foreground">
                    Coming soon
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
