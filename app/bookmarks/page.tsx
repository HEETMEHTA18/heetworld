import { Bookmark, ExternalLink, Tag as TagIcon } from "lucide-react";
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
      <Container className="py-10 sm:py-14">
        <div className="mb-6 flex flex-wrap gap-2">
          <Pill variant="soft">All</Pill>
          {tags.map((t) => (
            <Pill key={t} variant="outline">
              {t}
            </Pill>
          ))}
        </div>

        <div className="prose lg:prose-lg max-w-reading">
          <ul className="space-y-4 pl-0">
            {(bookmarks as readonly { title: string; url: string; tag: string; note: string }[]).map((b, i) => (
              <Reveal key={b.url} delay={i * 0.02}>
                <li className="group list-none rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lift">
                  <div className="flex items-start justify-between gap-4">
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-foreground transition-colors group-hover:text-accent"
                    >
                      <Bookmark className="h-4 w-4 shrink-0 text-accent" />
                      <span>{b.title}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{b.note}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                    <TagIcon className="h-3 w-3" />
                    <span>{b.tag}</span>
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
