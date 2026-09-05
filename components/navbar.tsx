"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, Globe } from "lucide-react";

import { NAV_LINKS, MORE_LINKS, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
       document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 transition-all duration-300 sm:px-8",
            scrolled ? "sm:h-12" : "sm:h-14"
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 border-b transition-all duration-300",
              scrolled
                ? "border-border/60 bg-background/80 backdrop-blur-xl"
                : "border-transparent bg-transparent"
            )}
          />

          <Link
            href="/"
            className="relative z-10 flex items-center gap-1.5 font-display text-lg tracking-[0.12em] text-foreground transition-opacity hover:opacity-60"
            aria-label="Home — Heet Mehta"
          >
            {site.initials}
          </Link>

          <nav
            aria-label="Primary"
            className="relative z-10 hidden items-center gap-0 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const external = link.href.startsWith("http");
              const openNewTab = external && !link.sameTab;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={openNewTab ? "_blank" : undefined}
                  rel={openNewTab ? "noreferrer" : undefined}
                  className={cn(
                    "link-underline inline-flex items-center gap-1 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
                    isActivePath(pathname, link.href)
                      ? "is-active text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {openNewTab && <Globe className="h-3 w-3 text-accent" />}
                  <span>{link.label}</span>
                  {openNewTab && <ArrowUpRight className="h-3 w-3 opacity-70" />}
                </Link>
              );
            })}

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((v) => !v)}
                className={cn(
                  "link-underline inline-flex items-center gap-1 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
                  moreOpen || MORE_LINKS.some((l) => isActivePath(pathname, l.href))
                    ? "is-active text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>More</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    moreOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-lift"
                  >
                    {MORE_LINKS.map((link) => {
                      const external = link.href.startsWith("http");
                      const active = isActivePath(pathname, link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          target={external && !link.sameTab ? "_blank" : undefined}
                          rel={
                            external && !link.sameTab ? "noreferrer" : undefined
                          }
                          onClick={() => setMoreOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3 py-2 text-[13px] transition-colors",
                            active
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <span>{link.label}</span>
                          <span aria-hidden="true" className="text-[10px] text-muted-foreground">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col gap-0 px-6 pt-20"
            >
              {NAV_LINKS.map((link, i) => {
                const external = link.href.startsWith("http");
                const openNewTab = external && !link.sameTab;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      target={openNewTab ? "_blank" : undefined}
                      rel={openNewTab ? "noreferrer" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-border py-4 font-mono text-sm uppercase tracking-[0.15em] transition-colors",
                        isActivePath(pathname, link.href)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                      <span className="text-[10px] text-muted-foreground">→</span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  More
                </p>
                {MORE_LINKS.map((link, i) => {
                  const external = link.href.startsWith("http");
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * (i + NAV_LINKS.length), duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        target={external && !link.sameTab ? "_blank" : undefined}
                        rel={external && !link.sameTab ? "noreferrer" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-border py-4 font-mono text-sm uppercase tracking-[0.15em] transition-colors",
                          isActivePath(pathname, link.href)
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                        <span className="text-[10px] text-muted-foreground">→</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>
            <div className="flex items-center justify-between border-t border-border px-6 py-6">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {site.location}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}