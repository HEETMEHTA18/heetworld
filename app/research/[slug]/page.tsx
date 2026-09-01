import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getContentSlugs, getResearchNoteBySlug } from "@/lib/content";
import { getTocFromSource, type TocItem } from "@/lib/toc";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Tag, Pill } from "@/components/ui/pill";
import { MdxContentLayout } from "@/components/mdx/mdx-content-layout";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = getContentSlugs("content/research");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getResearchNoteBySlug(slug).catch(() => null);
  if (!note) return { title: "Research" };
  return {
    title: note.metadata.title,
    description: note.metadata.description,
  };
}

export const dynamicParams = false;

export default async function ResearchNotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  let note;
  try {
    note = await getResearchNoteBySlug(slug);
  } catch {
    notFound();
  }
  const { metadata, Content } = note;
  const toc: TocItem[] = getTocFromSource(`content/research/${slug}.mdx`);

  return (
    <>
      <PageHeader
        eyebrow={`Research · ${metadata.area}`}
        title={metadata.title}
        description={metadata.description}
      >
        <div className="flex flex-col items-end gap-3">
          <span className="font-mono text-sm text-muted-foreground">
            {metadata.date} · {metadata.readingMinutes ?? 5} min read
          </span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {metadata.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </PageHeader>

      <Container className="py-4">
        <div className="mb-6 flex items-center gap-2">
          <Pill variant="soft">{metadata.area}</Pill>
        </div>
        <MdxContentLayout toc={toc}>
          <Content />
        </MdxContentLayout>
      </Container>
    </>
  );
}
