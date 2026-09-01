import { ProjectVisual } from "@/components/visuals";
import type { ProjectVisualType } from "@/components/visuals";
import type { TocItem } from "@/lib/toc";
import { TocSidebar } from "@/components/mdx/toc-sidebar";

export function MdxContentLayout({
  children,
  toc,
  cover,
  visual,
}: {
  children: React.ReactNode;
  toc?: TocItem[];
  cover?: React.ReactNode;
  visual?: ProjectVisualType;
}) {
  return (
    <div className="w-full">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-5 py-12 sm:gap-16 sm:px-8 md:py-20">
        <main className="prose-content min-w-0">
          {cover ? <div className="mb-10">{cover}</div> : null}
          {visual ? (
            <div className="mb-12">
              <ProjectVisual type={visual} />
            </div>
          ) : null}
          <div className="prose lg:prose-lg max-w-none">{children}</div>
        </main>
        {toc && toc.length > 0 ? <TocSidebar items={toc} /> : null}
      </div>
    </div>
  );
}

export function TocInline() {
  return null;
}