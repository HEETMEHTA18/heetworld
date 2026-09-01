import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

export function PageHeader({
  number,
  eyebrow,
  title,
  description,
  children,
}: {
  number?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border">
      <Container className="pb-12 pt-24 sm:pb-16 sm:pt-28">
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            {(number || eyebrow) && (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {number && <span className="text-foreground">{number}</span>}
                {number && eyebrow && <span className="mx-2">/</span>}
                {eyebrow}
              </p>
            )}
            <h1 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>
        {children ? (
          <div className="mt-6">{children}</div>
        ) : null}
      </Container>
    </header>
  );
}