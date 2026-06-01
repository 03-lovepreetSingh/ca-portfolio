"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Scroll-linked parallax wrapper. As its container scrolls through the
 * viewport, the children drift vertically, giving depth to hero/cover images
 * and decorative shapes.
 *
 * Safe usage over images: put <Parallax> around an absolutely-positioned,
 * slightly over-scaled (e.g. scale-110) image inside an `overflow-hidden`
 * parent so the drift never exposes empty edges.
 *
 * Honours prefers-reduced-motion (renders static). `speed` is the fraction of
 * the scroll distance to travel: positive = moves up as you scroll down.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduce ? undefined : { y }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
