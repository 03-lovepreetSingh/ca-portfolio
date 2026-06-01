import type { Service } from "./types";

/**
 * Service catalogue. Each entry becomes a card on /services and a full SEO page
 * at /services/[slug]. The `keyword` field is the primary phrase the SEO agent
 * targets in that page's metadata + H1.
 *
 * TODO (owner): tune copy, swap images, and confirm the feature lists match
 * what you actually offer.
 */
export const services: Service[] = [
  {
    slug: "general-construction",
    title: "General Construction",
    excerpt:
      "Ground-up builds and structural work delivered on time, on budget, to code.",
    description: [
      "From foundations to finishing, our construction crews handle residential and light-commercial builds with a fixed-price discipline and an obsessive eye on the schedule.",
      "Every project is run by a dedicated site lead, backed by licensed trades and a transparent change-order process — so you always know where your build stands.",
    ],
    icon: "HardHat",
    features: [
      "New residential & commercial builds",
      "Structural framing & foundations",
      "Project management & permitting",
      "Site preparation & excavation",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    keyword: "general contractor construction services",
  },
  {
    slug: "electrical-systems",
    title: "Electrical & Wiring",
    excerpt:
      "Licensed electrical installation, upgrades and code-compliant inspections.",
    description: [
      "Our certified electricians design and install power, lighting and panel systems for new builds and retrofits, with safety and energy efficiency baked in.",
      "We handle everything from a single panel upgrade to a full commercial fit-out — fully permitted and ESA-inspected.",
    ],
    icon: "Zap",
    features: [
      "Panel upgrades & rewiring",
      "Lighting design & installation",
      "EV charger installation",
      "Code compliance & ESA inspection",
    ],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    keyword: "licensed electrician wiring services",
  },
  {
    slug: "smart-home-security",
    title: "Smart Home & Security",
    excerpt:
      "Integrated electronics — automation, networking and surveillance done right.",
    description: [
      "We turn buildings into connected, secure spaces: structured cabling, Wi-Fi that actually reaches every corner, smart lighting, climate, access control and surveillance.",
      "One integrated system, one app, one team accountable for it all.",
    ],
    icon: "Cpu",
    features: [
      "Home & building automation",
      "CCTV & access control",
      "Structured cabling & networking",
      "Audio / visual installation",
    ],
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
    keyword: "smart home automation and security installation",
  },
  {
    slug: "renovations-remodeling",
    title: "Renovations & Remodeling",
    excerpt:
      "Kitchens, basements and full-home transformations with premium finishes.",
    description: [
      "Whether it's a single room or a whole-home gut renovation, we bring design-build thinking so the result is as functional as it is beautiful.",
      "Clear timelines, dust control, and daily clean-up — renovation without the chaos.",
    ],
    icon: "Hammer",
    features: [
      "Kitchen & bathroom remodels",
      "Basement finishing",
      "Whole-home renovations",
      "Custom carpentry & millwork",
    ],
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    keyword: "home renovation and remodeling contractor",
  },
  {
    slug: "real-estate-development",
    title: "Real Estate Development",
    excerpt:
      "From land acquisition to handover — we develop properties end to end.",
    description: [
      "We identify, acquire and develop residential and mixed-use properties, managing feasibility, design, construction and sales under one roof.",
      "Investors and homeowners get a single accountable partner across the entire development lifecycle.",
    ],
    icon: "Building2",
    features: [
      "Land acquisition & feasibility",
      "Design & approvals",
      "Construction management",
      "Investment & resale strategy",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    keyword: "real estate development company",
  },
  {
    slug: "property-management",
    title: "Property Management",
    excerpt:
      "Hands-off ownership — maintenance, tenancy and upkeep handled for you.",
    description: [
      "We keep your properties running and your tenants happy: preventive maintenance, rapid repairs, inspections and full tenancy administration.",
      "Protect your asset and your time with a proactive management team.",
    ],
    icon: "KeyRound",
    features: [
      "Preventive maintenance",
      "Tenant management",
      "Emergency repairs",
      "Property inspections & reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    keyword: "property management services",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
