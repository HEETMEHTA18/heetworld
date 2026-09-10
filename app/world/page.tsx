import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "World",
  description:
    "Explore Heet Mehta's interactive world — an immersive developer portfolio experience.",
  openGraph: {
    title: "World — Heet Mehta",
    description: "Interactive developer portfolio world experience.",
    url: "https://heetworld.tech/world",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function WorldPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="max-w-md space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Interactive Experience
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          The World
        </h1>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          An immersive, interactive portfolio experience with an isometric village, terminal, and exploration panels.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
          <a
            href={site.worldUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Open World ↗
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to site
          </Link>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground">
          Opens in a new tab · {site.worldUrl}
        </p>
      </div>
    </main>
  );
}
