"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

// Geometric brand mark — a small SVG mark alongside the wordmark
function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      {/* Chevron-right double mark — industrial, construction feel */}
      <polygon
        points="6,26 14,16 6,6 10,6 18,16 10,26"
        fill="currentColor"
        opacity="0.4"
      />
      <polygon
        points="14,26 22,16 14,6 18,6 26,16 18,26"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // Set initial state without waiting for a scroll event
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border bg-background/80 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className="container-page flex h-16 items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label={`${siteConfig.name} — Home`}
        >
          <BrandMark className="size-7" />
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        {/* ── Desktop nav (md+) ────────────────────────────────────── */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop right actions ────────────────────────────────── */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Phone link — only show on lg+ */}
          <a
            href={siteConfig.contact.phoneHref}
            className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
            aria-label={`Call us: ${siteConfig.contact.phone}`}
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <ThemeToggle />

          <Button asChild size="default">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* ── Mobile right: theme + hamburger ─────────────────────── */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[min(80vw,320px)] p-0">
              <SheetHeader className="border-b px-5 py-4">
                <SheetTitle className="flex items-center gap-2">
                  <BrandMark className="size-6 text-primary" />
                  <span className="font-heading font-bold">
                    {siteConfig.name}
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Nav links */}
              <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4">
                <ul className="flex flex-col gap-1" role="list">
                  {siteConfig.nav.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex min-h-[44px] items-center rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isActive(item.href)
                              ? "bg-accent text-primary"
                              : "text-foreground hover:bg-muted"
                          )}
                          aria-current={isActive(item.href) ? "page" : undefined}
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom: phone + CTA */}
              <div className="border-t px-5 py-5 flex flex-col gap-3">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex min-h-[44px] items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  aria-label={`Call us: ${siteConfig.contact.phone}`}
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {siteConfig.contact.phone}
                </a>

                <SheetClose asChild>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
