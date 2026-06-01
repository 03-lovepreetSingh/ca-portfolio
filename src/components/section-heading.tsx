import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Standard section heading: a small uppercase "eyebrow", an H2 title, and an
 * optional lead paragraph. Shared so every section has consistent type scale
 * and rhythm. Pass `as` to change the heading level for correct document
 * outline (use h1 only once per page).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      )}
      <As className="font-heading mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </As>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </Reveal>
  );
}
