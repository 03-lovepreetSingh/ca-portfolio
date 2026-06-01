import type { Testimonial } from "./types";

/**
 * Client testimonials. The `rating` values are aggregated into an
 * AggregateRating JSON-LD schema by the SEO layer, which can earn star
 * snippets in Google results. TODO (owner): use real, attributable reviews.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    role: "Homeowner",
    company: "Oakville",
    quote:
      "Northline built our dream home and made the whole process feel effortless. They hit every deadline and the craftsmanship is outstanding.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Operations Director",
    company: "Metro Holdings",
    quote:
      "The smart office fit-out exceeded expectations. One team handled cabling, security and automation flawlessly — and it all just works.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "t3",
    name: "Priya Sharma",
    role: "Real Estate Investor",
    company: "Private Portfolio",
    quote:
      "They took our rental portfolio from a headache to hands-off. Occupancy is up, maintenance is proactive, and reporting is crystal clear.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "t4",
    name: "James O'Connor",
    role: "Facilities Manager",
    company: "LogiCorp",
    quote:
      "The electrical upgrade was completed with zero downtime and cut our energy bills significantly. Professional from quote to handover.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "t5",
    name: "Emily Tremblay",
    role: "Homeowner",
    company: "Toronto",
    quote:
      "Our heritage kitchen renovation is stunning. They respected the character of the home while making it completely modern and functional.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

/** Average rating, rounded to one decimal — used by AggregateRating schema. */
export const aggregateRating = {
  value:
    Math.round(
      (testimonials.reduce((sum, t) => sum + t.rating, 0) /
        testimonials.length) *
        10,
    ) / 10,
  count: testimonials.length,
};
