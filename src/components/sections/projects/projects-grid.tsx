"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { projects, projectCategories } from "@/content/projects";
import type { Project } from "@/content/types";

// ─── filter button ────────────────────────────────────────────────────────────

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
        "min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

// ─── project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      {/* Cover image with hover zoom + gradient overlay */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={project.coverImage}
          alt={`${project.title} — ${project.categoryLabel} project in ${project.location}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
        />
        {/* Category badge over image */}
        <span className="absolute left-3 top-3">
          <Badge
            className="border border-white/20 bg-black/55 text-white backdrop-blur-sm text-xs font-semibold uppercase tracking-wide"
          >
            {project.categoryLabel}
          </Badge>
        </span>
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta: client · location · year */}
        <p className="text-xs text-muted-foreground">
          <span>{project.client}</span>
          <span aria-hidden="true" className="mx-1.5">
            &bull;
          </span>
          <span>{project.location}</span>
          <span aria-hidden="true" className="mx-1.5">
            &bull;
          </span>
          <span>{project.year}</span>
        </p>

        {/* Title */}
        <h2 className="font-heading text-xl font-bold leading-snug tracking-tight text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-primary focus-visible:outline-none focus-visible:underline"
          >
            {project.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {project.excerpt}
        </p>

        {/* CTA link */}
        <div className="mt-auto pt-2">
          <Link
            href={`/projects/${project.slug}`}
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold text-primary",
              "hover:gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:underline",
            )}
            aria-label={`Read full case study for ${project.title}`}
          >
            View Case Study
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── main grid component ──────────────────────────────────────────────────────

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      className="container-page section-py pt-0"
      aria-label="Projects portfolio"
    >
      {/* Category filter */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-10 flex flex-wrap gap-2"
      >
        {projectCategories.map((cat) => (
          <FilterButton
            key={cat.value}
            label={cat.label}
            active={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
          />
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state (shouldn't happen, but defensive) */}
      {filtered.length === 0 && (
        <p role="status" aria-live="polite" className="mt-12 text-center text-muted-foreground">
          No projects found in this category.
        </p>
      )}
    </section>
  );
}
