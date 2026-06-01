/**
 * MDX component map — styled replacements for the HTML tags that MDX emits.
 *
 * @tailwindcss/typography is NOT installed, so every element is styled
 * explicitly here. Pass this object to <MDXRemote components={mdxComponents} />.
 *
 * All components are server-compatible (no "use client") because MDX is
 * rendered on the server via next-mdx-remote/rsc.
 */

import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Headings
// ---------------------------------------------------------------------------

function H2({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "font-heading mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
        className,
      )}
      {...props}
    />
  );
}

function H3({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "font-heading mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Body copy
// ---------------------------------------------------------------------------

function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "mb-5 leading-relaxed text-foreground/90",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

function Ul({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn(
        "mb-5 list-disc pl-6 space-y-1.5 text-foreground/90",
        className,
      )}
      {...props}
    />
  );
}

function Ol({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn(
        "mb-5 list-decimal pl-6 space-y-1.5 text-foreground/90",
        className,
      )}
      {...props}
    />
  );
}

function Li({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn("leading-relaxed", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Anchor — use next/link for internal paths to get prefetch behaviour
// ---------------------------------------------------------------------------

function A({ href = "#", className, ...props }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/");

  const sharedClass = cn(
    "font-medium text-primary underline underline-offset-4 decoration-primary/40",
    "hover:decoration-primary transition-colors focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
    className,
  );

  if (isInternal) {
    return <Link href={href} className={sharedClass} {...props} />;
  }

  return (
    <a
      href={href}
      className={sharedClass}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Blockquote
// ---------------------------------------------------------------------------

function Blockquote({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "my-6 border-l-4 border-primary pl-5 pr-2 italic text-muted-foreground",
        "bg-muted/40 py-3 rounded-r-lg",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Inline emphasis
// ---------------------------------------------------------------------------

function Strong({ className, ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Code — inline and block
// ---------------------------------------------------------------------------

function InlineCode({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground/80",
        className,
      )}
      {...props}
    />
  );
}

function Pre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl bg-muted p-4 text-sm leading-relaxed",
        "ring-1 ring-border",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Horizontal rule
// ---------------------------------------------------------------------------

function Hr({ className, ...props }: ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      className={cn("my-8 border-border", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// Image — wraps next/image so MDX images are optimised
// ---------------------------------------------------------------------------

interface MdxImageProps extends ComponentPropsWithoutRef<"img"> {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

function MdxImage({ src = "", alt = "", width, height, className }: MdxImageProps) {
  const w = width ? Number(width) : 1200;
  const h = height ? Number(height) : 630;

  return (
    <span className="my-6 block overflow-hidden rounded-xl ring-1 ring-border">
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={cn("w-full object-cover", className)}
        sizes="(max-width: 768px) 100vw, 70ch"
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  a: A,
  blockquote: Blockquote,
  strong: Strong,
  code: InlineCode,
  pre: Pre,
  hr: Hr,
  img: MdxImage,
} as const;
