import type { Locale } from "@/i18n/config";
import { getCatalog } from "@/lib/catalog";
import { brands } from "@/data/brands";
import { Container } from "./ui";

/**
 * Public gallery of the model images the shop manages from /admin, grouped by
 * brand. Renders nothing until at least one image has been uploaded.
 */
export async function BrandGalleries({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const { models } = await getCatalog();
  if (models.length === 0) return null;

  const groups = brands
    .map((b) => ({ brand: b, items: models.filter((m) => m.brandId === b.id) }))
    .filter((g) => g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className="border-t border-ink/5 bg-cream py-16">
      <Container>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        <div className="mt-10 space-y-12">
          {groups.map(({ brand, items }) => (
            <div key={brand.id}>
              <div className="mb-4 flex items-baseline gap-3">
                <h3 className="font-display text-xl font-bold text-ink">{brand.name}</h3>
                <span className="text-sm text-ink-muted">{brand.note[locale]}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((m) => (
                  <figure
                    key={m.id}
                    className="group overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow hover:shadow-card-hover"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.url}
                      alt={m.name || brand.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {m.name ? (
                      <figcaption className="truncate px-4 py-3 text-sm font-medium text-ink">
                        {m.name}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
