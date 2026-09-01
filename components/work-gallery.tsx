import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { workGallery } from "@/content/data/workGallery";

const ratioClass: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export function WorkGallery({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4", className)}>
      {workGallery.map((item, i) => (
        <Reveal
          key={item.src}
          delay={(i % 4) * 0.06}
          className="break-inside-avoid"
        >
          <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
            <div
              className={cn(
                "relative w-full overflow-hidden",
                ratioClass[item.ratio]
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="px-3 py-2.5">
              <p className="font-mono text-[11px] text-foreground">
                <span className="text-accent">{item.title}</span>
                <span className="text-muted-foreground"> — </span>
                {item.caption}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                photo · {item.credit}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
