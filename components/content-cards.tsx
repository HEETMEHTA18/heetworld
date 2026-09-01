import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ArticleMeta, ResearchNoteMeta } from "@/types";
import { formatDate } from "@/lib/utils";
import { Tag } from "@/components/ui/pill";

export function ArticleCard({
  article,
  index = 0,
}: {
  article: ArticleMeta;
  index?: number;
}) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-6"
    >
      <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
        <span>{formatDate(article.date)}</span>
        <span className="text-border">·</span>
        <span>{article.readingMinutes ?? 5} min read</span>
      </div>
      <h3 className="text-pretty font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
        {article.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {article.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {article.topics.slice(0, 3).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}

export function ResearchCard({
  note,
  index = 0,
}: {
  note: ResearchNoteMeta;
  index?: number;
}) {
  return (
    <Link
      href={`/research/${note.slug}`}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
          {note.area}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {formatDate(note.date)}
        </span>
      </div>
      <h3 className="text-pretty font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
        {note.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {note.description}
      </p>
      <span className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-accent">
        Read notes
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}