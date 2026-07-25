import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getFeaturedBrands } from "@/data/brands";
import { SectionTitle, Container } from "./ui";

export function BrandStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const brands = getFeaturedBrands();

  return (
    <section className="border-y border-ink/5 bg-white py-20">
      <Container>
        <SectionTitle title={dict.brandsSection.title} subtitle={dict.brandsSection.subtitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand) => (
            <article
              key={brand.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div
                className="relative flex aspect-[4/5] items-center justify-center"
                style={{ backgroundColor: `${brand.accent}1a` }}
              >
                <span
                  className="font-display text-2xl font-bold"
                  style={{ color: brand.accent }}
                >
                  {brand.name}
                </span>
                <span className="absolute bottom-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-ink ltr:right-3 rtl:left-3">
                  {brand.note[locale]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {brand.note[locale]}
                </h3>
                {brand.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {brand.description[locale]}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
