import { Briefcase, GraduationCap, BookOpen, Compass, Clock, Music2, type LucideIcon } from "lucide-react";
import { now } from "@/content/data/now";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SpotifyEmbed } from "@/components/spotify-embed";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Now",
  description:
    "What Heet is focused on right now — the work in progress, the problems he's turning over, the things shipping this week.",
};

export default function NowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Now"
        title="What I'm doing today"
        description="Updated on the first Sunday of each month. This is the stuff in flight, not a plan."
      />
      <Container className="py-10 sm:py-14">
        <div className="mb-10 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-accent" />
          <span>Last updated {formatDate(now.update)}</span>
        </div>

        <div className="prose lg:prose-lg max-w-reading space-y-12">
          <NowSection title="Working on" icon={Briefcase}>
            {now.working.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </NowSection>
          <NowSection title="Studying" icon={GraduationCap}>
            {now.studying.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </NowSection>
          <NowSection title="Reading" icon={BookOpen}>
            {now.reading.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </NowSection>
          <NowSection title="Planning" icon={Compass}>
            {now.planning.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </NowSection>
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-accent">
                <Music2 className="h-4 w-4" />
              </span>
              <h2 className="font-serif text-2xl tracking-tight text-foreground">
                Currently listening
              </h2>
            </div>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
              {site.spotify.title} — a recent find, on heavy rotation.
            </p>
          </Reveal>
          <div className="mt-6 max-w-md">
            <Reveal delay={0.05}>
              <SpotifyEmbed />
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}

function NowSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-accent">
            <Icon className="h-4 w-4" />
          </span>
          <h2 className="font-serif text-2xl tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
          {children}
        </ul>
      </div>
    </Reveal>
  );
}
