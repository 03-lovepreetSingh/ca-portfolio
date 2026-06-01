/**
 * /blog — Blog listing page.
 *
 * Server Component. Renders a featured lead card for the newest post, then a
 * responsive 1/2/3 grid for the remaining posts. If no posts exist, shows a
 * tasteful empty state.
 */

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/content/blog";
import type { BlogPostMeta } from "@/content/types";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  path: "/blog",
  description:
    "Guides and insights on construction, electrical, smart-home and real estate from our team.",
});

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
// Sub-components
// ---------------------------------------------------------------------------

/** Large featured card for the most-recent post. */
function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border
                   transition-shadow hover:shadow-xl focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-ring sm:flex-row"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Cover image */}
        {post.coverImage && (
          <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 40vw"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-4 p-6 sm:p-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-primary bg-primary/10 border-0 uppercase text-xs font-semibold tracking-wide">
                {post.category}
              </Badge>
              <span className="text-xs text-muted-foreground">Featured</span>
            </div>

            <h2 className="font-heading text-xl font-bold tracking-tight text-foreground text-balance
                           transition-colors group-hover:text-primary sm:text-2xl">
              {post.title}
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 text-pretty">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{post.author}</span>
            </div>
            <span className="text-sm font-medium text-primary group-hover:underline underline-offset-4">
              Read &rarr;
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** Compact grid card for remaining posts. */
function PostCard({ post, delay }: { post: BlogPostMeta; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border h-full
                   transition-shadow hover:shadow-lg focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Cover */}
        {post.coverImage && (
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <Badge
            variant="secondary"
            className="w-fit text-primary bg-primary/10 border-0 uppercase text-xs font-semibold tracking-wide"
          >
            {post.category}
          </Badge>

          <h3 className="font-heading text-base font-semibold leading-snug text-foreground text-balance
                         transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1 text-pretty">
            {post.description}
          </p>

          <div className="flex items-center gap-2 pt-2 border-t border-border text-xs text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/** Shown when no posts have been published yet. */
function EmptyState() {
  return (
    <Reveal>
      <div className="mx-auto max-w-md rounded-2xl bg-card ring-1 ring-border p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <svg
            aria-hidden="true"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
        </div>
        <h2 className="font-heading text-lg font-semibold">No articles yet</h2>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          We&apos;re working on helpful guides and insights. Check back soon or{" "}
          <Link href="/contact" className="text-primary underline underline-offset-4">
            get in touch
          </Link>
          .
        </p>
      </div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BlogPage() {
  const allPosts = getAllPosts(); // sorted newest-first
  const [featured, ...rest] = allPosts;

  return (
    <>
      {/* Structured data */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      {/* ── Hero band ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="blog-heading"
        className="relative overflow-hidden bg-gradient-to-b from-muted/60 to-background"
      >
        {/* Subtle dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[size:32px_32px]
                     bg-[image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]
                     opacity-40"
        />

        <div className="container-page relative section-py text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              From our team
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="blog-heading"
              className="font-heading mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Insights &amp; Guides
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              Practical knowledge on construction, electrical, smart-home
              technology and real estate — written by the people who do the work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Articles ───────────────────────────────────────────────── */}
      <section aria-label="Blog articles" className="container-page section-py">
        {allPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-12">
            {/* Featured / lead post */}
            <FeaturedCard post={featured} />

            {/* Rest in a responsive grid */}
            {rest.length > 0 && (
              <div>
                <Reveal>
                  <h2 className="font-heading mb-6 text-xl font-semibold tracking-tight text-foreground">
                    More articles
                  </h2>
                </Reveal>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <PostCard key={post.slug} post={post} delay={i * 0.07} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── CTA band ──────────────────────────────────────────────── */}
      <section aria-label="Contact call to action" className="bg-primary/5">
        <div className="container-page section-py">
          <Reveal className="mx-auto max-w-3xl rounded-2xl bg-card ring-1 ring-foreground/10 p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
              Our team is ready to scope, quote and deliver — from a single
              smart-home device to a full-scale renovation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-[160px] h-11">
                <Link href="/contact">Get a free quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[160px] h-11">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
