"use client";

import { useCallback, useEffect, useState } from "react";

export interface Photo {
  id: string;
  src: string;
  name?: string;
  meta?: string;
}

/**
 * Responsive image grid with a premium hover treatment and an accessible
 * lightbox (click to enlarge, arrow keys / on-screen arrows to navigate,
 * Esc or backdrop to close). `animate` replays the entrance on remount.
 */
export function PhotoGrid({ photos, animate = true }: { photos: Photo[]; animate?: boolean }) {
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {photos.map((p, i) => (
          <figure
            key={p.id}
            style={animate ? { animationDelay: `${Math.min(i, 12) * 55}ms` } : undefined}
            className={
              "group relative cursor-zoom-in overflow-hidden rounded-2xl bg-ink shadow-card ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover" +
              (animate ? " animate-pop-in" : "")
            }
            onClick={() => setIndex(i)}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.name || "model"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-110"
              />

              {/* darkening gradient on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              {/* zoom badge */}
              <span className="absolute top-3 grid h-10 w-10 -translate-y-2 place-items-center rounded-full bg-white/95 text-ink opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ltr:right-3 rtl:left-3">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
                </svg>
              </span>

              {/* caption slides up over the image on hover */}
              {(p.name || p.meta) && (
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.name ? (
                    <p className="truncate font-display text-base font-semibold text-white drop-shadow">
                      {p.name}
                    </p>
                  ) : null}
                  {p.meta ? (
                    <p className="mt-0.5 truncate text-xs text-white/80">{p.meta}</p>
                  ) : null}
                </figcaption>
              )}
            </div>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {open && active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
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
                className="absolute grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-ink ltr:left-4 rtl:right-4"
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
                className="absolute grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-ink ltr:right-4 rtl:left-4"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : null}

          <figure
            key={active.id}
            className="flex max-h-[90vh] max-w-5xl animate-zoom-in flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.name || "model"}
              className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            {(active.name || active.meta) && (
              <figcaption className="mt-5 text-center">
                {active.name ? (
                  <p className="font-display text-xl font-semibold text-white">{active.name}</p>
                ) : null}
                {active.meta ? <p className="mt-1 text-sm text-white/70">{active.meta}</p> : null}
              </figcaption>
            )}
            {photos.length > 1 ? (
              <p className="mt-2 text-xs tracking-widest text-white/50">
                {index! + 1} / {photos.length}
              </p>
            ) : null}
          </figure>
        </div>
      ) : null}
    </>
  );
}
