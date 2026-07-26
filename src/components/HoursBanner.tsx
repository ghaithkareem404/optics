import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./ui";

/** Compact, high-contrast opening-hours strip near the top of the homepage. */
export function HoursBanner({ dict }: { dict: Dictionary }) {
  const h = dict.homeHours;

  return (
    <div className="bg-surface py-6">
      <Container>
        <div className="mx-auto flex max-w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-5 py-2.5 text-night shadow-[0_12px_34px_-10px_rgba(202,170,112,0.75)] sm:px-6">
          <span className="flex items-center gap-2 font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-night text-gold shadow-inner">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {h.eyebrow}
          </span>

          <span className="hidden h-5 w-px bg-night/25 sm:block" />

          <span dir="ltr" className="font-display text-base font-extrabold tracking-wide">
            {h.from} — {h.to}
          </span>

          <span className="hidden h-5 w-px bg-night/25 sm:block" />

          <span className="flex items-center gap-1.5 font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-night/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-night" />
            </span>
            {h.days}
          </span>
        </div>
      </Container>
    </div>
  );
}
