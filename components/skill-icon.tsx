import {
  siAngular,
  siAnsible,
  siApache,
  siApollographql,
  siBabel,
  siBetterauth,
  siCloudflare,
  siCplusplus,
  siCypress,
  siDigitalocean,
  siDjango,
  siDocker,
  siDrizzle,
  siElasticsearch,
  siElectron,
  siEslint,
  siExpress,
  siFastapi,
  siFigma,
  siFirebase,
  siFlask,
  siFlutter,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGitlab,
  siGo,
  siGooglecloud,
  siGrafana,
  siGraphql,
  siGsap,
  siHtml5,
  siJavascript,
  siJenkins,
  siJest,
  siKubernetes,
  siLinux,
  siMongodb,
  siMui,
  siMysql,
  siNeon,
  siNetlify,
  siNewrelic,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNuxt,
  siOpensourceinitiative,
  siPostgresql,
  siPrettier,
  siPrisma,
  siPrometheus,
  siPython,
  siRailway,
  siRazorpay,
  siReact,
  siRedis,
  siRedux,
  siRender,
  siRollupdotjs,
  siRust,
  siScikitlearn,
  siSentry,
  siSpring,
  siStorybook,
  siStripe,
  siSupabase,
  siSvelte,
  siTailwindcss,
  siTanstack,
  siTensorflow,
  siTerraform,
  siTrpc,
  siTypescript,
  siVercel,
  siVite,
  siVuedotjs,
  siWebpack,
  siWebrtc,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

import { cn } from "@/lib/utils";

const BRAND_MAP: Record<string, SimpleIcon> = {
  angular: siAngular,
  ansible: siAnsible,
  apache: siApache,
  apollo: siApollographql,
  babel: siBabel,
  betterauth: siBetterauth,
  cloudflare: siCloudflare,
  container: siDocker,
  cplusplus: siCplusplus,
  cypress: siCypress,
  digitalocean: siDigitalocean,
  django: siDjango,
  drizzle: siDrizzle,
  elasticsearch: siElasticsearch,
  electron: siElectron,
  eslint: siEslint,
  express: siExpress,
  fastapi: siFastapi,
  figma: siFigma,
  firebase: siFirebase,
  flask: siFlask,
  flutter: siFlutter,
  framer: siFramer,
  gcp: siGooglecloud,
  git: siGit,
  github: siGithub,
  githubactions: siGithubactions,
  gitlab: siGitlab,
  go: siGo,
  grafana: siGrafana,
  graphql: siGraphql,
  gsap: siGsap,
  html5: siHtml5,
  javascript: siJavascript,
  jenkins: siJenkins,
  jest: siJest,
  kubernetes: siKubernetes,
  linux: siLinux,
  mongodb: siMongodb,
  mui: siMui,
  mysql: siMysql,
  neon: siNeon,
  netlify: siNetlify,
  newrelic: siNewrelic,
  nextjs: siNextdotjs,
  nginx: siNginx,
  nodejs: siNodedotjs,
  nuxtjs: siNuxt,
  opensource: siOpensourceinitiative,
  postgresql: siPostgresql,
  prettier: siPrettier,
  prisma: siPrisma,
  prometheus: siPrometheus,
  python: siPython,
  railway: siRailway,
  razorpay: siRazorpay,
  react: siReact,
  redis: siRedis,
  redux: siRedux,
  render: siRender,
  rollup: siRollupdotjs,
  rust: siRust,
  scikitlearn: siScikitlearn,
  sentry: siSentry,
  spring: siSpring,
  storybook: siStorybook,
  stripe: siStripe,
  supabase: siSupabase,
  svelte: siSvelte,
  tailwindcss: siTailwindcss,
  tanstack: siTanstack,
  tensorflow: siTensorflow,
  terraform: siTerraform,
  trpc: siTrpc,
  typescript: siTypescript,
  vercel: siVercel,
  vite: siVite,
  vuejs: siVuedotjs,
  webpack: siWebpack,
  webrtc: siWebrtc,
};

export function SkillIcon({
  name,
  icon,
  color,
  className,
}: {
  name: string;
  icon?: string;
  color?: string;
  className?: string;
}) {
  const brand = icon ? BRAND_MAP[icon] : undefined;

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        style={color ? { color } : undefined}
        aria-hidden="true"
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const letter = (name.charAt(0) || "?").toUpperCase();
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded font-bold leading-none text-white",
        className
      )}
      style={{
        backgroundColor: color ?? "#6366F1",
        color: "#FFFFFF",
      }}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}