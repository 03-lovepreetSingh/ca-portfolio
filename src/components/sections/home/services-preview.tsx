import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

export function ServicesPreview() {
  return (
    <section aria-label="Our Services" className="section-py bg-muted/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Services"
          description="From ground-up construction to smart-home technology and real estate development — all under one accountable roof."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.07} direction="up">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Learn more about ${service.title}`}
              >
                {/* Icon tile */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={service.icon} className="size-6" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.excerpt}
                </p>

                {/* CTA */}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-gap group-hover:gap-2">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Trailing CTA */}
        <div className="mt-12 flex justify-center">
          <Reveal>
            <Button variant="outline" size="lg" className="h-11 px-8 text-sm font-semibold" asChild>
              <Link href="/services">
                All Services
                <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
