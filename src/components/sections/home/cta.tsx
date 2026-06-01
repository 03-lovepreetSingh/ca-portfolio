import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HomeCTA() {
  return (
    <section aria-label="Call to Action" className="section-py bg-muted/40">
      <div className="container-page">
        <Reveal direction="up">
          <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">
            {/* Decorative glow */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/3 translate-x-1/3 rounded-full bg-white/10 blur-[80px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/3 -translate-x-1/4 rounded-full bg-black/10 blur-[60px]"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
                Ready to Start Your Project?
              </p>

              <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Let&rsquo;s Build Something Together
              </h2>

              <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                Get a no-obligation quote from our team — licensed, insured, and
                committed to delivering on time and on budget across the GTA.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="h-12 bg-primary-foreground px-7 text-base font-semibold text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link href="/contact">
                    Get a Free Quote
                    <ArrowRight className="ml-1.5 size-4" aria-hidden="true" />
                  </Link>
                </Button>

                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex h-12 items-center gap-2 rounded-lg border border-primary-foreground/30 px-7 text-base font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/60 hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
                  aria-label={`Call us at ${siteConfig.contact.phone}`}
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
