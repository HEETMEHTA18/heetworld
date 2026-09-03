"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";

export type PageFlowItem = {
  href: string;
  label: string;
  description?: string;
};

const PAGE_FLOW: PageFlowItem[] = [
  { href: "/", label: "Home", description: "Start here" },
  { href: "/about", label: "About", description: "Who I am" },
  { href: "/projects", label: "Projects", description: "What I build" },
  { href: "/experience", label: "Experience", description: "Where I've worked" },
  { href: "/skills", label: "Skills", description: "What I know" },
  { href: "/writing", label: "Writing", description: "What I think" },
  { href: "/research", label: "Research", description: "What I explore" },
  { href: "/stack", label: "Stack", description: "My tech stack" },
  { href: "/now", label: "Now", description: "What's next" },
  { href: "/contact", label: "Contact", description: "Let's connect" },
];

export function PageFlow({ currentPath }: { currentPath: string }) {
  const reduceMotion = useReducedMotion();

  const currentIndex = PAGE_FLOW.findIndex(
    (p) => p.href === currentPath || currentPath.startsWith(p.href + "/")
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? PAGE_FLOW[currentIndex - 1] : null;
  const next =
    currentIndex < PAGE_FLOW.length - 1 ? PAGE_FLOW[currentIndex + 1] : null;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PAGE_FLOW.length - 1;

  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 py-12 sm:py-16">
        {/* Progress indicator */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {currentIndex + 1} / {PAGE_FLOW.length}
            </span>
          </div>
          <div className="h-0.5 w-full rounded-full bg-border overflow-hidden">
            <motion.div
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{
                width: `${((currentIndex + 1) / PAGE_FLOW.length) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-foreground"
            />
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          {/* Previous */}
          {prev ? (
            <Link
              href={prev.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-foreground/20 flex-1 max-w-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background shrink-0">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Previous
                </p>
                <p className="text-sm font-medium text-foreground truncate">
                  {prev.label}
                </p>
                {prev.description && (
                  <p className="text-[12px] text-muted-foreground truncate">
                    {prev.description}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div className="flex-1 max-w-sm" />
          )}

          {/* Back to top */}
          <motion.a
            href="#"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-foreground/20 hover:text-foreground shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.a>

          {/* Next */}
          {next ? (
            <Link
              href={next.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-foreground/20 flex-1 max-w-sm text-right justify-end"
            >
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Next
                </p>
                <p className="text-sm font-medium text-foreground truncate">
                  {next.label}
                </p>
                {next.description && (
                  <p className="text-[12px] text-muted-foreground truncate">
                    {next.description}
                  </p>
                )}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background shrink-0">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ) : isLast ? (
            <Link
              href="/"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-foreground/20 flex-1 max-w-sm text-right justify-end"
            >
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Back to
                </p>
                <p className="text-sm font-medium text-foreground">Home</p>
                <p className="text-[12px] text-muted-foreground">
                  Start over
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shrink-0">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </div>
            </Link>
          ) : (
            <div className="flex-1 max-w-sm" />
          )}
        </div>

        {/* Page dots */}
        <div className="mt-8 flex justify-center gap-1.5">
          {PAGE_FLOW.map((page, i) => (
            <Link
              key={page.href}
              href={page.href}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to ${page.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
