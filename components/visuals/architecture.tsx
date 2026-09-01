import { WindowFrame } from "@/components/visuals/window";
import { cn } from "@/lib/utils";

export function ArchitectureVisual({
  className,
  variant = "pipeline",
}: {
  className?: string;
  variant?: "pipeline" | "loops";
}) {
  if (variant === "loops") {
    return <LoopsVisual className={className} />;
  }
  return <PipelineVisual className={className} />;
}

function Box({
  label,
  sub,
  accent,
}: {
  label: string;
  sub: string;
  accent: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-center",
        accent
          ? "border-accent/40 bg-accent-soft"
          : "border-border bg-muted/50"
      )}
    >
      <p className="font-mono text-[10px] font-medium text-foreground sm:text-[11px]">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-[8px] text-muted-foreground sm:text-[9px]">
        {sub}
      </p>
    </div>
  );
}

function Pipe() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-px w-6 border-t border-dashed border-muted-foreground/40 sm:w-10" />
    </div>
  );
}

function PipelineVisual({ className }: { className?: string }) {
  return (
    <WindowFrame title="pipeline — ingest → infer → serve" className={className}>
      <div className="flex flex-col items-center justify-center gap-2 p-5 sm:flex-row sm:gap-1">
        <Box label="camera" sub="edge ingest" accent={false} />
        <Pipe />
        <Box label="detector" sub="YOLOv8 · onnx" accent />
        <Pipe />
        <Box label="comparator" sub="planogram rules" accent={false} />
        <Pipe />
        <Box label="alerts" sub="dashboard · tg" accent={false} />
      </div>
    </WindowFrame>
  );
}

function LoopsVisual({ className }: { className?: string }) {
  return (
    <WindowFrame title="agent loop — plan · act · verify" className={className}>
      <div className="grid grid-cols-3 gap-2 p-5">
        {[
          { n: "01", t: "explore", s: "index repo" },
          { n: "02", t: "plan", s: "approve diff" },
          { n: "03", t: "verify", s: "run tests" },
        ].map((step) => (
          <div
            key={step.n}
            className="rounded-lg border border-border bg-muted/50 p-3 text-center"
          >
            <p className="font-mono text-[9px] text-accent">{step.n}</p>
            <p className="mt-1 font-mono text-[11px] font-medium text-foreground">
              {step.t}
            </p>
            <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
              {step.s}
            </p>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}