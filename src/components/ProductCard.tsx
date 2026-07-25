import type { Product } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { ProductArt } from "./ProductArt";

export function ProductCard({
  product,
  locale,
  labels,
}: {
  product: Product;
  locale: Locale;
  labels: { inquire: string };
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ProductArt accent={product.accent} image={product.image} alt={product.name[locale]} />
        </div>
        <span className="absolute top-3 inline-block rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-white ltr:left-3 rtl:right-3">
          {product.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{product.name[locale]}</h3>
        <button
          type="button"
          className="mt-auto self-start rounded-full border border-gold px-5 py-2 text-xs font-semibold text-gold-dark transition-colors hover:bg-gold hover:text-ink"
        >
          {labels.inquire}
        </button>
      </div>
    </article>
  );
}
