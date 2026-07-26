import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { CategoryGallery } from "@/components/CategoryGallery";

// Always render fresh so newly uploaded model images appear immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return { title: dict.products.title, description: dict.products.subtitle };
}

export default async function ProductsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);

  return (
    <>
      <PageHeader title={dict.products.title} subtitle={dict.products.subtitle} />
      <CategoryGallery locale={params.locale} emptyText={dict.gallery.empty} />
    </>
  );
}
