import type { ProjectMeta } from "@/types";

import { metadata as tatvikMeta } from "@/content/projects/tatvik.mdx";
import { metadata as autodevsMeta } from "@/content/projects/autodevs.mdx";
import { metadata as trafficMeta } from "@/content/projects/smart-traffic-system.mdx";
import { metadata as aipipelineMeta } from "@/content/projects/ai-pipeline.mdx";
import { metadata as coastalMeta } from "@/content/projects/coastal-threat.mdx";
import { metadata as squadMeta } from "@/content/projects/squad-qa.mdx";
import { metadata as sastaMeta } from "@/content/projects/sasta-shark-tank.mdx";
import { metadata as cvMeta } from "@/content/projects/cv-experiments.mdx";
import { metadata as mlMeta } from "@/content/projects/ml-experiments.mdx";

export const projectsMeta: ProjectMeta[] = [
  tatvikMeta,
  autodevsMeta,
  trafficMeta,
  aipipelineMeta,
  coastalMeta,
  squadMeta,
  sastaMeta,
  cvMeta,
  mlMeta,
].map((m) => m as ProjectMeta).sort((a, b) => a.order - b.order);
