"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { services } from "@/data/services";
import { Container } from "./ui";
import { ServiceIcon } from "./Icons";
import { cn } from "@/lib/utils";

export function ServicesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(0);
  const s = dict.services as { eyebrow: string; title: string; subtitle: string };

  return (
    <section className="bg-cream py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            {s.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
            {s.title}
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{s.subtitle}</p>
        </div>

        {/* Interactive accordion + visual */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          {/* Accordion */}
          <ul className="flex flex-col gap-3">
            {services.map((service, i) => {
              const isOpen = i === open;
              return (
                <li
                  key={service.id}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
                    isOpen
                      ? "border-gold shadow-card-hover"
                      : "border-ink/8 hover:border-gold/50",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-start"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isOpen ? "bg-gold text-ink" : "bg-gold/12 text-gold-dark",
                      )}
                    >
                      <ServiceIcon name={service.icon} className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-base font-semibold transition-colors sm:text-lg",
                        isOpen ? "text-gold-dark" : "text-ink",
                      )}
                    >
                      {service.title[locale]}
                    </span>
                    <span
                      className={cn(
                        "relative h-5 w-5 shrink-0 text-gold transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden="true"
                    >
                      <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 ps-20 text-sm leading-relaxed text-ink-muted">
                        {service.description[locale]}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Visual panel */}
          <div className="order-first lg:order-none">
            <PhoropterArt />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Stylised phoropter (eye-exam device) illustration in the brand palette. */
function PhoropterArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-white to-cream shadow-card">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-teal/15 blur-2xl" />
      </div>
      <svg viewBox="0 0 400 400" className="relative h-full w-full p-8" fill="none">
        {/* top bar */}
        <rect x="70" y="60" width="260" height="34" rx="12" stroke="#caaa70" strokeWidth="4" />
        <rect x="188" y="94" width="24" height="26" fill="#caaa70" opacity="0.25" />
        {/* two big lens dials */}
        {[130, 270].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="230" r="78" stroke="#0e0e0e" strokeOpacity="0.15" strokeWidth="6" />
            <circle cx={cx} cy="230" r="52" stroke="#caaa70" strokeWidth="5" />
            <circle cx={cx} cy="230" r="26" stroke="#1accbf" strokeWidth="5" />
            <circle cx={cx} cy="230" r="6" fill="#0e0e0e" fillOpacity="0.5" />
            {Array.from({ length: 24 }).map((_, k) => {
              const a = (k / 24) * Math.PI * 2;
              const r1 = 66;
              const r2 = 78;
              return (
                <line
                  key={k}
                  x1={cx + Math.cos(a) * r1}
                  y1={230 + Math.sin(a) * r1}
                  x2={cx + Math.cos(a) * r2}
                  y2={230 + Math.sin(a) * r2}
                  stroke="#0e0e0e"
                  strokeOpacity="0.2"
                  strokeWidth="3"
                />
              );
            })}
          </g>
        ))}
        {/* bridge */}
        <path d="M182 230c8-12 28-12 36 0" stroke="#caaa70" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
