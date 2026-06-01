import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/content/blog";

/**
 * Next.js App Router sitemap.
 *
 * Returns a MetadataRoute.Sitemap array covering every static and dynamic
 * route so search engines can discover all pages. The file is served at
 * /sitemap.xml automatically by Next.js.
 *
 * Priority guide:
 *   1.0  — home (most important)
 *   0.9  — high-traffic list pages (services, projects, blog)
 *   0.8  — secondary static pages (about, contact)
 *   0.7  — individual service and project pages
 *   0.6  — individual blog posts
 */

function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static routes ────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ── Dynamic: /services/[slug] ─────────────────────────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Dynamic: /projects/[slug] ─────────────────────────────────────────────
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: new Date(`${p.year}-01-01`),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // ── Dynamic: /blog/[slug] ─────────────────────────────────────────────────
  // getAllPosts() is a filesystem read — safe at build time in an RSC context.
  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
