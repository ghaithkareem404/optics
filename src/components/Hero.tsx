import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "./ui";
import { ArrowIcon, GlassesIcon } from "./Icons";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const stats = [
    { value: "20+", label: t.stat1, sub: t.stat1Label },
    { value: "10+", label: t.stat2, sub: t.stat2Label },
    { value: "5k+", label: t.stat3, sub: t.stat3Label },
  ];

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-24 h-72 w-72 rounded-full bg-gold blur-3xl ltr:-left-24 rtl:-right-24" />
        <div className="absolute bottom-0 h-80 w-80 rounded-full bg-ink-muted blur-3xl ltr:right-0 rtl:left-0" />
      </div>

      <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-light">
            <GlassesIcon className="h-4 w-4" />
            {t.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/products`} variant="primary">
              {t.ctaPrimary}
              <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
            </ButtonLink>
            <ButtonLink href={`/${locale}/contact`} variant="ghost" className="border-white/25 text-white hover:border-gold hover:text-gold-light">
              {t.ctaSecondary}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-bold text-gold-light">{stat.value}</dt>
                <dd className="mt-1 text-sm font-medium text-white">{stat.label}</dd>
                <dd className="text-xs text-white/50">{stat.sub}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up lg:justify-self-end">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full p-8" fill="none">
        <defs>
          <linearGradient id="heroLens" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0c375" />
            <stop offset="100%" stopColor="#c8a24a" />
          </linearGradient>
        </defs>
        <circle cx="140" cy="210" r="95" stroke="url(#heroLens)" strokeWidth="10" />
        <circle cx="140" cy="210" r="95" fill="#c8a24a" fillOpacity="0.08" />
        <circle cx="300" cy="180" r="72" stroke="url(#heroLens)" strokeWidth="10" />
        <circle cx="300" cy="180" r="72" fill="#c8a24a" fillOpacity="0.08" />
        <path d="M232 200c8-16 34-18 46-6" stroke="url(#heroLens)" strokeWidth="10" strokeLinecap="round" />
        <path d="M46 190 8 150M370 118l26-38" stroke="url(#heroLens)" strokeWidth="10" strokeLinecap="round" />
      </svg>
    </div>
  );
}
