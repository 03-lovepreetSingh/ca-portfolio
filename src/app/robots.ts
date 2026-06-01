import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js App Router robots.txt generator.
 *
 * Served automatically at /robots.txt.
 * Rules: allow all crawlers across all paths; point to the sitemap.
 *
 * There are no paths that need to be disallowed for this public-facing
 * portfolio site. Server Actions live under /api-internal patterns that
 * are not linked-to pages, so they do not need explicit disallow rules
 * (crawlers only follow links, not POST targets).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
