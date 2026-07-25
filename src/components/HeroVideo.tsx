"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Slide = { title: string; text: string; cta: string; href: string };

/**
 * Full-bleed video hero: the supplied clip plays muted + looped as the
 * background, with brand copy, CTAs and a sound toggle overlaid on top.
 * Falls back to a dark branded panel if the video can't load.
 */
export function HeroVideo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const slide = (dict.hero.slides as Slide[])[0];

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  }

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-ink text-white">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-ink/45" />
      <div
        className={
          "absolute inset-0 " +
          (locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r") +
          " from-ink/90 via-ink/55 to-transparent"
        }
      />

      {/* Content */}
      <div className="container relative flex min-h-[80vh] flex-col justify-center py-20">
        <div className="max-w-xl animate-fade-up text-start">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/10 px-4 py-1.5 text-sm font-medium text-gold-light backdrop-blur">
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/85">{slide.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/${slide.href}`}
              className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
            >
              {slide.cta}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold-light"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      </div>

      {/* Sound toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-ink/60 text-white backdrop-blur transition-colors hover:border-gold hover:text-gold-light ltr:right-6 rtl:left-6"
      >
        {muted ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
            <path d="m17 9 4 6M21 9l-4 6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
            <path d="M16 9a4 4 0 0 1 0 6M18.5 7a7 7 0 0 1 0 10" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </section>
  );
}
