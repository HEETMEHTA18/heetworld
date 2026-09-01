import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { UsesNotebookClient } from "./uses-client";

export const metadata = {
  title: "Uses — Heet Mehta",
  description: "My Pop!_OS + RTX 4050 Linux-first development environment, rendered as an interactive Jupyter notebook.",
};

export default function UsesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Uses"
        title="My environment & setup"
        description="My setup is built around one thing: making it easy to learn, experiment, and build. Rendered below as an interactive notebook."
      />

      <Container className="py-10">
        <Reveal>
          <UsesNotebookClient />
        </Reveal>
      </Container>
    </>
  );
}
