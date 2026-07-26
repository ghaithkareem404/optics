"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductModal, type Photo, type PhotoLabels } from "./ProductModal";

export type { Photo, PhotoLabels } from "./ProductModal";

/**
 * Responsive product grid. Each card opens a full, interactive product view.
 */
export function PhotoGrid({
  photos,
  labels,
  whatsapp,
  animate = true,
}: {
  photos: Photo[];
  labels: PhotoLabels;
  whatsapp?: string;
  animate?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {photos.map((p, i) => (
          <article
            key={p.id}
            style={animate ? { animationDelay: `${Math.min(i, 12) * 55}ms` } : undefined}
            className={cn(
              "group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover",
              animate && "animate-pop-in",
            )}
            onClick={() => setIndex(i)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.name || "product"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-ink opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" strokeLinecap="round" />
                </svg>
                {labels.gallery}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-4 py-3">
              {p.name ? (
                <h4 className="truncate font-display text-base font-semibold text-ink">{p.name}</h4>
              ) : (
                <h4 className="truncate font-display text-base font-semibold text-ink-muted">
                  {p.folder || p.category}
                </h4>
              )}
              {p.subtitle ? (
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                  {p.subtitle}
                </p>
              ) : p.category ? (
                <p className="mt-0.5 truncate text-xs text-ink-muted">{p.category}</p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <ProductModal photos={photos} index={index} setIndex={setIndex} labels={labels} whatsapp={whatsapp} />
    </>
  );
}
