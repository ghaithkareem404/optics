import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCatalog } from "@/lib/catalog";
import { categoryLabel } from "@/data/categories";
import { SectionTitle, Container, ButtonLink } from "./ui";
import { ArrowIcon } from "./Icons";
import { PhotoGrid, type Photo } from "./PhotoGrid";

/**
 * Homepage "selected collection" — the latest images uploaded from /admin.
 * Renders nothing until at least one image exists.
 */
export async function FeaturedProducts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { collections, models } = await getCatalog();
  const folderById = new Map(collections.map((c) => [c.id, c]));
  const whatsapp = dict.contact.phone.replace(/\D/g, "");

  const featured: Photo[] = models
    .filter((m) => folderById.has(m.collectionId))
    .slice(0, 8)
    .map((m) => {
      const folder = folderById.get(m.collectionId)!;
      return {
        id: m.id,
        src: `/api/media/${m.pathname}`,
        name: m.name,
        subtitle: m.subtitle,
        description: m.description,
        category: categoryLabel(m.categoryId, locale),
        folder: folder.name,
      };
    });

  if (featured.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          title={dict.products.featuredTitle}
          subtitle={dict.products.featuredSubtitle}
        />
        <div className="mt-12">
          <PhotoGrid photos={featured} labels={dict.product} whatsapp={whatsapp} />
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
