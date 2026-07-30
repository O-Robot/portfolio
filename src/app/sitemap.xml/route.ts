import { statSync } from "node:fs";
import path from "node:path";

import { metadataSiteConfig } from "@/utils/metadata";

type SitemapEntry = {
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  lastModified: Date;
  priority: number;
  url: string;
};

function getLastModified(...relativePaths: string[]) {
  const stats = relativePaths.map((relativeFilePath) =>
    statSync(path.join(process.cwd(), relativeFilePath)).mtime,
  );

  return new Date(Math.max(...stats.map((date) => date.getTime())));
}

function getSitemapEntries(): SitemapEntry[] {
  return [
    {
      url: metadataSiteConfig.siteUrl,
      lastModified: getLastModified(
        "src/app/page.tsx",
        "src/app/layout.tsx",
        "src/app/home/page.tsx",
        "src/data/about.json",
      ),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/about`,
      lastModified: getLastModified(
        "src/app/about/page.tsx",
        "src/app/about/layout.tsx",
        "src/data/about.json",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/experience`,
      lastModified: getLastModified(
        "src/app/experience/page.tsx",
        "src/app/experience/layout.tsx",
        "src/data/experience.json",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/projects`,
      lastModified: getLastModified(
        "src/app/projects/page.tsx",
        "src/app/projects/layout.tsx",
        "src/data/projects.json",
      ),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/resume`,
      lastModified: getLastModified(
        "src/app/resume/page.tsx",
        "src/app/resume/layout.tsx",
        "src/data/about.json",
      ),
      changeFrequency: "yearly",
      priority: 0.75,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/contact`,
      lastModified: getLastModified(
        "src/app/contact/page.tsx",
        "src/app/contact/layout.tsx",
        "src/app/contact-me/page.tsx",
        "src/data/contact.json",
      ),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/three`,
      lastModified: getLastModified(
        "src/app/three/page.tsx",
        "src/app/three/layout.tsx",
      ),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function GET() {
  const entries = getSitemapEntries();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
