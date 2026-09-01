import { thoughts } from "@/content/data/now";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Thoughts",
  description: "Short, unsolicited notes on engineering and craft.",
};

export default function ThoughtsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thoughts"
        title="Random notes"
        description="Small thoughts that didn't become essays."
      />
      <Container className="py-10">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-8">
            {thoughts.map((t, i) => (
              <Reveal key={t.date + i} delay={i * 0.04}>
                <div className="flex gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatDate(t.date)}
                  </span>
                  <p className="inline-block max-w-xs text-pretty text-base leading-relaxed text-muted-foreground">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
