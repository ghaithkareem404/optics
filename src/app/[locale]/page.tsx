import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { HeroVideo } from "@/components/HeroVideo";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { BrandStrip } from "@/components/BrandStrip";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { HoursBanner } from "@/components/HoursBanner";
import { CTASection } from "@/components/CTASection";

// Render fresh so newly uploaded images appear in the featured section.
export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return (
    <>
      <HeroVideo locale={params.locale} dict={dict} />
      <BrandStrip locale={params.locale} dict={dict} />
      <FeaturedProducts locale={params.locale} dict={dict} />
      <WhyChooseUs dict={dict} />
      <Testimonials locale={params.locale} dict={dict} />
      <HoursBanner dict={dict} />
      <CTASection locale={params.locale} dict={dict} />
    </>
  );
}
