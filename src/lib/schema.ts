import { siteConfig } from "@/config/site";
import { aggregateRating } from "@/content/testimonials";
import { absoluteUrl } from "@/lib/seo";

/**
 * JSON-LD structured-data builders. Injecting these as <script type=
 * "application/ld+json"> is how you earn Google rich results — the
 * LocalBusiness block in particular drives the local "map pack" + knowledge
 * panel for a contractor. Render the output with the <JsonLd> component.
 */

/**
 * Maps siteConfig hours `days` strings to arrays of valid schema.org day names.
 * e.g. "Mon – Fri" → ["Monday","Tuesday","Wednesday","Thursday","Friday"]
 */
function toDayOfWeek(days: string): string[] {
  const normalized = days.trim();
  if (/mon\s*[–\-]\s*fri/i.test(normalized)) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  }
  if (/mon\s*[–\-]\s*sat/i.test(normalized)) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  if (/mon\s*[–\-]\s*sun/i.test(normalized)) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  }
  if (/^saturday$/i.test(normalized)) return ["Saturday"];
  if (/^sunday$/i.test(normalized)) return ["Sunday"];
  if (/^monday$/i.test(normalized)) return ["Monday"];
  if (/^tuesday$/i.test(normalized)) return ["Tuesday"];
  if (/^wednesday$/i.test(normalized)) return ["Wednesday"];
  if (/^thursday$/i.test(normalized)) return ["Thursday"];
  if (/^friday$/i.test(normalized)) return ["Friday"];
  // Fallback: return raw string so data is never silently dropped
  return [normalized];
}

export function localBusinessSchema() {
  const { contact, name, legalName, url, description } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${url}/#business`,
    name,
    legalName,
    description,
    url,
    telephone: contact.phone,
    email: contact.email,
    image: absoluteUrl("/opengraph-image.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    areaServed: siteConfig.serviceAreas.map((a) => ({
      "@type": "City",
      name: a,
    })),
    openingHoursSpecification: contact.hours
      .filter((h) => h.open !== "Closed")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: toDayOfWeek(h.days),
        opens: h.open,
        closes: h.close,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.value,
      reviewCount: aggregateRating.count,
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: siteConfig.serviceAreas,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(args: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  author: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    image: args.image || absoluteUrl("/opengraph-image.png"),
    datePublished: args.datePublished,
    author: { "@type": "Organization", name: args.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/opengraph-image.png") },
    },
    mainEntityOfPage: absoluteUrl(args.path),
  };
}
