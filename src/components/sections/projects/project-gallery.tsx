"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

// ─── lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  title,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Close on Escape; arrow keys navigate
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox: ${title}`}
      onClick={onClose}
    >
      {/* Image wrapper — stop click propagation so clicking image doesn't close */}
      <div
        className="relative flex max-h-[90vh] max-w-5xl w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl"
        >
          <Image
            src={images[index]}
            alt={`${title} — gallery image ${index + 1} of ${images.length}`}
            fill
            sizes="(max-width: 1280px) 90vw, 1024px"
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className={cn(
            "absolute right-2 top-2 flex size-11 items-center justify-center rounded-full",
            "bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        {/* Prev */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className={cn(
              "absolute left-2 flex size-11 items-center justify-center rounded-full",
              "bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            )}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className={cn(
              "absolute right-2 flex size-11 items-center justify-center rounded-full",
              "bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            )}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* Counter */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {index + 1} / {images.length}
        </span>
      </div>
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openAt = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  if (!images.length) return null;

  return (
    <>
      <div
        className={cn(
          "grid gap-4",
          images.length === 1 && "grid-cols-1",
          images.length === 2 && "grid-cols-1 sm:grid-cols-2",
          images.length >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
        role="list"
        aria-label={`${title} project gallery`}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            role="listitem"
            aria-label={`Open gallery image ${i + 1} of ${images.length}`}
            className={cn(
              "group relative aspect-[16/10] overflow-hidden rounded-xl border border-border",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "cursor-zoom-in",
            )}
          >
            <Image
              src={src}
              alt={`${title} — project image ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            title={title}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
