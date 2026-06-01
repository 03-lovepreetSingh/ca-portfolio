/**
 * Central site configuration — the single source of truth for brand, NAP
 * (Name / Address / Phone), navigation and social links.
 *
 * NOTE TO OWNER: every value marked `// TODO:` is placeholder copy. Replace
 * these with your real business details before launch — they feed both the
 * visible UI *and* the SEO structured data (LocalBusiness schema), so keeping
 * them accurate directly improves your local search ranking.
 */

export const siteConfig = {
  // --- Brand -------------------------------------------------------------
  name: "Northline Contracting", // TODO: your business name
  legalName: "Northline Contracting Ltd.", // TODO
  shortName: "Northline",
  tagline: "Electronics. Construction. Real Estate.",
  description:
    "Northline Contracting delivers integrated electronics, construction and real estate services across Canada — licensed, insured and built on two decades of craftsmanship.", // TODO

  // Canonical production URL (no trailing slash). Used for metadata, sitemap,
  // canonical tags and absolute OG image URLs.
  url: "https://www.northlinecontracting.ca", // TODO

  // --- Contact / NAP (must stay identical everywhere for local SEO) ------
  contact: {
    email: "hello@northlinecontracting.ca", // TODO
    phone: "+1 (000) 000-0000", // TODO
    phoneHref: "tel:+10000000000", // TODO
    address: {
      street: "000 Example Ave", // TODO
      city: "Toronto", // TODO
      region: "ON", // TODO (province code)
      regionName: "Ontario", // TODO
      postalCode: "M0M 0M0", // TODO
      country: "CA",
    },
    // Geo coordinates power LocalBusiness schema + map embeds. TODO: real values.
    geo: { latitude: 43.6532, longitude: -79.3832 },
    hours: [
      { days: "Mon – Fri", open: "08:00", close: "18:00" },
      { days: "Saturday", open: "09:00", close: "15:00" },
      { days: "Sunday", open: "Closed", close: "" },
    ],
  },

  // Cities / regions you serve — rendered in footer + used in areaServed schema.
  serviceAreas: [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Vaughan",
    "Markham",
    "Greater Toronto Area",
  ], // TODO

  // --- Social profiles (empty string = hidden) ---------------------------
  social: {
    facebook: "https://facebook.com/", // TODO
    instagram: "https://instagram.com/", // TODO
    linkedin: "https://linkedin.com/company/", // TODO
    x: "",
    youtube: "",
  },

  // --- Primary navigation ------------------------------------------------
  nav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ],

  // Default Open Graph image (1200x630). Replace public/og-image.jpg later.
  ogImage: "/og-image.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
