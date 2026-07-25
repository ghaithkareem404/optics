import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CTASection } from "@/components/CTASection";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return { title: dict.about.title, description: dict.about.subtitle };
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.about.title} subtitle={dict.about.subtitle} />
      <section className="py-16">
        <Container>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{dict.about.body}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/5 bg-cream p-8">
              <h2 className="font-display text-2xl font-bold text-ink">
                {dict.about.missionTitle}
              </h2>
              <p className="mt-3 text-ink-muted">{dict.about.mission}</p>
            </div>
            <div className="rounded-2xl border border-ink/5 bg-cream p-8">
              <h2 className="font-display text-2xl font-bold text-ink">
                {dict.about.visionTitle}
              </h2>
              <p className="mt-3 text-ink-muted">{dict.about.vision}</p>
            </div>
          </div>
        </Container>
      </section>
      <WhyChooseUs dict={dict} />
      <CTASection locale={params.locale} dict={dict} />
    </>
  );
}
