"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type Slide = {
  title: string;
  text: string;
  cta: string;
  href: string;
  /** Optional real photo in /public (e.g. "/hero/slide-1.jpg"). Falls back to placeholder art. */
  image?: string;
};

// Placeholder gradient backgrounds per slide — replace by adding `image` to each slide.
const slideBg = [
  "from-cream via-white to-gold/15",
  "from-teal/15 via-cream to-white",
  "from-gold/15 via-cream to-white",
];

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const slides = dict.hero.slides as Slide[];
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  // Auto-advance every 6s.
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  const overlay = locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r";

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[540px] lg:min-h-[620px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={i !== index}
          >
            {/* Background: real image if provided, else gradient placeholder art */}
            {slide.image ? (
              <Image src={slide.image} alt="" fill priority={i === 0} className="object-cover" />
            ) : (
              <div className={cn("absolute inset-0 bg-gradient-to-br", slideBg[i % slideBg.length])}>
                <PlaceholderArt />
              </div>
            )}
            {/* Readability overlay on the text side */}
            <div className={cn("absolute inset-0", overlay, "from-white via-white/80 to-transparent")} />
          </div>
        ))}

        {/* Slide content */}
        <div className="container relative flex min-h-[540px] items-center lg:min-h-[620px]">
          <div className="max-w-xl text-start">
            <p className="mb-4 inline-block rounded-full border border-gold/40 bg-white/70 px-4 py-1.5 text-sm font-medium text-gold-dark">
              {dict.hero.eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
              {slides[index].title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{slides[index].text}</p>
            <Link
              href={`/${locale}/${slides[index].href}`}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-ink px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-ink"
            >
              {slides[index].cta}
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white transition-colors hover:bg-ink ltr:left-4 rtl:right-4"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-white transition-colors hover:bg-ink ltr:right-4 rtl:left-4"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index ? "w-7 bg-gold" : "w-2.5 bg-ink/30 hover:bg-ink/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderArt() {
  // Default banner illustration (vector): a stylised eyewear display.
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {/* soft bokeh */}
      <g opacity="0.5">
        <circle cx="150" cy="90" r="70" fill="#caaa70" opacity="0.18" />
        <circle cx="300" cy="380" r="90" fill="#1accbf" opacity="0.14" />
        <circle cx="60" cy="330" r="45" fill="#caaa70" opacity="0.14" />
      </g>
      {/* display shelves */}
      <g stroke="#0e0e0e" strokeOpacity="0.10" strokeWidth="4">
        <path d="M40 170h340M40 300h340M40 430h300" />
      </g>
      {/* mini frames on shelves */}
      <g stroke="#0e0e0e" strokeOpacity="0.14" strokeWidth="3">
        <g transform="translate(70 140)"><rect width="46" height="24" rx="10" /></g>
        <g transform="translate(150 140)"><rect width="46" height="24" rx="10" /></g>
        <g transform="translate(230 140)"><rect width="46" height="24" rx="10" /></g>
        <g transform="translate(70 270)"><rect width="46" height="24" rx="10" /></g>
        <g transform="translate(150 270)"><rect width="46" height="24" rx="10" /></g>
      </g>
      {/* hero glasses */}
      <g transform="translate(250 250)" stroke="#0e0e0e" strokeOpacity="0.22" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="-95" cy="0" r="72" />
        <circle cx="95" cy="0" r="72" />
        <path d="M-22 -6c14 -18 44 -18 44 0" />
        <path d="M-167 -18 -215 -52M167 -18 215 -52" />
      </g>
    </svg>
  );
}
