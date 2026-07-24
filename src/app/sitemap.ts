import type { MetadataRoute } from "next";

import { metadataSiteConfig } from "@/utils/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: metadataSiteConfig.siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/experience`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${metadataSiteConfig.siteUrl}/three`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
