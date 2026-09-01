import { MetadataRoute } from "next";

import { getContentSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = getContentSlugs("content/projects");
  const articleSlugs = getContentSlugs("content/articles");
  const researchSlugs = getContentSlugs("content/research");

  const routes = [
    "",
    "/about",
    "/projects",
    "/research",
    "/writing",
    "/experience",
    "/skills",
    "/uses",
    "/gallery",
    "/contact",
    "/resume",
    "/now",
    "/bookmarks",
    "/thoughts",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const projects = projectSlugs.map(
    (slug) => ({
      url: `${site.url}/projects/${slug}`,
      lastModified: new Date(),
    })
  );
  const articles = articleSlugs.map(
    (slug) => ({
      url: `${site.url}/writing/${slug}`,
      lastModified: new Date(),
    })
  );
  const research = researchSlugs.map(
    (slug) => ({
      url: `${site.url}/research/${slug}`,
      lastModified: new Date(),
    })
  );

  return [...routes, ...projects, ...articles, ...research];
}
