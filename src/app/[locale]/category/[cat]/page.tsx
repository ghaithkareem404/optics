import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { categories, isCategory, categoryLabel } from "@/data/categories";
import { PageHeader } from "@/components/PageHeader";
import { CategoryGallery } from "@/components/CategoryGallery";

// Always render fresh so newly uploaded images appear immediately.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((c) => ({ cat: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; cat: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale) || !isCategory(params.cat)) return {};
  return { title: categoryLabel(params.cat, params.locale as Locale) };
}

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; cat: string };
}) {
  if (!isLocale(params.locale) || !isCategory(params.cat)) notFound();
  const dict = await getDictionary(params.locale);
  const title = categoryLabel(params.cat, params.locale);

  return (
    <>
      <PageHeader title={title} subtitle={dict.products.subtitle} />
      <CategoryGallery
        locale={params.locale}
        categoryId={params.cat}
        emptyText={dict.gallery.empty}
      />
    </>
  );
}
