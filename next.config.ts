import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow next/image optimisation for the external demo images. When the owner
  // swaps in their own photos (ideally hosted locally in /public or on their
  // own CDN), add the relevant host here.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    // Modern formats for better Core Web Vitals (smaller LCP images).
    formats: ["image/avif", "image/webp"],
  },

  // Surface type issues at build time rather than hiding them.
  typescript: { ignoreBuildErrors: false },

  // Slightly stronger compression + powered-by header removed.
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
