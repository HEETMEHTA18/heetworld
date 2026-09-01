import { getAllArticles } from "@/lib/content";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ArticleCard } from "@/components/content-cards";
import { Pill } from "@/components/ui/pill";

export const metadata = {
  title: "Writing",
  description: "Notes and essays on AI, machine learning, computer vision, and systems design.",
};

export default async function WritingPage() {
  const articles = await getAllArticles();

  const topics = Array.from(
    new Set(articles.flatMap((a) => a.metadata.topics))
  );

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="How I think"
        description="Notes and essays on machine learning, computer vision, agentic systems, and the engineering judgment that turns ideas into systems."
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
          {articles.map((a, i) => (
            <ArticleCard key={a.slug} article={a.metadata} index={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
