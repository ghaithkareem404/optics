"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { services } from "@/data/services";
import { Container } from "./ui";
import { ServiceIcon } from "./Icons";
import { cn } from "@/lib/utils";

const accents = ["#caaa70", "#1accbf", "#a9884e", "#14a79c", "#caaa70", "#1accbf"];

export function ServicesInteractive({
  locale,
  ctaLabel,
}: {
  locale: Locale;
  ctaLabel: string;
}) {
  const [active, setActive] = useState(0);
  const svc = services[active];
  const accent = accents[active % accents.length];

  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* List — plain selector on desktop, accordion on mobile */}
          <ul className="flex flex-col gap-2.5">
            {services.map((service, i) => {
              const on = i === active;
              const a = accents[i % accents.length];
              return (
                <li
                  key={service.id}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-surface transition-all duration-300",
                    on ? "border-gold shadow-card-hover" : "border-ink/8 hover:border-gold/50",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-start sm:gap-4 sm:px-5"
                    aria-expanded={on}
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-bold tabular-nums",
                        on ? "text-gold-dark" : "text-ink/30",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors"
                      style={{
                        backgroundColor: on ? a : `${a}1f`,
                        color: on ? "#0e0e0e" : a,
                      }}
                    >
                      <ServiceIcon name={service.icon} className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[15px] font-semibold sm:text-lg",
                        on ? "text-gold-dark" : "text-ink",
                      )}
                    >
                      {service.title[locale]}
                    </span>
                    {/* plus / minus */}
                    <span
                      className={cn(
                        "relative h-5 w-5 shrink-0 transition-transform duration-300",
                        on && "rotate-45",
                      )}
                      style={{ color: a }}
                      aria-hidden="true"
                    >
                      <span className="absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                    </span>
                  </button>

                  {/* Inline expand — mobile / tablet only */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out lg:hidden",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-5 sm:px-5">
                        <p className="text-sm leading-relaxed text-ink-muted">
                          {service.description[locale]}
                        </p>
                        <Link
                          href={`/${locale}/contact`}
                          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-ink"
                          style={{ backgroundColor: a }}
                        >
                          {ctaLabel}
                          <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Dynamic panel — desktop only */}
          <div className="relative hidden overflow-hidden rounded-3xl border border-ink/5 bg-gradient-to-br from-white to-cream p-10 shadow-card lg:sticky lg:top-28 lg:block">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-2xl" style={{ backgroundColor: `${accent}33` }} />
              <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full blur-2xl" style={{ backgroundColor: `${accent}22` }} />
            </div>

            <div key={active} className="relative animate-fade-up">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: `${accent}1f`, color: accent }}>
                  <ServiceIcon name={svc.icon} className="h-10 w-10" />
                </span>
                <span className="font-display text-5xl font-bold" style={{ color: `${accent}55` }}>
                  {String(active + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">{svc.title[locale]}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">{svc.description[locale]}</p>
              <Link
                href={`/${locale}/contact`}
                className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: accent }}
              >
                {ctaLabel}
                <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="relative mt-8 flex gap-1.5">
              {services.map((_, i) => (
                <span key={i} className="h-1.5 flex-1 rounded-full transition-all" style={{ backgroundColor: i === active ? accent : "rgba(14,14,14,0.1)" }} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
