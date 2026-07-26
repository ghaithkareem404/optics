"use client";

import { useMemo, useState } from "react";

export interface SearchItem {
  id: string;
  name: string;
  folder: string;
  category: string;
  src: string;
}

export function SearchClient({
  items,
  labels,
}: {
  items: SearchItem[];
  labels: { placeholder: string; empty: string; prompt: string; results: string };
}) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return items.filter((it) =>
      [it.name, it.folder, it.category].join(" ").toLowerCase().includes(q),
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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((it) => (
                <figure
                  key={it.id}
                  className="group overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    alt={it.name || "model"}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="px-4 py-3">
                    {it.name ? (
                      <p className="truncate text-sm font-medium text-ink">{it.name}</p>
                    ) : null}
                    <p className="truncate text-xs text-ink-muted">
                      {it.category}
                      {it.folder ? ` · ${it.folder}` : ""}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
