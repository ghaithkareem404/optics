"use client";

import { useMemo, useState } from "react";
import { PhotoGrid, type PhotoLabels } from "./PhotoGrid";

export interface SearchItem {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  folder: string;
  category: string;
  src: string;
}

export function SearchClient({
  items,
  labels,
  productLabels,
  whatsapp,
}: {
  items: SearchItem[];
  labels: { placeholder: string; empty: string; prompt: string; results: string };
  productLabels: PhotoLabels;
  whatsapp?: string;
}) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return items.filter((it) =>
      [it.name, it.subtitle, it.folder, it.category].join(" ").toLowerCase().includes(q),
    );
  }, [q, items]);

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted ltr:left-4 rtl:right-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          className="w-full rounded-full border border-ink/15 bg-white px-12 py-3.5 text-sm text-ink shadow-card outline-none focus:border-gold"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink ltr:right-4 rtl:left-4"
            aria-label="clear"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="mt-10">
        {!q ? (
          <p className="py-16 text-center text-ink-muted">{labels.prompt}</p>
        ) : results.length === 0 ? (
          <p className="py-16 text-center text-ink-muted">{labels.empty}</p>
        ) : (
          <>
            <p className="mb-6 text-sm text-ink-muted">
              {results.length} {labels.results}
            </p>
            <PhotoGrid
              photos={results.map((it) => ({
                id: it.id,
                src: it.src,
                name: it.name,
                subtitle: it.subtitle,
                description: it.description,
                category: it.category,
                folder: it.folder,
              }))}
              labels={productLabels}
              whatsapp={whatsapp}
            />
          </>
        )}
      </div>
    </div>
  );
}
