import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Centralised metadata factory. Every page calls `buildMetadata(...)` from its
 * `generateMetadata`/`metadata` export so titles, canonicals, Open Graph and
 * Twitter cards are always consistent and absolute-URL correct.
 *
 * SEO note: a correct canonical URL per page prevents duplicate-content
 * dilution, and absolute OG image URLs are required for link previews to work.
 */

const SITE_URL = siteConfig.url;

interface BuildMetadataArgs {
  title?: string;
  description?: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path?: string;
  /** Absolute or root-relative image; defaults to the site OG image. */
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  /** Set true on thin/utility pages you don't want indexed. */
  noindex?: boolean;
  publishedTime?: string;
}

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  keywords,
  type = "website",
  noindex = false,
  publishedTime,
}: BuildMetadataArgs = {}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const ogImage = image
    ? image.startsWith("http") ? image : absoluteUrl(image)
    : undefined;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_CA",
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }] }
        : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
