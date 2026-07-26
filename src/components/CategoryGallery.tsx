import type { Locale } from "@/i18n/config";
import { getCatalog } from "@/lib/catalog";
import { getDictionary } from "@/i18n/dictionaries";
import { categories, categoryLabel } from "@/data/categories";
import { Container } from "./ui";
import { CategoryShowcase, type ShowcasePhoto, type ShowcaseFolder } from "./CategoryShowcase";

/**
 * Public gallery of the images managed from /admin.
 * - With `categoryId`: shows one category, with sub-folder filtering.
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
  const dict = await getDictionary(locale);
  const allLabel = locale === "ar" ? "الكل" : "All";
  const labels = dict.product;
  const whatsapp = dict.contact.phone.replace(/\D/g, "");

  const shown = categoryId ? categories.filter((c) => c.id === categoryId) : categories;

  const groups = shown
    .map((cat) => {
      const catLabel = categoryLabel(cat.id, locale);
      const catFolders = collections.filter((c) => c.categoryId === cat.id);
      const folders: ShowcaseFolder[] = catFolders
        .map((c) => ({
          id: c.id,
          name: c.name,
          count: models.filter((m) => m.collectionId === c.id).length,
        }))
        .filter((f) => f.count > 0);

      const folderById = new Map(catFolders.map((c) => [c.id, c.name]));
      const photos: ShowcasePhoto[] = models
        .filter((m) => m.categoryId === cat.id && folderById.has(m.collectionId))
        .map((m) => ({
          id: m.id,
          src: `/api/media/${m.pathname}`,
          name: m.name,
          subtitle: m.subtitle,
          description: m.description,
          category: catLabel,
          folder: folderById.get(m.collectionId),
          folderId: m.collectionId,
        }));

      return { cat, catLabel, folders, photos };
    })
    .filter((g) => g.photos.length > 0);

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

  const single = Boolean(categoryId);

  return (
    <section className="border-t border-ink/5 bg-cream py-16 sm:py-20">
      <Container>
        {title ? (
          <h2 className="mb-10 font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        ) : null}

        <div className="space-y-20">
          {groups.map(({ cat, catLabel, folders, photos }) => (
            <div key={cat.id}>
              {!single ? (
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-8 w-1.5 rounded-full bg-gold" />
                  <h3 className="font-display text-2xl font-bold text-ink">{catLabel}</h3>
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-muted">
                    {photos.length}
                  </span>
                </div>
              ) : null}

              <CategoryShowcase
                folders={folders}
                photos={photos}
                allLabel={allLabel}
                labels={labels}
                whatsapp={whatsapp}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
