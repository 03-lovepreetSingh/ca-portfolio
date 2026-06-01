import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";

import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Testimonials } from "@/components/sections/testimonials";
import { stats } from "@/content/stats";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "About Us",
  path: "/about",
  description:
    "Two decades of integrated electronics, construction and real-estate expertise — licensed, insured, and built on craftsmanship.",
});

// ---------------------------------------------------------------------------
// Values data — authored inline, no separate content file needed
// ---------------------------------------------------------------------------
const values = [
  {
    icon: "ShieldCheck" as const,
    title: "Licensed & Insured",
    description:
      "Fully licensed by the Province of Ontario and WSIB-certified. You are protected from quote to handover.",
  },
  {
    icon: "CalendarClock" as const,
    title: "On-Time Delivery",
    description:
      "We build realistic schedules and hold ourselves accountable. Delays cost you money — we take that seriously.",
  },
  {
    icon: "PencilRuler" as const,
    title: "Transparent Pricing",
    description:
      "Fixed-price quotes with itemised breakdowns. No hidden fees, no surprise invoices at the end.",
  },
  {
    icon: "Users" as const,
    title: "One Accountable Team",
    description:
      "Electronics, construction, and real estate under one roof. A single point of contact from start to finish.",
  },
  {
    icon: "Hammer" as const,
    title: "Quality Craftsmanship",
    description:
      "Every nail, cable run, and finish is treated as our signature. We only hand over work we are proud of.",
  },
  {
    icon: "MapPin" as const,
    title: "Local Expertise",
    description:
      "Born and built in the Greater Toronto Area. We know the permits, the suppliers, and the communities we serve.",
  },
] as const;

// ---------------------------------------------------------------------------
// Stats strip — self-contained, no count-up animation required
// ---------------------------------------------------------------------------
function StatsStrip() {
  return (
    <section
      aria-label="Company statistics"
      className="bg-primary py-12 md:py-16"
    >
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} as="li" delay={i * 0.1} direction="up">
              <div className="flex flex-col items-center gap-2 text-center">
                <Icon
                  name={stat.icon}
                  className="size-8 text-primary-foreground/80"
                  aria-hidden="true"
                />
                <p
                  className="font-heading text-4xl font-bold text-primary-foreground"
                  aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""} ${stat.label}`}
                >
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-sm font-medium text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* ------------------------------------------------------------------ */}
      {/* (a) Story / Intro — two-column with hero image                      */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-labelledby="about-heading"
        className="section-py bg-background"
      >
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Copy column */}
            <div>
              <Reveal direction="left">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Our Story
                </span>
                {/* H1 — one per page */}
                <h1
                  id="about-heading"
                  className="font-heading mt-2 text-4xl font-bold tracking-tight text-balance sm:text-5xl"
                >
                  Two Decades of Building What Matters
                </h1>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Northline Contracting was founded on a simple conviction: that
                  construction, electronics and property management belong under
                  one accountable roof. For over twenty years we have served
                  homeowners, investors and commercial operators across the
                  Greater Toronto Area — delivering projects that perform as
                  beautifully as they look.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Our integrated model eliminates the finger-pointing that plagues
                  multi-contractor projects. When we take on a job — whether it is
                  a heritage kitchen renovation, a commercial smart-building fit-out,
                  or a multi-unit rental turnaround — you get one team, one schedule,
                  and one promise.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="h-12 px-7 text-base font-semibold"
                    asChild
                  >
                    <Link href="/contact">Start a Conversation</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-7 text-base font-semibold"
                    asChild
                  >
                    <Link href="/projects">See Our Work</Link>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Image column */}
            <Reveal direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Parallax speed={0.18} className="absolute inset-0 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                    alt="Northline Contracting team reviewing architectural plans on a construction site"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="scale-110 object-cover"
                    priority
                  />
                </Parallax>
                {/* Subtle gradient for text legibility if ever overlaid */}
                <div
                  className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* (b) Why Choose Us — values grid                                      */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="Why choose us"
        className="section-py bg-muted/40"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Northline"
            title="Why Choose Us"
            description="Six principles that define how we operate — and why our clients keep coming back."
          />

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} as="li" delay={i * 0.1} direction="up">
                <article
                  className={cn(
                    "group flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6",
                    "transition-shadow hover:shadow-md",
                    "ring-1 ring-foreground/5",
                  )}
                >
                  {/* Icon badge */}
                  <div
                    className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15"
                    aria-hidden="true"
                  >
                    <Icon
                      name={value.icon}
                      className="size-6 text-primary"
                    />
                  </div>

                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* (c) Stats strip                                                       */}
      {/* ------------------------------------------------------------------ */}
      <StatsStrip />

      {/* ------------------------------------------------------------------ */}
      {/* (d) Process timeline                                                  */}
      {/* ------------------------------------------------------------------ */}
      <ProcessTimeline />

      {/* ------------------------------------------------------------------ */}
      {/* (e) Testimonials carousel                                             */}
      {/* ------------------------------------------------------------------ */}
      <Testimonials />

      {/* ------------------------------------------------------------------ */}
      {/* (f) CTA band                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section
        aria-label="Call to action — contact us"
        className="section-py bg-primary"
      >
        <div className="container-page">
          <Reveal direction="up">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="font-heading max-w-2xl text-3xl font-bold tracking-tight text-primary-foreground text-balance sm:text-4xl">
                Ready to Build Something Extraordinary?
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-primary-foreground/80">
                Whether it is a renovation, a smart-building upgrade, or a
                full development — let us show you what a single, accountable
                team can achieve.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-12 px-8 text-base font-semibold"
                  asChild
                >
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "h-12 px-8 text-base font-semibold",
                    "border-primary-foreground/40 bg-transparent text-primary-foreground",
                    "hover:bg-primary-foreground/10",
                  )}
                  asChild
                >
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
