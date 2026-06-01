"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Scroll-into-view reveal wrapper. Coders wrap sections/cards in <Reveal> for a
 * consistent fade-up entrance. It honours `prefers-reduced-motion` — if the
 * user has reduced motion enabled, content appears instantly (an accessibility
 * requirement, and motion-safe animation is also a Lighthouse best practice).
 *
 * SSR safety: `initial` is set to `false` until after hydration so the server
 * HTML renders content fully visible. Only after mount (and when the user hasn't
 * requested reduced motion) do we apply the fade-up on scroll.
 */
type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

type MotionTagKey = "div" | "section" | "li" | "span" | "article" | "ul";

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: MotionTagKey;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // `motion[as]` resolves to a union of motion components whose combined props
  // type collapses `children` to `never`; cast to an explicit component type
  // that declares children so JSX accepts our props + children cleanly.
  const MotionTag = motion[as] as unknown as React.ComponentType<{
    children?: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }>;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      // A gentle scale-up alongside the slide makes the entrance feel more
      // alive without being distracting. Skipped under reduced motion.
      ...(reduce ? {} : { ...offset[direction], scale: 0.97 }),
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial={mounted && !reduce ? "hidden" : false}
      whileInView="show"
      viewport={{ once: true, margin: reduce ? "0px" : "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
