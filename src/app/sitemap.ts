import type { MetadataRoute } from "next";
import { statSync } from "node:fs";
import path from "node:path";

import { metadataSiteConfig } from "@/utils/metadata";

function getLastModified(...relativePaths: string[]) {
  const stats = relativePaths.map((relativeFilePath) =>
    statSync(path.join(process.cwd(), relativeFilePath)).mtime,
  );

  return new Date(Math.max(...stats.map((date) => date.getTime())));
}

export default function sitemap(): MetadataRoute.Sitemap {
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
