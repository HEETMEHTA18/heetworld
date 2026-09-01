"use client";

import { useTheme } from "next-themes";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SpotifyEmbed({
  className,
  height = 152,
}: {
  className?: string;
  height?: number;
}) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "1" : "0";

  return (
    <iframe
      title={site.spotify.title}
      src={`${site.spotify.embed}?utm_source=generator&theme=${theme}`}
      width="100%"
      height={height}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
      loading="lazy"
      className={cn("block w-full overflow-hidden rounded-xl", className)}
    />
  );
}