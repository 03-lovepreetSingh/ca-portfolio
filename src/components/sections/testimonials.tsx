"use client";

import Image from "next/image";
import { testimonials, aggregateRating } from "@/content/testimonials";
import type { Testimonial } from "@/content/types";
import { Icon } from "@/components/icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Renders 1–5 filled/empty star icons for a given rating. */
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of ${max} stars`}
      role="img"
    >
      {Array.from({ length: max }, (_, i) => (
        <Icon
          key={i}
          name="Star"
          className={cn(
            "size-4 shrink-0",
            i < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Single testimonial card — rendered inside each carousel slide. */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, role, company, quote, rating, avatar } = testimonial;

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-5 pt-6">
        {/* Quote icon + text */}
        <div className="flex-1">
          <Icon
            name="Quote"
            className="mb-3 size-8 text-primary/40"
            aria-hidden="true"
          />
          <blockquote>
            <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="flex items-center gap-4 border-t border-border pt-4">
          {/* Avatar */}
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
            <Image
              src={avatar}
              alt={`Photo of ${name}`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          {/* Name / role / stars */}
          <div className="min-w-0 flex-1">
            <p className="font-heading truncate text-sm font-semibold">
              {name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {role}
              {company ? ` · ${company}` : ""}
            </p>
            <div className="mt-1">
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Testimonials carousel — client component so Embla's swipe/wheel handlers
 * can attach to the DOM after hydration. Receives data from the server-rendered
 * About page which imports from content/testimonials.ts.
 */
export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-py bg-background"
    >
      <div className="container-page">
        {/* Heading row with aggregate rating */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Client Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            What Our Clients Say
          </h2>
          {/* Aggregate rating badge */}
          <div
            className="mt-1 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
            aria-label={`Average rating: ${aggregateRating.value} out of 5 from ${aggregateRating.count} reviews`}
          >
            <StarRating rating={Math.round(aggregateRating.value)} />
            <span className="text-sm font-semibold text-foreground">
              {aggregateRating.value}
            </span>
            <span className="text-sm text-muted-foreground">
              from {aggregateRating.count} reviews
            </span>
          </div>
        </div>

        {/* Carousel — embla handles touch/swipe natively */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-5xl px-12 sm:px-14"
          aria-label="Client testimonials"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard testimonial={t} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Accessible prev/next controls; positioned outside the viewport overflow */}
          <CarouselPrevious
            aria-label="Show previous testimonial"
            className="size-11"
          />
          <CarouselNext
            aria-label="Show next testimonial"
            className="size-11"
          />
        </Carousel>
      </div>
    </section>
  );
}
