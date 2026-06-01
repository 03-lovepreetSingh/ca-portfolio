import { processSteps } from "@/content/stats";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

/** Delay increments for staggered reveal — one quarter-second step per card. */
const STEP_DELAY = 0.15;

export function ProcessTimeline() {
  return (
    <section aria-label="Our process" className="section-py bg-muted/30">
      <div className="container-page">
        <SectionHeading
          eyebrow="How We Work"
          title="Our Process"
          description="From first call to final handover — a transparent, four-step journey that keeps you informed and confident every step of the way."
        />

        {/* Timeline layout: vertical on mobile, horizontal on lg */}
        <div className="relative mt-14">
          {/* Horizontal connector line (lg+) */}
          <div
            aria-hidden="true"
            className="absolute top-10 hidden h-0.5 w-full bg-border lg:block"
          />

          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.step}
                as="li"
                direction="up"
                delay={index * STEP_DELAY}
                className="relative flex flex-col"
              >
                {/* Vertical connector line (mobile) */}
                {index < processSteps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-10 top-20 h-[calc(100%_-_1.25rem)] w-0.5 bg-border lg:hidden"
                  />
                )}

                {/* Step header: number badge + icon */}
                <div className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-3">
                  {/* Numbered badge with icon overlay — sits on top of the line */}
                  <div className="relative z-10 shrink-0">
                    {/* Outer ring */}
                    <div
                      className={cn(
                        "flex size-20 items-center justify-center rounded-full",
                        "bg-background ring-2 ring-border",
                        "lg:mx-auto",
                      )}
                    >
                      {/* Inner filled circle */}
                      <div className="flex size-14 flex-col items-center justify-center rounded-full bg-primary/10">
                        <Icon
                          name={step.icon}
                          className="size-6 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Step number chip */}
                    <span
                      aria-label={`Step ${step.step}`}
                      className={cn(
                        "absolute -right-1 -top-1 flex size-6 items-center justify-center",
                        "rounded-full bg-primary text-xs font-bold text-primary-foreground",
                        "ring-2 ring-background",
                      )}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Title next to badge on mobile, below on desktop */}
                  <div className="pt-1 lg:pt-0 lg:text-center">
                    <h3
                      className={cn(
                        "font-heading text-lg font-semibold leading-snug",
                        "lg:mt-3",
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    "mt-3 pl-[6.25rem] text-sm leading-relaxed text-muted-foreground",
                    "lg:pl-0 lg:text-center",
                  )}
                >
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
