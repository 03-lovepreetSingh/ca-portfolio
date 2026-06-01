import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/testimonials";

export function TestimonialsPreview() {
  const displayed = testimonials.slice(0, 3);

  return (
    <section aria-label="Client Testimonials" className="section-py bg-background">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Real feedback from homeowners, developers and business owners across the Greater Toronto Area."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1} direction="up">
              <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                {/* Stars */}
                <div className="mb-4 flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="size-4 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="mb-3 size-6 text-primary/30" aria-hidden="true" />

                {/* Quote text */}
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <footer className="mt-6 flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    width={44}
                    height={44}
                    className="size-11 rounded-full object-cover ring-2 ring-border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}
                      {t.company ? ` — ${t.company}` : ""}
                    </p>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
