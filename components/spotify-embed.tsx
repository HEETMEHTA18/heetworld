import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SpotifyEmbed({
  className,
  height = 152,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card",
        className
      )}
    >
      <iframe
        title={site.spotify.title}
        src={site.spotify.embed}
        width="100%"
        height={height}
        frameBorder="0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="block"
      />
    </div>
  );
}
