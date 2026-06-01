import Link from "next/link";

import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { Separator } from "@/components/ui/separator";

// ── Inline SVG social icons (lucide-react v1 has no brand icons) ─────────────

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatAddress() {
  const { street, city, region, postalCode } = siteConfig.contact.address;
  return { line1: street, line2: `${city}, ${region}  ${postalCode}` };
}

// ── Footer component ─────────────────────────────────────────────────────────

export function SiteFooter() {
  const addr = formatAddress();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      key: "facebook",
      href: siteConfig.social.facebook,
      label: "Follow us on Facebook",
      Icon: FacebookIcon,
    },
    {
      key: "instagram",
      href: siteConfig.social.instagram,
      label: "Follow us on Instagram",
      Icon: InstagramIcon,
    },
    {
      key: "linkedin",
      href: siteConfig.social.linkedin,
      label: "Connect on LinkedIn",
      Icon: LinkedInIcon,
    },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="border-t bg-muted/30" aria-label="Site footer">
      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="container-page section-py">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* (a) Brand + blurb + social ─────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <div>
              <Link
                href="/"
                className="font-heading text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {siteConfig.name}
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xs">
                {siteConfig.description}
              </p>
            </div>

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3" role="list" aria-label="Social media links">
                {socialLinks.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    role="listitem"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* (b) Quick links ─────────────────────────────────────────────── */}
          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* (c) Services column ─────────────────────────────────────────── */}
          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* (d) Contact block ───────────────────────────────────────────── */}
          <div>
            <h3 className="font-heading mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>

            <address className="not-italic flex flex-col gap-3 text-sm text-muted-foreground">
              {/* NAP */}
              <div>
                <p>{addr.line1}</p>
                <p>{addr.line2}</p>
              </div>

              <a
                href={siteConfig.contact.phoneHref}
                className="min-h-[44px] inline-flex items-center transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {siteConfig.contact.phone}
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="min-h-[44px] inline-flex items-center transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm break-all"
              >
                {siteConfig.contact.email}
              </a>

              {/* Hours */}
              <div className="mt-1">
                <p className="mb-1.5 font-medium text-foreground">Hours</p>
                <ul className="flex flex-col gap-1" role="list">
                  {siteConfig.contact.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4">
                      <span>{h.days}</span>
                      <span className="text-right">
                        {h.close ? `${h.open} – ${h.close}` : h.open}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </address>

            {/* Service areas */}
            <div className="mt-4 text-xs text-muted-foreground break-words">
              <span className="font-medium text-foreground">Serving: </span>
              {siteConfig.serviceAreas.join(" · ")}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <Separator />
      <div className="container-page flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          &copy; <span suppressHydrationWarning>{currentYear}</span> {siteConfig.legalName}. All rights reserved.
        </p>
        <a
          href="#main"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}
