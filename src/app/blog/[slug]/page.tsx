/**
 * /blog/[slug] — Individual blog post page.
 *
 * Server Component. MDX is rendered on the server via next-mdx-remote/rsc.
 * Static params generated at build time from all .mdx files in src/content/blog/.
 */

import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPostSlugs, getPost } from "@/content/blog";
import { mdxComponents } from "@/components/mdx-components";

// ---------------------------------------------------------------------------
// Static params — pre-rendered at build for each .mdx file
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${post.meta.slug}`,
    image: post.meta.coverImage || undefined,
    type: "article",
    publishedTime: post.meta.date,
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <>
      {/* Structured data */}
      <JsonLd
        data={articleSchema({
          title: meta.title,
          description: meta.description,
          path: `/blog/${meta.slug}`,
          datePublished: meta.date,
          author: meta.author,
          image: meta.coverImage,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: meta.title, path: `/blog/${meta.slug}` },
        ])}
      />

      <article>
        {/* ── Cover image ──────────────────────────────────────────── */}
        {meta.coverImage && (
          <div className="relative h-56 w-full overflow-hidden bg-muted sm:h-72 md:h-96">
            <Parallax speed={0.2} className="absolute inset-0 overflow-hidden">
              <Image
                src={meta.coverImage}
                alt={meta.title}
                fill
                className="scale-110 object-cover"
                sizes="100vw"
                priority
              />
            </Parallax>
            {/* Gradient overlay for legibility if title is placed on top */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
            />
          </div>
        )}

        {/* ── Article header ───────────────────────────────────────── */}
        <div className="container-page">
          <Reveal className="mx-auto max-w-[70ch] pt-10 pb-6">
            {/* Category + meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Badge
                variant="secondary"
                className="text-primary bg-primary/10 border-0 uppercase text-xs font-semibold tracking-wide"
              >
                {meta.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{formatDate(meta.date)}</span>
              <span aria-hidden="true" className="text-muted-foreground/50">&middot;</span>
              <span className="text-sm text-muted-foreground">{meta.readingTime}</span>
              <span aria-hidden="true" className="text-muted-foreground/50">&middot;</span>
              <span className="text-sm text-muted-foreground">By {meta.author}</span>
            </div>

            {/* H1 — one per page */}
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance leading-tight sm:text-4xl md:text-5xl">
              {meta.title}
            </h1>

            {/* Description / standfirst */}
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {meta.description}
            </p>

            {/* Divider */}
            <div className="mt-6 h-px bg-border" aria-hidden="true" />
          </Reveal>

          {/* ── MDX body ────────────────────────────────────────────── */}
          <Reveal delay={0.1} className="mx-auto max-w-[70ch] pb-12">
            <MDXRemote source={content} components={mdxComponents} />
          </Reveal>

          {/* ── Back link + CTA ─────────────────────────────────────── */}
          <Reveal delay={0.18} className="mx-auto max-w-[70ch] pb-16">
            <div className="rounded-2xl bg-primary/5 ring-1 ring-primary/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-heading font-semibold text-foreground">
                  Ready to start your project?
                </p>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">
                  Talk to our team — we&apos;ll scope the work and get back to
                  you within one business day.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button asChild size="sm">
                  <Link href="/contact">Get a free quote</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/blog">&larr; All articles</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
