import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/content/types";

interface ServiceCardProps {
  service: Service;
  delay?: number;
  className?: string;
}

/**
 * Premium service card used on /services. Shows the hero image, icon,
 * title, excerpt and top features. Animates in with a staggered Reveal.
 * Server component — no interactivity needed.
 */
export function ServiceCard({ service, delay = 0, className }: ServiceCardProps) {
  const { slug, title, excerpt, icon, features, image } = service;

  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <Link
        href={`/services/${slug}`}
        aria-label={`Learn more about ${title}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-xl",
          "bg-card text-card-foreground ring-1 ring-foreground/10",
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        {/* Image */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={`${title} — Northline Contracting`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
          {/* Icon badge */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md"
          >
            <Icon name={icon} className="size-5" />
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h2 className="font-heading text-lg font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>

          {/* Feature list — top 3 only to keep cards compact */}
          <ul className="mt-auto space-y-1.5 pt-2" aria-label={`${title} features`}>
            {features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon
                  name="CheckCircle2"
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA arrow */}
          <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary">
            Explore service
            <Icon
              name="ArrowRight"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
