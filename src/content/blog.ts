import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPostMeta } from "./types";

/**
 * File-based blog loader. Posts live as `.mdx` files in `src/content/blog/`
 * with YAML frontmatter. This module reads them on the server (RSC) so the
 * blog agent only has to build the rendering UI on top of these helpers.
 *
 * Add a post = drop a new `.mdx` file in the blog folder. No code changes.
 */

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export interface LoadedPost {
  meta: BlogPostMeta;
  /** Raw MDX body (render with next-mdx-remote/rsc). */
  content: string;
}

export function getPost(slug: string): LoadedPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      readingTime: estimateReadingTime(content),
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? new Date(0).toISOString(),
      author: data.author ?? "Northline Team",
      category: data.category ?? "News",
      tags: data.tags ?? [],
      coverImage: data.coverImage ?? "",
    },
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostSlugs()
    .map((slug) => getPost(slug)?.meta)
    .filter((m): m is BlogPostMeta => Boolean(m))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
