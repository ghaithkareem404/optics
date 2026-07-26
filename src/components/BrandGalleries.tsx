import type { Locale } from "@/i18n/config";
import { getCatalog } from "@/lib/catalog";
import { brands } from "@/data/brands";
import { Container } from "./ui";

/**
 * Public gallery of the model images managed from /admin, grouped by
 * brand and then by sub-collection. Renders nothing until an image exists.
 */
export async function BrandGalleries({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const { collections, models } = await getCatalog();
  if (models.length === 0) return null;

  const brandGroups = brands
    .map((brand) => {
      const cols = collections
        .filter((c) => c.brandId === brand.id)
        .map((c) => ({ collection: c, items: models.filter((m) => m.collectionId === c.id) }))
        .filter((g) => g.items.length > 0);
      return { brand, cols };
    })
    .filter((g) => g.cols.length > 0);

  if (brandGroups.length === 0) return null;

  return (
    <section className="border-t border-ink/5 bg-cream py-16">
      <Container>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>

        <div className="mt-10 space-y-14">
          {brandGroups.map(({ brand, cols }) => (
            <div key={brand.id}>
              <div className="mb-6 flex items-baseline gap-3 border-b border-ink/10 pb-3">
                <h3 className="font-display text-2xl font-bold text-ink">{brand.name}</h3>
                <span className="text-sm text-ink-muted">{brand.note[locale]}</span>
              </div>

              <div className="space-y-10">
                {cols.map(({ collection, items }) => (
                  <div key={collection.id}>
                    <h4 className="mb-4 inline-block rounded-full bg-gold/15 px-4 py-1.5 font-display text-base font-semibold text-gold-dark">
                      {collection.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {items.map((m) => (
                        <figure
                          key={m.id}
                          className="group overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow hover:shadow-card-hover"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/api/media/${m.pathname}`}
                            alt={m.name || collection.name}
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
