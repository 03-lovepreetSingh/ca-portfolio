"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Icon } from "@/components/icon";
import { stats } from "@/content/stats";

function useCountUp(
  target: number,
  duration: number,
  start: boolean,
  reducedMotion: boolean
): number {
  const [count, setCount] = useState(reducedMotion ? target : 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration, reducedMotion]);

  return count;
}

function StatCard({
  stat,
  inView,
  reducedMotion,
  index,
}: {
  stat: (typeof stats)[number];
  inView: boolean;
  reducedMotion: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, 1200 + index * 150, inView, reducedMotion);

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-3 py-6 sm:px-6 sm:py-8 text-center shadow-sm">
      {/* Icon */}
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon name={stat.icon} className="size-5" aria-hidden="true" />
      </div>

      {/* Number */}
      <p className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:text-5xl" aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`}>
        {stat.prefix}
        {count}
        {stat.suffix}
      </p>

      {/* Label */}
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Detect prefers-reduced-motion — lazy-initialised to avoid a synchronous
  // setState in the effect body.
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Company statistics"
      className="section-py bg-background"
    >
      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              inView={inView}
              reducedMotion={reducedMotion}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
