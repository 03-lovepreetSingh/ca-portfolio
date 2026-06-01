/**
 * Renders a JSON-LD structured-data block. Server-rendered into the HTML so
 * crawlers read it on first load. Pass any of the objects from lib/schema.ts.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Data is our own (no user input). We still escape "<" to "<" so a
  // stray "</script>" inside any string can never break out of the tag —
  // the standard hardening for JSON-LD injection.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
