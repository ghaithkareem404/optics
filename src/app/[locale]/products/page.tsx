import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "@/data/products";
import { PageHeader } from "@/components/PageHeader";
import { ProductsGrid } from "@/components/ProductsGrid";
import { CategoryGallery } from "@/components/CategoryGallery";
import { Container } from "@/components/ui";

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
      <section className="py-16">
        <Container>
          <ProductsGrid
            products={products}
            locale={params.locale}
            labels={{ inquire: dict.products.inquire, all: dict.products.allCategories }}
            categoryLabels={dict.products.categories}
          />
        </Container>
      </section>
      <CategoryGallery
        locale={params.locale}
        title={params.locale === "ar" ? "أحدث الموديلات" : "Latest models"}
      />
    </>
  );
}
