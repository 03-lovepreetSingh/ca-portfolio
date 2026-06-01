import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { ProjectsGrid } from "@/components/sections/projects/projects-grid";

export const metadata = buildMetadata({
  title: "Projects",
  path: "/projects",
  description:
    "Explore our portfolio of construction, electronics and real-estate projects across the Greater Toronto Area.",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      {/* Page header */}
      <section className="container-page section-py pb-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Work
          </p>
          <h1 className="font-heading mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Our Projects
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            From custom homes and commercial fit-outs to real-estate
            developments, every project here is built on the same commitment —
            on time, on budget, and built to last.
          </p>
        </div>
      </section>

      {/* Client filter + card grid */}
      <ProjectsGrid />
    </>
  );
}
