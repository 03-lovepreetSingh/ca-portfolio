"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar pinned to the top of the viewport that fills as the user
 * scrolls the page. Mounted once in the root layout, so it appears on every
 * page — the single highest-impact "the page is alive" cue. The spring makes
 * it glide rather than snap.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
    />
  );
}
