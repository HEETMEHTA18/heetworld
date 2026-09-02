import { MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon } from "@/components/icons";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch — about a project, a role, or a shared interest in AI and developer tools.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        description="I'm receptive to interesting work, collaborations, and thoughtful messages. The fastest reply is often via email."
      />

      <Container className="py-6">
        {/* Hero email CTA */}
        <Reveal>
          <a
            href={site.socials.email}
            className="group block rounded-2xl border border-border bg-card p-8 sm:p-10 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-accent/40"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Email
                </p>
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {site.email}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </a>
        </Reveal>

        {/* Social links grid */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <GitHubIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">GitHub</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {site.socials.github.replace("https://github.com/", "")}
                </span>
              </div>
            </a>

            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <LinkedInIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">LinkedIn</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {site.socials.linkedin.replace("https://linkedin.com/in/", "")}
                </span>
              </div>
            </a>

            <a
              href={site.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                <TwitterIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Twitter</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {site.twitter}
                </span>
              </div>
            </a>
          </div>
        </Reveal>

        {/* Availability + Location */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
                  Available
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Open to freelance, full-time roles, and open-source collaborations.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Location
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Based in {site.location}. Usually online.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Response time note */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-border bg-card/50 p-6 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Typical response time: within 24 hours
            </p>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
