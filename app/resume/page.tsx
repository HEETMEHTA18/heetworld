import { experience as allExperience } from "@/content/data/experience";
import { skillGroups } from "@/content/data/skills";
import { projectsMeta } from "@/content/data/projects";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { PrintButton } from "@/components/print-button";
import { GitHubIcon, LinkedInIcon, MailIcon, TwitterIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata = {
  title: "Resume",
  description: "Heet Mehta — AI engineer and builder. Resume.",
};

export default function ResumePage() {
  const selected = allExperience.filter(
    (e) => e.type !== "Goal" && e.type !== "Project" && e.type !== "Hackathon"
  );

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
            className="rounded-xl border border-border bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
          >
            Download PDF
          </a>
        </div>
      </PageHeader>

      <Container className="py-2">
        <div className="prose lg:prose-lg max-w-none print:prose-invert print:bg-white">
          <div className="not-prose mt-4 flex items-center justify-between rounded-2xl border border-border bg-card p-6">
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
                  linkedin.com/in/heetmehta
                </a>
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {site.location}
            </span>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Experience</h2>
            <div className="mt-4 space-y-6">
              {selected.map((e) => (
                <div key={e.period + e.role}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium text-foreground">{e.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.org} · {e.type}</p>
                  <ul className="mt-1 list-disc pl-5 text-sm leading-relaxed text-muted-foreground">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Selected projects</h2>
            <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed text-muted-foreground">
              {projectsMeta.map((p) => (
                <li key={p.slug}>
                  <span className="font-medium text-foreground">{p.title}</span>{" "}
                  · {p.tagline}
                  <a
                    href={p.github ?? "#"}
                    className="ml-1 text-accent underline-offset-4 hover:underline"
                  >
                    github
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Education</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              B.E. Computer Engineering · University · 2023–2027
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-serif text-2xl tracking-tight text-foreground">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {skillGroups.flatMap((g) => g.skills.map((s) => s.name)).map((n) => (
                <span
                  key={n}
                  className="font-mono text-[10px] text-muted-foreground"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
