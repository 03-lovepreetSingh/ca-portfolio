import type { Project } from "./types";

/**
 * Portfolio / case studies. Each becomes a card on /projects (filterable by
 * category) and a full case study at /projects/[slug].
 *
 * TODO (owner): replace with your real projects, photos and outcome metrics.
 */
export const projects: Project[] = [
  {
    slug: "lakeshore-custom-home",
    title: "Lakeshore Custom Home",
    category: "construction",
    categoryLabel: "Construction",
    client: "Private Residence",
    location: "Oakville, ON",
    year: "2024",
    excerpt:
      "A 4,200 sq ft modern custom home built from foundation to handover in 11 months.",
    description: [
      "The clients wanted a contemporary lakeside home that maximised natural light and frame the water views, without sacrificing energy efficiency.",
      "We delivered a fully custom build with a high-performance envelope, integrated smart systems and premium finishes — completed two weeks ahead of schedule.",
    ],
    results: [
      { label: "Build time", value: "11 mo" },
      { label: "Square footage", value: "4,200" },
      { label: "Energy rating", value: "A+" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "metro-office-automation",
    title: "Metro Office Smart Fit-Out",
    category: "electronics",
    categoryLabel: "Electronics",
    client: "Metro Holdings",
    location: "Toronto, ON",
    year: "2024",
    excerpt:
      "Full building automation, access control and structured cabling for a 3-floor office.",
    description: [
      "A growing tech firm needed a connected workplace: secure access, meeting-room AV, and a network that scales.",
      "We deployed an integrated automation stack — lighting, climate, access and surveillance — managed from a single dashboard.",
    ],
    results: [
      { label: "Floors", value: "3" },
      { label: "Energy saved", value: "28%" },
      { label: "Access points", value: "42" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "riverside-condo-development",
    title: "Riverside Condo Development",
    category: "real-estate",
    categoryLabel: "Real Estate",
    client: "Northline Development",
    location: "Mississauga, ON",
    year: "2023",
    excerpt:
      "A 24-unit boutique condominium taken from raw land to sold-out in 18 months.",
    description: [
      "We led this mixed-use development end to end — feasibility, approvals, construction and sales.",
      "All 24 units were pre-sold before completion, delivering strong returns for our investment partners.",
    ],
    results: [
      { label: "Units", value: "24" },
      { label: "Pre-sold", value: "100%" },
      { label: "Timeline", value: "18 mo" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },
  {
    slug: "heritage-kitchen-renovation",
    title: "Heritage Home Kitchen Renovation",
    category: "construction",
    categoryLabel: "Renovation",
    client: "Private Residence",
    location: "Toronto, ON",
    year: "2023",
    excerpt:
      "A full gut renovation of a century-home kitchen blending heritage character with modern function.",
    description: [
      "Preserving the home's heritage detailing while delivering a modern, open-concept kitchen required careful structural and finishing work.",
      "Custom millwork, integrated appliances and refreshed wiring transformed the heart of the home.",
    ],
    results: [
      { label: "Duration", value: "6 wks" },
      { label: "Custom cabinets", value: "100%" },
      { label: "Budget", value: "On target" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    slug: "warehouse-electrical-upgrade",
    title: "Warehouse Electrical Upgrade",
    category: "electronics",
    categoryLabel: "Electrical",
    client: "LogiCorp",
    location: "Brampton, ON",
    year: "2023",
    excerpt:
      "A complete electrical and lighting overhaul for a 60,000 sq ft logistics facility.",
    description: [
      "Aging infrastructure was a safety risk and an energy drain. We re-engineered the distribution and switched the facility to high-efficiency LED.",
      "The upgrade cut lighting energy use dramatically while bringing the facility fully up to code.",
    ],
    results: [
      { label: "Area", value: "60k sqft" },
      { label: "Energy cut", value: "41%" },
      { label: "Downtime", value: "Zero" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    slug: "suburban-rental-portfolio",
    title: "Suburban Rental Portfolio",
    category: "real-estate",
    categoryLabel: "Property Management",
    client: "Private Investors",
    location: "Greater Toronto Area",
    year: "2022",
    excerpt:
      "Acquisition, renovation and ongoing management of a 12-property rental portfolio.",
    description: [
      "We sourced and renovated under-valued properties, then took over full management — maintenance, tenancy and reporting.",
      "Occupancy has stayed above 98% with a proactive maintenance program protecting every asset.",
    ],
    results: [
      { label: "Properties", value: "12" },
      { label: "Occupancy", value: "98%" },
      { label: "ROI lift", value: "+22%" },
    ],
    coverImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "construction", label: "Construction" },
  { value: "electronics", label: "Electronics" },
  { value: "real-estate", label: "Real Estate" },
] as const;
