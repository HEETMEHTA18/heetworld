import fs from "fs";
import path from "path";
import { slug } from "github-slugger";
import type { ComponentType } from "react";

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

/**
 * Reads an MDX file and returns an ordered list of heading toc entries
 * (h2 and h3 only) derived from its raw source, so the toc always stays
 * in sync with the authored content.
 */
export function getTocFromSource(relativePath: string): TocItem[] {
  const file = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(file)) return [];
  const source = fs.readFileSync(file, "utf8");
  return extractHeadings(source);
}

function extractHeadings(source: string): TocItem[] {
  const lines = source.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    let text = match[2].replace(/<[^>]*>/g, "").trim();
    // Strip leading markdown emphasis
    text = text.replace(/^[*_]+|[*_]+$/g, "");
    if (!text) continue;
    items.push({ id: slug(text), text, depth });
  }
  return items;
}

export function TocList({ items }: { items: TocItem[] }) {
  if (!items.length) return null;
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it.id} className={it.depth === 2 ? "ml-0" : "ml-4"}>
          <a
            href={`#${it.id}`}
            className="link-underline block font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {it.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
