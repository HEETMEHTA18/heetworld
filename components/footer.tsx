import Link from "next/link";
import Image from "next/image";

import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  MailIcon,
} from "@/components/icons";

import { FOOTER_LINKS, NAV_LINKS, site } from "@/lib/site";
import { Container } from "@/components/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-6 overflow-hidden">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/projects/daniel-gomez-eKegp5f2PPk-unsplash.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Subtle gradient texture */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-soft via-transparent to-transparent opacity-60" />
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-accent-soft blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent-soft blur-3xl" />
        <div className="absolute -left-16 bottom-24 h-72 w-72 rounded-full bg-accent-soft blur-3xl" />
      </div>

      <Container className="relative py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Identity */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-foreground"
            >
              {site.initials}
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {site.title}
            </p>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </p>
            <ul className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="flex flex-col gap-1.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </p>
            <div className="flex items-center gap-2">
              <SocialLink href={site.socials.github} label="GitHub">
                <GitHubIcon className="h-3.5 w-3.5" />
              </SocialLink>
              <SocialLink href={site.socials.linkedin} label="LinkedIn">
                <LinkedInIcon className="h-3.5 w-3.5" />
              </SocialLink>
              <SocialLink href={site.socials.twitter} label="Twitter">
                <TwitterIcon className="h-3.5 w-3.5" />
              </SocialLink>
              <SocialLink href={site.socials.email} label="Email">
                <MailIcon className="h-3.5 w-3.5" />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Built with code + curiosity
          </p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}