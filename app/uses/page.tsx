import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { UsesNotebookClient } from "./uses-client";

export const metadata = {
  title: "Stack — Heet Mehta",
  description: "My tech stack and tools configuration, rendered as an interactive Jupyter notebook.",
};

export default function UsesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stack"
        title="My tech stack"
        description="My tech stack and tools configuration, rendered as an interactive notebook."
      />

      <Container className="py-10 sm:py-14">
        <Reveal>
          <UsesNotebookClient />
        </Reveal>
      </Container>

    </>
  );
}
