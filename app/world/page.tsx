"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function WorldRedirect() {
  useEffect(() => {
    window.location.replace(site.worldUrl);
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Opening the world…
      </p>
      <Link
        href={site.worldUrl}
        className="inline-flex items-center gap-1.5 font-mono text-sm text-foreground underline-offset-4 hover:underline"
      >
        {site.worldUrl} ↗
      </Link>
    </main>
  );
}
