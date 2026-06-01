import Link from "next/link";
import type { Metadata } from "next";

import { buildMetadata, absoluteUrl } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { services } from "@/content/services";
import { ServiceCard } from "@/components/sections/services/service-card";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  path: "/services",
  description:
    "Electronics, construction, electrical, renovations, real estate development and property management — full-service contracting across the GTA.",
  keywords: services.map((s) => s.keyword),
});

/** ItemList schema — helps Google show a rich carousel of service pages. */
function serviceItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Northline Contracting Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: absoluteUrl(`/services/${s.slug}`),
    })),
  };
}

export default function ServicesPage() {
  return (
    <>
      {/* Structured data */}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd data={serviceItemListSchema()} />

      {/* ── Header band ───────────────────────────────────────────── */}
      <section
        aria-labelledby="services-heading"
        className="relative overflow-hidden bg-gradient-to-b from-muted/60 to-background"
      >
        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[size:32px_32px] bg-[image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] opacity-40"
        />
        <div className="container-page relative section-py text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              What we do
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="services-heading"
              className="font-heading mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Our Services
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              From a single electrical panel to a full real estate development,
              Northline Contracting delivers every trade under one roof — licensed,
              insured, and accountable for results across the Greater Toronto Area.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────────── */}
      <section
        aria-label="Service catalogue"
        className="container-page section-py"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              delay={i * 0.07}
            />
          ))}
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────────── */}
      <section aria-label="Contact call to action" className="bg-primary/5">
        <div className="container-page section-py">
          <Reveal className="mx-auto max-w-3xl rounded-2xl bg-card ring-1 ring-foreground/10 p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to start your project?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
              Talk to our team about your requirements — we&apos;ll scope the work,
              give you a transparent quote and get moving fast.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="min-w-[160px] h-11">
                <Link href="/contact">
                  Get a free quote
                  <Icon name="ArrowRight" className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[160px] h-11">
                <a href={siteConfig.contact.phoneHref}>
                  <Icon name="Phone" className="mr-2 size-4" aria-hidden="true" />
                  Call us now
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
