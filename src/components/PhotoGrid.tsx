"use client";

import { useCallback, useEffect, useState } from "react";

export interface Photo {
  id: string;
  src: string;
  name?: string;
  meta?: string;
}

/**
 * Responsive image grid with an accessible lightbox (click to enlarge,
 * arrow keys / on-screen arrows to navigate, Esc or backdrop to close).
 */
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const active = index !== null ? photos[index] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((p, i) => (
          <figure
            key={p.id}
            className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            onClick={() => setIndex(i)}
          >
            <div className="relative aspect-square overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.name || "model"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* zoom glyph */}
              <span className="pointer-events-none absolute bottom-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow transition-all duration-300 group-hover:opacity-100 ltr:right-3 rtl:left-3">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            {(p.name || p.meta) && (
              <figcaption className="px-4 py-3">
                {p.name ? (
                  <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                ) : null}
                {p.meta ? <p className="truncate text-xs text-ink-muted">{p.meta}</p> : null}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {open && active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label="إغلاق"
            className="absolute top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ltr:right-5 rtl:left-5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="السابق"
                className="absolute grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ltr:left-4 rtl:right-4"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="التالي"
                className="absolute grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ltr:right-4 rtl:left-4"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : null}

          <figure
            className="flex max-h-[90vh] max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.name || "model"}
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            {(active.name || active.meta) && (
              <figcaption className="mt-4 text-center">
                {active.name ? (
                  <p className="text-lg font-semibold text-white">{active.name}</p>
                ) : null}
                {active.meta ? <p className="mt-0.5 text-sm text-white/70">{active.meta}</p> : null}
              </figcaption>
            )}
          </figure>
        </div>
      ) : null}
    </>
  );
}
