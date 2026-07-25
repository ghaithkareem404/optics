import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { brands } from "@/data/brands";
import { SectionTitle, Container } from "./ui";

export function BrandStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="border-y border-ink/5 bg-white py-16">
      <Container>
        <SectionTitle title={dict.brandsSection.title} subtitle={dict.brandsSection.subtitle} />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center justify-center rounded-xl border border-ink/5 bg-cream px-4 py-6 text-center transition-colors hover:border-gold/40"
            >
              <span className="font-display text-lg font-bold text-ink">{brand.name}</span>
              <span className="mt-1 text-xs text-ink-muted">{brand.note[locale]}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
