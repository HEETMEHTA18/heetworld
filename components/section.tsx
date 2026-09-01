import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  number,
  label,
  title,
  description,
  align = "left",
  className,
}: {
  number?: string;
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-3 sm:mb-12",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {(number || label) && (
        <SectionLabel>
          {number && <span className="text-foreground">{number}</span>}
          {number && label && <span className="mx-2">/</span>}
          {label}
        </SectionLabel>
      )}
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("mx-auto w-full max-w-[1200px] border-t border-border", className)}
    />
  );
}