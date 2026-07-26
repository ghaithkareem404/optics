import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./ui";

export function HoursBanner({ dict }: { dict: Dictionary }) {
  const h = dict.homeHours;

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-20">
      {/* soft gold glows */}
      <div className="pointer-events-none absolute -top-24 h-64 w-64 rounded-full bg-gold/20 blur-3xl ltr:-right-16 rtl:-left-16" />
      <div className="pointer-events-none absolute -bottom-24 h-64 w-64 rounded-full bg-teal/10 blur-3xl ltr:-left-16 rtl:-right-16" />

      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* clock icon */}
          <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-ink shadow-lg">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-light">
            {h.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{h.title}</h2>

          {/* time range */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
              <p className="text-xs text-white/60">{h.open}</p>
              <p className="mt-1 font-display text-2xl font-bold text-gold-light sm:text-3xl">
                {h.from}
              </p>
            </div>

            <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m0 0-5-5m5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
              <p className="text-xs text-white/60">{h.close}</p>
              <p className="mt-1 font-display text-2xl font-bold text-gold-light sm:text-3xl">
                {h.to}
              </p>
            </div>
          </div>

          {/* days badge */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold/15 px-5 py-2 text-sm font-medium text-gold-light">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
            </span>
            {h.days}
          </div>

          <p className="mt-4 text-sm text-white/60">{h.note}</p>
        </div>
      </Container>
    </section>
  );
}
