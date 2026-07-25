import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { services } from "@/data/services";
import { SectionTitle, Container } from "./ui";
import { ServiceIcon } from "./Icons";

export function ServicesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-cream py-20">
      <Container>
        <SectionTitle title={dict.services.title} subtitle={dict.services.subtitle} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border border-ink/5 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold/12 text-gold-dark transition-colors group-hover:bg-gold group-hover:text-ink">
                <ServiceIcon name={service.icon} className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">
                {service.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {service.description[locale]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
