"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";

import { NAV_LINKS, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
            className="relative z-10 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-60 flex items-center gap-1.5"
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