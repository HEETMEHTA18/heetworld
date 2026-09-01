import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const revalidate = 3600;

export async function GET() {
  const articles = await getAllArticles();

  const items = articles
    .map((a) => {
      const url = `${site.url}/writing/${a.slug}`;
      const date = a.metadata.date;
      return `
    <item>
      <title>${escapeXml(a.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${url}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description>${escapeXml(a.metadata.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escapeXml(site.name)} — Writing</title>
      <link>${site.url}/writing</link>
      <description>${escapeXml(site.description)}</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
