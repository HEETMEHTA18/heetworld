import { TocList, type TocItem } from "@/lib/toc";

export { TocList };
export type { TocItem };

export function TocSidebar({ items }: { items: TocItem[] }) {
  return (
    <aside className="top-24 hidden w-full max-w-[220px] xl:block">
      <nav aria-labelledby="toc-heading">
        <p
          id="toc-heading"
          className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
        >
          On this page
        </p>
        <TocList items={items} />
      </nav>
    </aside>
  );
}
