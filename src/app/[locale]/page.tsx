import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandStrip } from "@/components/BrandStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Hero locale={params.locale} dict={dict} />
      <ServicesSection locale={params.locale} dict={dict} />
      <FeaturedProducts locale={params.locale} dict={dict} />
      <BrandStrip locale={params.locale} dict={dict} />
      <WhyChooseUs dict={dict} />
      <Testimonials locale={params.locale} dict={dict} />
      <CTASection locale={params.locale} dict={dict} />
    </>
  );
}
