"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { PhotoGrid, type Photo, type PhotoLabels } from "./PhotoGrid";

export interface ShowcasePhoto extends Photo {
  folderId: string;
}

export interface ShowcaseFolder {
  id: string;
  name: string;
  count: number;
}

/**
 * One category's images with interactive sub-folder filtering.
 * Sub-folders render as filter pills; picking one re-animates the grid.
 */
export function CategoryShowcase({
  folders,
  photos,
  allLabel,
  labels,
  whatsapp,
}: {
  folders: ShowcaseFolder[];
  photos: ShowcasePhoto[];
  allLabel: string;
  labels: PhotoLabels;
  whatsapp?: string;
}) {
  const [active, setActive] = useState<string>("all");

  const shown = useMemo(
    () => (active === "all" ? photos : photos.filter((p) => p.folderId === active)),
    [active, photos],
  );

  const chip = (id: string, label: string, count: number) => {
    const on = active === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setActive(id)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
          on
            ? "border-transparent bg-ink text-white shadow-card"
            : "border-ink/12 bg-white text-ink-soft hover:border-gold hover:text-ink",
        )}
      >
        {label}
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[11px] leading-none transition-colors",
            on ? "bg-gold text-ink" : "bg-ink/5 text-ink-muted group-hover:bg-gold/20",
          )}
        >
          {count}
        </span>
      </button>
    );
  };

  return (
    <div>
      {/* Sub-folder filter bar */}
      {folders.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2.5">
          {chip("all", allLabel, photos.length)}
          {folders.map((f) => chip(f.id, f.name, f.count))}
        </div>
      ) : null}

      {/* key forces a remount so the entrance animation replays on filter change */}
      <div key={active}>
        <PhotoGrid photos={shown} labels={labels} whatsapp={whatsapp} />
      </div>
    </div>
  );
}
