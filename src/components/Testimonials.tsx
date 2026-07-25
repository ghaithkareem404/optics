import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { testimonials } from "@/data/testimonials";
import { SectionTitle, Container } from "./ui";
import { StarIcon } from "./Icons";

export function Testimonials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-cream py-20">
      <Container>
        <SectionTitle title={dict.testimonials.title} subtitle={dict.testimonials.subtitle} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col rounded-2xl border border-ink/5 bg-white p-6 shadow-card"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-ink-soft">
                “{item.quote[locale]}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display font-bold text-gold-dark">
                  {item.name[locale].charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{item.name[locale]}</span>
                  <span className="block text-xs text-ink-muted">{item.role[locale]}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
