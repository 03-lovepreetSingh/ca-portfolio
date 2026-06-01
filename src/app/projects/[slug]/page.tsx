import type { Metadata } from "next";
import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, User, CalendarClock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/sections/projects/project-gallery";
import { projects, getProject } from "@/content/projects";
import { cn } from "@/lib/utils";

// ─── static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// ─── metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/projects/${p.slug}`,
    image: p.coverImage,
  });
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: p.title, path: `/projects/${p.slug}` },
        ])}
      />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[50vh] overflow-hidden bg-muted"
        aria-label="Project hero"
      >
        {/* Cover image */}
        <Parallax speed={0.2} className="absolute inset-0 overflow-hidden">
          <Image
            src={p.coverImage}
            alt={`${p.title} — ${p.categoryLabel} project cover`}
            fill
            sizes="100vw"
            priority
            className="scale-110 object-cover"
          />
        </Parallax>
        {/* Gradient overlay for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        />

        {/* Hero content */}
        <div className="container-page relative z-10 flex min-h-[50vh] flex-col justify-end pb-12 pt-24">
          <Badge
            className={cn(
              "mb-4 w-fit border text-xs font-semibold uppercase tracking-wide",
              "bg-black/45 backdrop-blur-[1px] text-white border-white/20",
            )}
          >
            {p.categoryLabel}
          </Badge>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            {p.title}
          </h1>
        </div>
      </section>

      {/* ── Meta bar ───────────────────────────────────────────────────────── */}
      <section
        className="border-b border-border bg-card"
        aria-label="Project details"
      >
        <div className="container-page py-6">
          <dl className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <dt className="font-semibold text-foreground sr-only">Client</dt>
              <dd className="text-muted-foreground">{p.client}</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <dt className="font-semibold text-foreground sr-only">Location</dt>
              <dd className="text-muted-foreground">{p.location}</dd>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <dt className="font-semibold text-foreground sr-only">Year</dt>
              <dd className="text-muted-foreground">{p.year}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Case study body ────────────────────────────────────────────────── */}
      <article className="container-page section-py">
        <div className="mx-auto max-w-3xl">
          {/* Description paragraphs */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {p.description.map((para, i) => (
              <p
                key={i}
                className="mt-0 text-base leading-relaxed text-muted-foreground first:mt-0 [&+p]:mt-4"
              >
                {para}
              </p>
            ))}
          </div>

          {/* ── Result stat tiles ────────────────────────────────────────── */}
          {p.results.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Project Outcomes
              </h2>
              <div
                className={cn(
                  "mt-6 grid gap-4",
                  p.results.length === 2 && "sm:grid-cols-2",
                  p.results.length >= 3 && "grid-cols-2 sm:grid-cols-3",
                )}
              >
                {p.results.map((r) => (
                  <div
                    key={r.label}
                    className="flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
                  >
                    <span className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
                      {r.value}
                    </span>
                    <span className="mt-2 text-sm font-medium text-muted-foreground">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Gallery ──────────────────────────────────────────────────── */}
          {p.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Project Gallery
              </h2>
              <div className="mt-6">
                <ProjectGallery images={p.gallery} title={p.title} />
              </div>
            </div>
          )}

          {/* ── Navigation + CTA ─────────────────────────────────────────── */}
          <div className="mt-14 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            {/* Back link */}
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects" className="group gap-2">
                <ArrowLeft
                  className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                  aria-hidden="true"
                />
                All Projects
              </Link>
            </Button>

            {/* CTA */}
            <Button size="lg" className="h-12 px-7 text-base font-semibold" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
