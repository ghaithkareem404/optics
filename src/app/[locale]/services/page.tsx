import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { services } from "@/data/services";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { CTASection } from "@/components/CTASection";
import { ServiceIcon } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return { title: dict.services.title, description: dict.services.subtitle };
}

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHeader title={dict.services.title} subtitle={dict.services.subtitle} />
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex gap-5 rounded-2xl border border-ink/5 bg-white p-6 shadow-card"
              >
                <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold-dark">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {service.title[locale]}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {service.description[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTASection locale={locale} dict={dict} />
    </>
  );
}
