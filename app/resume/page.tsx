import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { MapPin, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata = {
  title: "Resume",
  description: "Heet Mehta — AI engineer and builder. Resume.",
};

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Heet Mehta"
        description={site.title}
      />

      <Container className="py-4">
        <div className="not-prose flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-accent" />
              <a href={site.socials.email} className="break-all">
                {site.email}
              </a>
            </span>
            <span className="hidden text-border sm:inline">/</span>
            <span className="flex items-center gap-2">
              <GitHubIcon className="h-4 w-4 text-accent" />
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all"
              >
                github.com/heetmehta18
              </a>
            </span>
            <span className="hidden text-border sm:inline">/</span>
            <span className="flex items-center gap-2">
              <LinkedInIcon className="h-4 w-4 text-accent" />
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all"
              >
                linkedin.com/in/heetmehta18
              </a>
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{site.location}</span>
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
            <span className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <FileText className="h-3.5 w-3.5 text-accent" />
              resume.pdf
            </span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-accent underline-offset-4 hover:underline"
            >
              Open in new tab ↗
            </a>
          </div>
          <iframe
            src="/resume.pdf"
            title="Heet Mehta — Resume"
            className="h-[75vh] w-full print:h-auto"
          />
        </div>
      </Container>
    </>
  );
}