"use client";

import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { TerminalWidget } from "@/components/terminal-widget";
import { PageFlow } from "@/components/page-flow";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk."
        description="I'm receptive to interesting work, collaborations, and thoughtful messages."
      />

      <Container className="py-6 sm:py-10">
        <TerminalWidget mode="contact" />
      </Container>

      <PageFlow currentPath="/contact" />
    </>
  );
}
