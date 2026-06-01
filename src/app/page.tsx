import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/sections/home/hero";
import { ServicesPreview } from "@/components/sections/home/services-preview";
import { Stats } from "@/components/sections/home/stats";
import { FeaturedProjects } from "@/components/sections/home/featured-projects";
import { TestimonialsPreview } from "@/components/sections/home/testimonials-preview";
import { HomeCTA } from "@/components/sections/home/cta";

export const metadata = buildMetadata({
  path: "/",
  title: undefined,
  description: siteConfig.description,
  keywords: [
    "contractor",
    "construction",
    "electrical",
    "smart home",
    "real estate",
    "renovation",
    "Toronto",
    "GTA",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Stats />
      <FeaturedProjects />
      <TestimonialsPreview />
      <HomeCTA />
    </>
  );
}
