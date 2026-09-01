import { getAllArticles } from "@/lib/content";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ArticleCard } from "@/components/content-cards";
import { Pill } from "@/components/ui/pill";

export const metadata = {
  title: "Writing",
  description: "Notes and essays on AI, machine learning, NLP, and systems design.",
};

export default async function WritingPage() {
  const articles = await getAllArticles();
  const active = articles.filter((a) => !a.metadata.legacy);
  const archived = articles.filter((a) => a.metadata.legacy);

  const topics = Array.from(
    new Set(active.flatMap((a) => a.metadata.topics))
  );

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="How I think"
        description="Notes and essays on machine learning, NLP, agentic systems, and the engineering judgment that turns ideas into systems."
      />
      <Container className="py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          <Pill variant="soft">All topics</Pill>
          {topics.map((t) => (
            <Pill key={t} variant="outline">
              {t}
            </Pill>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((a, i) => (
            <ArticleCard key={a.slug} article={a.metadata} index={i} />
          ))}
        </div>

        {archived.length > 0 && (
          <div className="mt-14">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Archived ({archived.length}) — earlier writing
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {archived.map((a, i) => (
                <div key={a.slug} className="opacity-70 hover:opacity-100">
                  <ArticleCard article={a.metadata} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}