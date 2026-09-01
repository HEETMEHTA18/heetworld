import { WindowFrame } from "@/components/visuals/window";
import { cn } from "@/lib/utils";

const codeLines = [
  { indent: 0, content: ["$ ", "tatvik", " --wake 0.6"], color: "text-foreground" },
  { indent: 0, content: ["✓ ", "hotword engine ready", " (rust)  12ms"], color: "text-emerald-600 dark:text-emerald-400" },
  { indent: 0, content: ["✓ ", "whisper (small) loaded", "   —  1.1x realtime"], color: "text-emerald-600 dark:text-emerald-400" },
  { indent: 0, content: ["✓ ", "llm 1.2B q4  loaded", "  (metal)  ~38 tok/s"], color: "text-emerald-600 dark:text-emerald-400" },
  { indent: 0, content: ["> listening…"], color: "text-muted-foreground" },
  { indent: 0, content: ["user: ", "what is on my calendar today?"], color: "text-foreground" },
  { indent: 0, content: ["intent: ", "calendar.query", " (0.94)"], color: "text-sky-600 dark:text-sky-400" },
  { indent: 1, content: ["tool: ", "read calendar "], color: "text-foreground" },
  { indent: 1, content: ["result: ", "1 meeting — 15:00 design review"], color: "text-muted-foreground" },
  { indent: 0, content: ["tatvik: ", "You have one meeting today — the design review at 3 pm."], color: "text-foreground" },
  { indent: 0, content: ["_"], color: "text-muted-foreground animate-pulse" },
];

export function TerminalVisual({ className }: { className?: string }) {
  return (
    <WindowFrame title="tatvik — local-first assistant" className={className} active>
      <div className="space-y-1 overflow-hidden p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        {codeLines.map((line, i) => (
          <div key={i} className={cn("flex", line.indent && "pl-4")}>
            <span className={line.color}>
              {line.content.map((part, j) => (
                <span key={j}>{part}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}