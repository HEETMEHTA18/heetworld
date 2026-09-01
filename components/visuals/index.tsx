import { TerminalVisual } from "@/components/visuals/terminal";
import { DashboardVisual } from "@/components/visuals/dashboard";
import { ArchitectureVisual } from "@/components/visuals/architecture";
import { LaptopVisual, MobileVisual } from "@/components/visuals/device";

export type ProjectVisualType =
  | "terminal"
  | "dashboard"
  | "diagram"
  | "laptop"
  | "architecture"
  | "mobile";

export function ProjectVisual({
  type,
  className,
}: {
  type: ProjectVisualType;
  className?: string;
}) {
  switch (type) {
    case "terminal":
      return <TerminalVisual className={className} />;
    case "dashboard":
      return <DashboardVisual className={className} />;
    case "architecture":
      return <ArchitectureVisual className={className} variant="pipeline" />;
    case "diagram":
      return <ArchitectureVisual className={className} variant="loops" />;
    case "laptop":
      return <LaptopVisual className={className} />;
    case "mobile":
      return <MobileVisual className={className} />;
  }
}