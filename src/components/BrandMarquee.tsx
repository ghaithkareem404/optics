"use client";

import { useState } from "react";
import { ProductModal, type Photo, type PhotoLabels } from "./ProductModal";

/**
 * Auto-scrolling, interactive brand strip. Logos loop seamlessly (the list is
 * duplicated and the track is animated by -50%), pause on hover, and open the
 * full product view on click.
 */
export function BrandMarquee({
  photos,
  labels,
  whatsapp,
}: {
  photos: Photo[];
  labels: PhotoLabels;
  whatsapp?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const loop = [...photos, ...photos];

  return (
    <>
      <div className="group relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 z-10 w-16 bg-gradient-to-r from-white to-transparent ltr:left-0 rtl:right-0 rtl:bg-gradient-to-l" />
        <div className="pointer-events-none absolute inset-y-0 z-10 w-16 bg-gradient-to-l from-white to-transparent ltr:right-0 rtl:left-0 rtl:bg-gradient-to-r" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <button
              key={`${p.id}-${i}`}
              type="button"
              onClick={() => setIndex(i % photos.length)}
              className="group/card me-5 w-52 shrink-0 overflow-hidden rounded-2xl border border-ink/5 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.name || "brand"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                />
              </div>
              <div className="px-4 py-3 text-center">
                <p className="truncate font-display text-sm font-semibold text-ink">
                  {p.name || p.folder}
                </p>
                {p.subtitle ? (
                  <p className="mt-0.5 truncate text-xs text-ink-muted">{p.subtitle}</p>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProductModal photos={photos} index={index} setIndex={setIndex} labels={labels} whatsapp={whatsapp} />
    </>
  );
}
