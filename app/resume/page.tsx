import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/print-button";
import { Download, MapPin, FileText } from "lucide-react";
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
      >
        <div className="flex gap-2">
          <PrintButton className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground" />
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </a>
        </div>
      </PageHeader>

      <Container className="py-4">
        <div className="not-prose flex items-center justify-between rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-accent" />
              <a href={site.socials.email}>{site.email}</a>
            </span>
            <span className="text-border">/</span>
            <span className="flex items-center gap-2">
              <GitHubIcon className="h-4 w-4 text-accent" />
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/heetmehta
              </a>
            </span>
            <span className="text-border">/</span>
            <span className="flex items-center gap-2">
              <LinkedInIcon className="h-4 w-4 text-accent" />
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
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
