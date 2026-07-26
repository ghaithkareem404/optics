import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCatalog } from "@/lib/catalog";
import { categoryLabel } from "@/data/categories";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { SearchClient, type SearchItem } from "@/components/SearchClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return { title: dict.search.title, description: dict.search.subtitle };
}

export default async function SearchPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const { collections, models } = await getCatalog();

  const folderName = (id: string) => collections.find((c) => c.id === id)?.name ?? "";

  const items: SearchItem[] = models.map((m) => ({
    id: m.id,
    name: m.name,
    folder: folderName(m.collectionId),
    category: categoryLabel(m.categoryId, locale),
    src: `/api/media/${m.pathname}`,
  }));

  return (
    <>
      <PageHeader title={dict.search.title} subtitle={dict.search.subtitle} />
      <section className="py-16">
        <Container>
          <SearchClient
            items={items}
            labels={{
              placeholder: dict.search.placeholder,
              empty: dict.search.empty,
              prompt: dict.search.prompt,
              results: dict.search.results,
            }}
          />
        </Container>
      </section>
    </>
  );
}
