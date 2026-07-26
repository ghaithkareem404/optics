import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./ui";

/** Compact, elegant opening-hours strip shown near the top of the homepage. */
export function HoursBanner({ dict }: { dict: Dictionary }) {
  const h = dict.homeHours;

  return (
    <div className="bg-white py-5">
      <Container>
        <div className="mx-auto flex max-w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-gold/30 bg-cream px-6 py-2.5 text-sm shadow-card">
          <span className="flex items-center gap-2 font-semibold text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.9">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {h.eyebrow}
          </span>
          <span className="hidden h-4 w-px bg-ink/15 sm:block" />
          <span dir="ltr" className="font-medium text-gold-dark">
            {h.from} — {h.to}
          </span>
          <span className="hidden h-4 w-px bg-ink/15 sm:block" />
          <span className="flex items-center gap-1.5 text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {h.days}
          </span>
        </div>
      </Container>
    </div>
  );
}
