import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/json-ld";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact/contact-form";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Request a free quote or get in touch — we serve the Greater Toronto Area for construction, electronics and real-estate projects.",
});

const { contact, serviceAreas } = siteConfig;
const { geo } = contact;

/**
 * Build an OpenStreetMap embed URL with a bbox centred on the business coords.
 * No API key required — uses the public OSM export endpoint.
 */
function buildMapSrc(lat: number, lon: number, delta = 0.02): string {
  const w = lon - delta;
  const s = lat - delta;
  const e = lon + delta;
  const n = lat + delta;
  return (
    `https://www.openstreetmap.org/export/embed.html` +
    `?bbox=${w}%2C${s}%2C${e}%2C${n}` +
    `&layer=mapnik` +
    `&marker=${lat}%2C${lon}`
  );
}

const mapSrc = buildMapSrc(geo.latitude, geo.longitude);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="container-page section-py">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ── LEFT COLUMN — contact info + map ─────────────────────── */}
          <div className="space-y-8">
            {/* Heading */}
            <Reveal>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-lg">
                Ready to start your next project? Fill out the form for a free
                quote or reach us directly — we serve the Greater Toronto Area
                and surrounding regions.
              </p>
            </Reveal>

            {/* NAP card */}
            <Reveal delay={0.1}>
              <div className="rounded-xl bg-card ring-1 ring-foreground/10 p-6 space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Contact Details
                </h2>

                {/* Address */}
                <address className="not-italic space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon
                      name="MapPin"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {contact.address.street}
                      <br />
                      {contact.address.city},{" "}
                      {contact.address.region}{" "}
                      {contact.address.postalCode}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Icon
                      name="Phone"
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <a
                      href={contact.phoneHref}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                    >
                      {contact.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Icon
                      name="Mail"
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </address>
              </div>
            </Reveal>

            {/* Business hours */}
            <Reveal delay={0.15}>
              <div className="rounded-xl bg-card ring-1 ring-foreground/10 p-6 space-y-4">
                <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                  <Icon
                    name="Clock"
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  Business Hours
                </h2>
                <ul className="space-y-2" aria-label="Business hours">
                  {contact.hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-foreground font-medium">
                        {h.days}
                      </span>
                      <span className="text-muted-foreground">
                        {h.open === "Closed"
                          ? "Closed"
                          : `${h.open} – ${h.close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Service areas */}
            <Reveal delay={0.2}>
              <div className="rounded-xl bg-card ring-1 ring-foreground/10 p-6 space-y-3">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Service Areas
                </h2>
                <ul
                  className="flex flex-wrap gap-2"
                  aria-label="Cities and regions we serve"
                >
                  {serviceAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* OpenStreetMap embed — no API key required */}
            <Reveal delay={0.25}>
              <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10 aspect-[4/3] w-full">
                <iframe
                  src={mapSrc}
                  title="Map showing our office location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin"
                  className="h-full w-full border-0"
                  aria-label="Interactive map — Northline Contracting office location"
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Map data &copy;{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  OpenStreetMap
                </a>{" "}
                contributors
              </p>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN — contact form ───────────────────────────── */}
          <Reveal direction="left" delay={0.05}>
            <div className="rounded-xl bg-card ring-1 ring-foreground/10 p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="mb-6 space-y-1">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  Request a Free Quote
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tell us about your project and we&apos;ll get back to you
                  within one business day.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
