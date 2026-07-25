"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type CategoryFilter = ProductCategory | "all";

export function ProductsGrid({
  products,
  locale,
  labels,
  categoryLabels,
}: {
  products: Product[];
  locale: Locale;
  labels: { inquire: string; all: string };
  categoryLabels: Record<ProductCategory, string>;
}) {
  const [active, setActive] = useState<CategoryFilter>("all");

  const filters: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "optical", label: categoryLabels.optical },
    { key: "sunglasses", label: categoryLabels.sunglasses },
    { key: "contact-lenses", label: categoryLabels["contact-lenses"] },
    { key: "accessories", label: categoryLabels.accessories },
  ];

  const visible = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active, products],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActive(filter.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === filter.key
                ? "border-gold bg-gold text-ink"
                : "border-ink/15 text-ink-muted hover:border-gold hover:text-gold-dark",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            labels={labels}
          />
        ))}
      </div>
    </div>
  );
}
