import { photos } from "@/content/data/photos";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const ratioClass: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
};

export function PhotoStrip({
  className,
  label = "Featured",
  intro = "Selected visual studies and experiments — dithered snapshots of places, movement, and quiet. Made with ditherstudio and a lot of noise.",
}: {
  className?: string;
  label?: string;
  intro?: string;
}) {
  return (
    <Container className={cn("py-12", className)}>
      <div className="border-t border-border pt-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((item, i) => (
            <Reveal
              key={item.number}
              delay={(i % 8) * 0.04}
              className="break-inside-avoid"
            >
              <figure className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <div className={cn("relative w-full overflow-hidden", ratioClass[item.ratio])}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-3 py-2.5">
                  <p className="font-mono text-[11px] text-foreground">
                    <span className="text-accent">{item.number}</span>
                    <span className="text-muted-foreground"> — </span>
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                    {item.credit ? (
                      <>
                        {" · "}
                        <span className="text-muted-foreground/80">{item.credit}</span>
                      </>
                    ) : null}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
