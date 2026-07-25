import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SectionTitle, Container, ButtonLink } from "./ui";
import { ArrowIcon } from "./Icons";

export function FeaturedProducts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = getFeaturedProducts();
  const labels = {
    from: dict.products.from,
    currency: dict.products.currency,
    inquire: dict.products.inquire,
  };

  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title={dict.products.featuredTitle}
          subtitle={dict.products.featuredSubtitle}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} labels={labels} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href={`/${locale}/products`} variant="secondary">
            {dict.products.viewAll}
            <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
