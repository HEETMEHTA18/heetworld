import { changelog, thoughts, currentStack, now } from "@/content/data/now";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill, Tag } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Changelog",
  description: "A record of changes to this portfolio.",
};

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Changelog"
        title="This site's history"
        description="Every major change to the portfolio, kept for reference and regret."
      />
      <Container className="py-10">
        <div className="prose lg:prose-lg max-w-reading">
          {changelog.map((c) => (
            <Reveal key={c.version}>
              <div className="mt-10 first:mt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-serif text-2xl tracking-tight text-foreground">
                    {c.version}
                  </h2>
                  <span className="font-mono text-sm text-muted-foreground">
                    {formatDate(c.date)}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">{c.title}</p>
                <ul className="mt-2 list-disc space-y-0.5 pl-5 text-muted-foreground">
                  {c.entries.map((e, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
