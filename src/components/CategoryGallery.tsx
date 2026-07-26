import type { Locale } from "@/i18n/config";
import { getCatalog } from "@/lib/catalog";
import { categories, categoryLabel } from "@/data/categories";
import { Container } from "./ui";

function Figure({ src, name }: { src: string; name: string }) {
  return (
    <figure className="group overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow hover:shadow-card-hover">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name || "model"}
        loading="lazy"
        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {name ? (
        <figcaption className="truncate px-4 py-3 text-sm font-medium text-ink">{name}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Public gallery of the images managed from /admin.
 * - With `categoryId`: shows one category, grouped by sub-folder.
 * - Without it: shows every category that has images.
 */
export async function CategoryGallery({
  locale,
  categoryId,
  title,
  emptyText,
}: {
  locale: Locale;
  categoryId?: string;
  title?: string;
  emptyText?: string;
}) {
  const { collections, models } = await getCatalog();

  const shown = categoryId ? categories.filter((c) => c.id === categoryId) : categories;

  const groups = shown
    .map((cat) => {
      const folders = collections
        .filter((c) => c.categoryId === cat.id)
        .map((c) => ({ folder: c, items: models.filter((m) => m.collectionId === c.id) }))
        .filter((g) => g.items.length > 0);
      return { cat, folders };
    })
    .filter((g) => g.folders.length > 0);

  if (groups.length === 0) {
    if (categoryId && emptyText) {
      return (
        <section className="py-16">
          <Container>
            <p className="rounded-2xl border border-dashed border-ink/15 bg-cream py-16 text-center text-ink-muted">
              {emptyText}
            </p>
          </Container>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="border-t border-ink/5 bg-cream py-16">
      <Container>
        {title ? (
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        ) : null}

        <div className={title ? "mt-10 space-y-14" : "space-y-14"}>
          {groups.map(({ cat, folders }) => (
            <div key={cat.id}>
              {!categoryId ? (
                <div className="mb-6 border-b border-ink/10 pb-3">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {categoryLabel(cat.id, locale)}
                  </h3>
                </div>
              ) : null}

              <div className="space-y-10">
                {folders.map(({ folder, items }) => (
                  <div key={folder.id}>
                    <h4 className="mb-4 inline-block rounded-full bg-gold/15 px-4 py-1.5 font-display text-base font-semibold text-gold-dark">
                      {folder.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {items.map((m) => (
                        <Figure key={m.id} src={`/api/media/${m.pathname}`} name={m.name} />
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
