"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface Photo {
  id: string;
  src: string;
  name?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  folder?: string;
}

export interface PhotoLabels {
  info: string;
  description: string;
  share: string;
  copyLink: string;
  copied: string;
  gallery: string;
  inquire: string;
  noDescription: string;
}

/**
 * Full-screen, interactive product view. Rendered by grids/marquees that
 * control the open item via `index` / `setIndex`. Keyboard: ← / → / Esc.
 */
export function ProductModal({
  photos,
  index,
  setIndex,
  labels,
  whatsapp,
}: {
  photos: Photo[];
  index: number | null;
  setIndex: (i: number | null) => void;
  labels: PhotoLabels;
  whatsapp?: string;
}) {
  const [copied, setCopied] = useState(false);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback(
    () => setIndex(index === null ? null : (index - 1 + photos.length) % photos.length),
    [index, photos.length, setIndex],
  );
  const next = useCallback(
    () => setIndex(index === null ? null : (index + 1) % photos.length),
    [index, photos.length, setIndex],
  );

  useEffect(() => {
    if (!open) return;
    setCopied(false);
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
  if (!open || !active) return null;

  function shareUrl() {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }
  function openShare(kind: "whatsapp" | "facebook" | "x") {
    const url = encodeURIComponent(shareUrl());
    const text = encodeURIComponent(active?.name || "");
    const map = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };
    window.open(map[kind], "_blank", "noopener,noreferrer");
  }
  const inquireHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `${labels.inquire}: ${active.name || ""}${active.folder ? ` (${active.folder})` : ""}`,
      )}`
    : undefined;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-md sm:p-6"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={close}
        aria-label="إغلاق"
        className="absolute top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 ltr:right-4 rtl:left-4"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="السابق"
            className="absolute z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-ink ltr:left-3 rtl:right-3"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="التالي"
            className="absolute z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold hover:text-ink ltr:right-3 rtl:left-3"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      ) : null}

      <div
        key={active.id}
        className="grid max-h-[92vh] w-full max-w-5xl animate-zoom-in overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media */}
        <div className="flex flex-col bg-cream p-4 sm:p-6">
          <div className="relative flex-1 overflow-hidden rounded-2xl bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.name || "product"}
              className="mx-auto max-h-[46vh] w-full object-contain md:max-h-[62vh]"
            />
          </div>
          {photos.length > 1 ? (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                    i === index ? "border-gold" : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Details */}
        <div className="flex max-h-[92vh] flex-col overflow-y-auto p-6 sm:p-8">
          {active.name ? (
            <h3 className="font-display text-2xl font-bold text-gold-dark sm:text-3xl">
              {active.name}
            </h3>
          ) : (
            <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {active.folder || active.category}
            </h3>
          )}
          {active.subtitle ? (
            <p className="mt-3 leading-relaxed text-ink-soft">{active.subtitle}</p>
          ) : null}

          {(active.category || active.folder) && (
            <div className="mt-6 border-t border-ink/10 pt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {labels.info}
              </p>
              <div className="flex flex-wrap gap-2">
                {active.category ? (
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-dark">
                    {active.category}
                  </span>
                ) : null}
                {active.folder ? (
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft">
                    {active.folder}
                  </span>
                ) : null}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {inquireHref ? (
              <a
                href={inquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z" />
                </svg>
                {labels.inquire}
              </a>
            ) : null}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="text-sm font-medium text-ink-muted">{labels.share}:</span>
            <button type="button" onClick={() => openShare("facebook")} aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold-dark">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9c0-.6.4-1 1-1Z"/></svg>
            </button>
            <button type="button" onClick={() => openShare("x")} aria-label="X" className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold-dark">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M18 2h3l-7 8 8 12h-6l-5-7-5 7H1l8-9L1 2h6l4 6 5-6Z"/></svg>
            </button>
            <button type="button" onClick={() => openShare("whatsapp")} aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold-dark">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.5.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.2Z"/></svg>
            </button>
            <button type="button" onClick={copyLink} aria-label={labels.copyLink} className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-soft transition-colors hover:border-gold hover:text-gold-dark">
              {copied ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
            {copied ? <span className="text-xs text-green-600">{labels.copied}</span> : null}
          </div>

          <div className="mt-6 border-t border-ink/10 pt-5">
            <p className="mb-2 text-sm font-semibold text-ink">{labels.description}</p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
              {active.description || labels.noDescription}
            </p>
          </div>

          {photos.length > 1 ? (
            <p className="mt-6 text-xs tracking-widest text-ink-muted/70">
              {index! + 1} / {photos.length}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
