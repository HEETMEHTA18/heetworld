import fs from "fs";
import path from "path";

export function getContentSlugs(relativeDir: string): string[] {
  const dir = path.join(process.cwd(), relativeDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getProjectBySlug(slug: string) {
  const mod = await import(`@/content/projects/${slug}.mdx`);
  return {
    slug,
    metadata: mod.metadata as import("@/types").ProjectMeta,
    Content: mod.default,
  };
}

export async function getAllProjects() {
  const slugs = getContentSlugs("content/projects");
  const projects = await Promise.all(slugs.map(getProjectBySlug));
  return projects.sort((a, b) => a.metadata.order - b.metadata.order);
}

export async function getFeaturedProjects() {
  const all = await getAllProjects();
  return all.filter((p) => p.metadata.featured);
}

export async function getArticleBySlug(slug: string) {
  const mod = await import(`@/content/articles/${slug}.mdx`);
  return {
    slug,
    metadata: mod.metadata as import("@/types").ArticleMeta,
    Content: mod.default,
  };
}

export async function getAllArticles() {
  const slugs = getContentSlugs("content/articles");
  const articles = await Promise.all(slugs.map(getArticleBySlug));
  return articles
    .filter((a) => !a.metadata.draft)
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
}

export async function getResearchNoteBySlug(slug: string) {
  const mod = await import(`@/content/research/${slug}.mdx`);
  return {
    slug,
    metadata: mod.metadata as import("@/types").ResearchNoteMeta,
    Content: mod.default,
  };
}

export async function getAllResearchNotes() {
  const slugs = getContentSlugs("content/research");
  const notes = await Promise.all(slugs.map(getResearchNoteBySlug));
  return notes.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export async function getRelatedArticles(slug: string, limit = 3) {
  const all = await getAllArticles();
  return all.filter((a) => a.slug !== slug).slice(0, limit);
}
