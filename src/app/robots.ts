import type { MetadataRoute } from "next";

import { metadataSiteConfig } from "@/utils/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${metadataSiteConfig.siteUrl}/sitemap.xml`,
    host: metadataSiteConfig.siteUrl,
  };
}
