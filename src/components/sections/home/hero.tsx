"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CalendarClock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/parallax";
import { siteConfig } from "@/config/site";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene"),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse rounded-full bg-primary/5" />,
  }
);

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[88vh] items-center overflow-hidden bg-background lg:min-h-[88vh]"
    >
      {/* Background: LCP-optimised Next.js Image with subtle scroll parallax */}
      <Parallax speed={0.25} className="absolute inset-0 -z-20">
        <Image
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=60"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover"
        />
      </Parallax>
      {/* Overlay — lightened so photo shows in light mode */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/85 to-background/30"
        aria-hidden="true"
      />
      {/* Warm orange brand glow */}
      <div
        className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-primary/20 blur-[120px]"
        aria-hidden="true"
      />

      {/* 3D scene: positioned right column on large screens, subtle bg on mobile */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden="true"
      >
        <HeroScene />
      </div>

      {/* Content */}
      <div className="container-page relative z-10 py-20 lg:py-28">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            Licensed &amp; Insured &bull; 20+ Years Experience
          </p>

          {/* H1 — one per page */}
          <h1 id="hero-heading" className="font-heading text-4xl font-bold leading-tight tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
            Building, Powering &amp; Developing{" "}
            <span className="text-primary font-extrabold">Canada&rsquo;s Spaces</span>
          </h1>

          {/* Lead */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {siteConfig.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-12 px-7 text-base font-semibold"
              asChild
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-7 text-base font-semibold"
              asChild
            >
              <Link href="/projects">View Our Work</Link>
            </Button>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarClock className="size-4 text-primary" aria-hidden="true" />
              <strong className="text-foreground">20+</strong>&nbsp;Years Serving the GTA
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
              <strong className="text-foreground">450+</strong>&nbsp;Projects Delivered
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
              <strong className="text-foreground">WSIB</strong>&nbsp;Certified &amp; Fully Insured
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
