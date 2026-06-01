import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Next.js App Router Web App Manifest generator.
 *
 * Served automatically at /manifest.webmanifest (linked from <head>
 * by Next.js). Enables "Add to Home Screen" on mobile browsers and
 * unlocks PWA display modes.
 *
 * NOTE TO OWNER: The icons array currently references /favicon.ico (16–48 px)
 * and /icon.png (192 px). You should also add a 512×512 px PNG at
 * /public/icon-512.png and add it to the icons array below — this is
 * required for a full PWA splash screen on Android and for Google's
 * installability criteria. Ideal sizes: 192×192 and 512×512.
 *
 * Colors:
 *   background_color — dark slate (#0f172a) matches the site's dark theme
 *                      so the splash screen blends in while loading.
 *   theme_color      — brand orange (#ea580c) tints the Android status bar
 *                      and Chrome's tab strip.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#ea580c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        // NOTE TO OWNER: add a 192×192 PNG at /public/icon.png
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      // TODO (owner): uncomment once you add the file:
      // {
      //   src: "/icon-512.png",
      //   sizes: "512x512",
      //   type: "image/png",
      //   purpose: "maskable",
      // },
    ],
  };
}
