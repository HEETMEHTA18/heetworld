import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/content";
import { getTocFromSource, type TocItem } from "@/lib/toc";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Tag, Pill } from "@/components/ui/pill";
import { ButtonLink } from "@/components/ui/button";
import { ArticleCard } from "@/components/content-cards";
import { MdxContentLayout } from "@/components/mdx/mdx-content-layout";

type Params = { slug: string };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) return { title: "Article" };
  return {
    title: article.metadata.title,
    description: article.metadata.description,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.description,
    },
  };
}

export const dynamicParams = false;

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }
  const { metadata, Content } = article;
  const toc: TocItem[] = getTocFromSource(`content/articles/${slug}.mdx`);
  const related = await getRelatedArticles(slug, 3);

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title={metadata.title}
        description={metadata.description}
      >
        <div className="flex flex-col items-end gap-3">
          <span className="font-mono text-sm text-muted-foreground">
            {metadata.date} · {metadata.readingMinutes ?? 5} min read
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {metadata.topics.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </PageHeader>

      <Container className="py-4">
        <MdxContentLayout toc={toc}>
          <Content />
        </MdxContentLayout>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-border py-16">
          <Container>
            <p className="mb-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Related reading
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a, i) => (
                <ArticleCard key={a.slug} article={a.metadata} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
