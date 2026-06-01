import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="container-page section-py flex flex-col items-center justify-center text-center">
      <p
        className="font-heading text-8xl font-extrabold tracking-tight text-primary sm:text-9xl"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have moved, been removed, or the URL might be incorrect.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="min-w-[160px] h-11">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="min-w-[160px] h-11">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}
