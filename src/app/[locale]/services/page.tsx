import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { ServicesInteractive } from "@/components/ServicesInteractive";
import { CTASection } from "@/components/CTASection";

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
      <ServicesInteractive locale={locale} ctaLabel={dict.cta.button} />
      <CTASection locale={locale} dict={dict} />
    </>
  );
}
