/**
 * Content domain types — the typed "schema" for the file-based CMS.
 *
 * Every piece of marketing content (services, projects, testimonials, stats)
 * is a typed object in `src/content/*`. Editing content = editing these data
 * files; no backend required. Keeping it typed means a wrong field is a
 * compile error, not a broken page.
 */

/**
 * Lucide icon name (e.g. "Hammer", "Cpu", "Building2"). Kept as a string so
 * content data stays serialisable; the UI maps the name to the actual icon
 * component via a lookup (see components/icon.tsx, created by the layout agent).
 */
export type IconName = string;

/** A high-level service category (Electronics, Construction, Real Estate...). */
export interface Service {
  /** URL-safe id used for /services/[slug]. */
  slug: string;
  title: string;
  /** Short one-liner for cards. */
  excerpt: string;
  /** Full description for the detail page (supports multiple paragraphs). */
  description: string[];
  /** Lucide icon name resolved in the UI. */
  icon: IconName;
  /** Bullet list of concrete offerings within this category. */
  features: string[];
  /** Hero / card image (external links allowed — see next.config images). */
  image: string;
  /** SEO: target keyword phrase for this service page. */
  keyword: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Which service category this project belongs to — drives the filter UI. */
  category: "electronics" | "construction" | "real-estate";
  categoryLabel: string;
  client: string;
  location: string;
  year: string;
  excerpt: string;
  /** Case-study body, paragraph by paragraph. */
  description: string[];
  /** Outcome metrics shown as highlight stats on the case study. */
  results: { label: string; value: string }[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number; // 1–5, feeds AggregateRating schema
  avatar: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: IconName;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: IconName;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  readingTime: string;
}
