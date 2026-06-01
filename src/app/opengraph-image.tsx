import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Default site-wide Open Graph / Twitter Card image.
 *
 * Served automatically at /opengraph-image.png and wired up by Next.js as
 * the fallback OG image for every page that does not specify its own. This
 * replaces the static /og-image.jpg reference currently used in buildMetadata.
 *
 * Design: dark slate background (#0f172a), brand orange (#ea580c) accent bar,
 * business name in large white type, tagline, and a "Licensed & Insured • GTA"
 * attribution line. Uses system fonts only — no external font fetch needed.
 *
 * NOTE TO OWNER: once this file is in place, update src/lib/seo.ts so that
 * `buildMetadata` only sets `openGraph.images` when a per-page `image` arg is
 * explicitly provided. Otherwise this dynamic route is overridden site-wide.
 * See the recommended change in the SEO audit.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0f172a",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Brand orange accent bar — top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#ea580c",
          }}
        />

        {/* Logo / wordmark area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "auto",
          }}
        >
          {/* Orange square icon placeholder */}
          <div
            style={{
              width: "52px",
              height: "52px",
              backgroundColor: "#ea580c",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Hard-hat icon drawn with simple shapes */}
            <div
              style={{
                width: "32px",
                height: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "16px 16px 0 0",
                position: "relative",
              }}
            />
          </div>

          <span
            style={{
              color: "#f8fafc",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            {siteConfig.name}
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "48px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "72px",
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {siteConfig.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: 400,
              color: "#94a3b8",
              letterSpacing: "0.01em",
              maxWidth: "860px",
            }}
          >
            {siteConfig.tagline}
          </p>
        </div>

        {/* Bottom bar: orange divider + accreditation line */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Short orange rule */}
          <div
            style={{
              width: "48px",
              height: "4px",
              backgroundColor: "#ea580c",
              borderRadius: "2px",
              flexShrink: 0,
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 500,
              color: "#64748b",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Licensed &amp; Insured &bull; Greater Toronto Area
          </p>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#1e293b",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
