import Link from "next/link";
import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { services, getService } from "@/content/services";

/* ── Static generation ─────────────────────────────────────────────── */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* ── Per-page metadata ──────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.title,
    description: s.excerpt,
    path: `/services/${s.slug}`,
    keywords: [s.keyword],
    image: s.image,
  });
}

/* ── Page ────────────────────────────────────────────────────────────── */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const relatedServices = services.filter((r) => r.slug !== s.slug);

  return (
    <>
      {/* Structured data */}
      <JsonLd
        data={serviceSchema({
          name: s.title,
          description: s.excerpt,
          path: `/services/${s.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ])}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="service-heading" className="relative min-h-[420px] sm:min-h-[520px] flex items-end overflow-hidden">
        {/* Background image with subtle scroll parallax */}
        <Parallax speed={0.2} className="absolute inset-0 overflow-hidden">
          <Image
            src={s.image}
            alt={`${s.title} — ${siteConfig.name}`}
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </Parallax>
        {/* Dark overlay so text is legible on any photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20"
        />
        {/* Content */}
        <div className="container-page relative pb-12 pt-32 sm:pb-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Icon name="ArrowRight" className="size-3.5 shrink-0" aria-hidden="true" />
              <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
              <Icon name="ArrowRight" className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="text-foreground font-medium" aria-current="page">{s.title}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg"
              >
                <Icon name={s.icon} className="size-6" />
              </span>
              <h1
                id="service-heading"
                className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {s.title}
              </h1>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              {s.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Main body ─────────────────────────────────────────────────── */}
      <div className="container-page section-py">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">

          {/* Description — 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                About this service
              </h2>
            </Reveal>
            {s.description.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {/* Process / why choose us */}
            <Reveal delay={0.18}>
              <div className="mt-8 rounded-xl bg-muted/60 ring-1 ring-foreground/10 p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold tracking-tight mb-4">
                  Why choose Northline?
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2" aria-label="Our advantages">
                  {[
                    { icon: "ShieldCheck", label: "Licensed & fully insured" },
                    { icon: "CalendarClock", label: "On-time, on-budget delivery" },
                    { icon: "Users", label: "Dedicated site lead & team" },
                    { icon: "Wrench", label: "Transparent change-order process" },
                  ].map(({ icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm font-medium">
                      <span
                        aria-hidden="true"
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                      >
                        <Icon name={icon} className="size-4" />
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Features sidebar — 1/3 width on large screens */}
          <aside aria-label={`${s.title} features`}>
            <Reveal>
              <div className="sticky top-24 rounded-xl bg-card ring-1 ring-foreground/10 p-6">
                <h2 className="font-heading text-lg font-bold tracking-tight mb-4">
                  What&apos;s included
                </h2>
                <ul className="space-y-3">
                  {s.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Icon
                        name="CheckCircle2"
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Sidebar CTA */}
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground text-pretty">
                    Ready to discuss your project? We&apos;ll get back to you within one business day.
                  </p>
                  <Button asChild className="w-full h-11">
                    <Link href="/contact">
                      Get a free quote
                      <Icon name="ArrowRight" className="ml-2 size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full h-11">
                    <a href={siteConfig.contact.phoneHref}>
                      <Icon name="Phone" className="mr-2 size-4" aria-hidden="true" />
                      Call us now
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* ── Full-width CTA band ───────────────────────────────────────── */}
      <section aria-label="Project enquiry" className="bg-primary text-primary-foreground">
        <div className="container-page section-py text-center">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Start your {s.title.toLowerCase()} project today
            </h2>
            <p className="mt-3 mx-auto max-w-xl text-base leading-relaxed opacity-90 text-pretty">
              Our team is ready to scope the work, answer your questions and give
              you a detailed, no-obligation quote.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="min-w-[160px] h-11"
              >
                <Link href="/contact">
                  Contact us
                  <Icon name="ArrowUpRight" className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-w-[160px] h-11 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={siteConfig.contact.phoneHref}>
                  <Icon name="Phone" className="mr-2 size-4" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related services ─────────────────────────────────────────── */}
      <section aria-labelledby="related-heading" className="container-page section-py">
        <Reveal>
          <h2
            id="related-heading"
            className="font-heading text-2xl font-bold tracking-tight mb-8 text-center sm:text-3xl"
          >
            Explore our other services
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {relatedServices.map((r, i) => (
            <Reveal key={r.slug} as="li" delay={i * 0.06}>
              <Link
                href={`/services/${r.slug}`}
                className={[
                  "group flex items-center gap-4 rounded-xl p-4",
                  "bg-card ring-1 ring-foreground/10 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <Icon name={r.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    {r.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {r.excerpt}
                  </p>
                </div>
                <Icon
                  name="ArrowRight"
                  className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
