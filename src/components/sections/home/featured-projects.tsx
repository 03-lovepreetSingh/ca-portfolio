import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

// Dot accent colours per vertical (small visual cue only — readable text is always white)
const categoryDotStyles: Record<string, string> = {
  construction: "bg-construction",
  electronics: "bg-electronics",
  "real-estate": "bg-realestate",
};

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section aria-label="Featured Projects" className="section-py bg-muted/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          description="A selection of recent work spanning construction, electronics and real estate development across the GTA."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1} direction="up">
              <Link
                href={`/projects/${project.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`View case study: ${project.title}`}
              >
                {/* Cover image with overlay */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} — ${project.categoryLabel} project`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />

                  {/* Category badge — high-contrast for WCAG AA over any photo */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <span
                      className={cn(
                        "size-1.5 rounded-full shrink-0",
                        categoryDotStyles[project.category] ?? "bg-white/70"
                      )}
                      aria-hidden="true"
                    />
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-semibold text-foreground leading-snug">
                    {project.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.excerpt}
                  </p>

                  {/* Meta row */}
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                      {project.location}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  {/* Arrow CTA */}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View case study
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Trailing CTA */}
        <div className="mt-12 flex justify-center">
          <Reveal>
            <Button variant="outline" size="lg" className="h-11 px-8 text-sm font-semibold" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
