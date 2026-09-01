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
        description="Small thoughts that didn't become essays — recorded as they come and kept here for the record."
      />
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div>
            {thoughts.map((t, i) => (
              <Reveal key={t.date + i} delay={i * 0.04}>
                <div className="flex flex-col gap-2 border-b border-border py-7 first:pt-0 sm:flex-row sm:gap-8">
                  <span className="shrink-0 pt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:w-28">
                    {formatDate(t.date)}
                  </span>
                  <p className="max-w-xl text-pretty text-lg leading-relaxed text-foreground">
                    {t.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {thoughts.length} notes · newest first · no edits after the fact
            </p>
          </Reveal>
        </div>
      </Container>
    </>
  );
}