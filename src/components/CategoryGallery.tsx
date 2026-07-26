import type { Locale } from "@/i18n/config";
import { getCatalog } from "@/lib/catalog";
import { categories, categoryLabel } from "@/data/categories";
import { Container } from "./ui";
import { PhotoGrid } from "./PhotoGrid";

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
      const total = folders.reduce((n, f) => n + f.items.length, 0);
      return { cat, folders, total };
    })
    .filter((g) => g.folders.length > 0);

  if (groups.length === 0) {
    if (categoryId && emptyText) {
      return (
        <section className="py-20">
          <Container>
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-ink/15 bg-cream/60 px-6 py-16 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gold/15">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="8.5" cy="10" r="1.5" />
                  <path d="m21 16-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-ink-muted">{emptyText}</p>
            </div>
          </Container>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="border-t border-ink/5 bg-cream py-16 sm:py-20">
      <Container>
        {title ? (
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        ) : null}

        <div className={title ? "mt-10 space-y-16" : "space-y-16"}>
          {groups.map(({ cat, folders, total }) => (
            <div key={cat.id}>
              {!categoryId ? (
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-8 w-1.5 rounded-full bg-gold" />
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {categoryLabel(cat.id, locale)}
                  </h3>
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-muted">
                    {total}
                  </span>
                </div>
              ) : null}

              <div className="space-y-12">
                {folders.map(({ folder, items }) => (
                  <div key={folder.id}>
                    <div className="mb-5 flex items-center gap-3">
                      <h4 className="font-display text-lg font-semibold text-ink">{folder.name}</h4>
                      <span className="h-px flex-1 bg-ink/10" />
                      <span className="text-xs text-ink-muted">{items.length}</span>
                    </div>
                    <PhotoGrid
                      photos={items.map((m) => ({ id: m.id, src: `/api/media/${m.pathname}`, name: m.name }))}
                    />
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
