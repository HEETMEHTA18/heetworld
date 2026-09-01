import Link from "next/link";

import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Page not found",
};

const primary = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const more = [
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/now", label: "Now" },
  { href: "/uses", label: "Uses" },
  { href: "/bookmarks", label: "Bookmarks" },
  { href: "/thoughts", label: "Thoughts" },
];

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          error · 404
        </p>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-7xl">
          404
        </h1>
        <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
          This page doesn&apos;t exist — or it moved. Here are a few places to go
          instead.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            start here
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {primary.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[13px] font-medium text-foreground transition-colors hover:border-foreground"
              >
                {link.label}
                <span aria-hidden="true" className="text-muted-foreground">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="mt-8 border-t border-border pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            explore
          </p>
          <ul className="mt-3 grid max-w-3xl gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {more.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between border-b border-border py-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Container>
  );
}
