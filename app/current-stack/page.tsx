import { currentStack } from "@/content/data/now";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Current Stack",
  description: "The tools I'm building with, learning, and reaching for.",
};

export default function CurrentStackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Stack"
        title="My current stack"
        description="What I'm building with, learning, reaching for, and shipping next."
      />
      <Container className="py-8">
        <p className="mb-10 font-mono text-xs text-muted-foreground">
          Updated {formatDate(currentStack.update)}
        </p>

        <div className="prose lg:prose-lg max-w-reading">
          <StackSection title="Building with" items={currentStack.build} />
          <StackSection title="Learning" items={currentStack.learning} />
          <StackSection title="Reaching for" items={currentStack.using} />
          <StackSection title="Next" items={currentStack.next} />
        </div>
      </Container>
    </>
  );
}

function StackSection({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <Reveal className="mt-10 first:mt-0">
      <h2 className="font-serif text-2xl tracking-tight text-foreground">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((it) => (
          <Pill key={it} variant="soft">
            {it}
          </Pill>
        ))}
      </ul>
    </Reveal>
  );
}
