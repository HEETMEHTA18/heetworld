import { bookmarks } from "@/content/data/bookmarks";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Bookmarks",
  description:
    "Resources I keep close — papers, docs, and tools I reference often.",
};

export default function BookmarksPage() {
  const tags = Array.from(
    new Set((bookmarks as readonly { tag: string }[]).map((b) => b.tag))
  );

  return (
    <>
      <PageHeader
        eyebrow="Bookmarks"
        title="Things worth returning to"
        description="Links, specs, and papers I keep a tab open for."
      />
      <Container className="py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          <Pill variant="soft">All</Pill>
          {tags.map((t) => (
            <Pill key={t} variant="outline">
              {t}
            </Pill>
          ))}
        </div>

        <div className="prose lg:prose-lg max-w-reading">
          <ul className="space-y-4">
            {(bookmarks as readonly { title: string; url: string; tag: string; note: string }[]).map((b, i) => (
              <Reveal key={b.url} delay={i * 0.02}>
                <li className="list-none rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm">
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {b.title}
                  </a>
                  <p className="mt-1 text-sm text-muted-foreground">{b.note}</p>
                  <span className="mt-2 inline-block font-mono text-[10px] text-accent">
                    {b.tag}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
