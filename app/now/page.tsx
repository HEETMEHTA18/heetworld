import { now } from "@/content/data/now";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { NowPlaying } from "@/components/now-playing";
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
      <Container className="py-8">
        <p className="mb-10 font-mono text-xs text-muted-foreground">
          Last updated {formatDate(now.update)}
        </p>

        <div className="prose lg:prose-lg max-w-reading space-y-12">
          <NowSection title="Working on" emoji="•">
            {now.working.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </NowSection>
          <NowSection title="Studying">
            {now.studying.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </NowSection>
          <NowSection title="Reading">
            {now.reading.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </NowSection>
          <NowSection title="Planning">
            {now.planning.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </NowSection>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <NowPlaying />
        </div>
      </Container>
    </>
  );
}

function NowSection({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div>
        <h2 className="font-serif text-2xl tracking-tight text-foreground">
          {emoji} {title}
        </h2>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground">
          {children}
        </ul>
      </div>
    </Reveal>
  );
}
