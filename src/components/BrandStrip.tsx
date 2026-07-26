import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getCatalog } from "@/lib/catalog";
import { categoryLabel } from "@/data/categories";
import { SectionTitle, Container } from "./ui";
import { BrandMarquee } from "./BrandMarquee";
import { type Photo } from "./ProductModal";

/**
 * Homepage "leading global brands" — driven by the admin-managed "brands"
 * category. Renders an interactive auto-scrolling marquee; hides when empty.
 */
export async function BrandStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { collections, models } = await getCatalog();
  const whatsapp = dict.contact.phone.replace(/\D/g, "");

  const folderById = new Map(collections.map((c) => [c.id, c]));
  const photos: Photo[] = models
    .filter((m) => m.categoryId === "brands" && folderById.has(m.collectionId))
    .map((m) => ({
      id: m.id,
      src: `/api/media/${m.pathname}`,
      name: m.name,
      subtitle: m.subtitle,
      description: m.description,
      category: categoryLabel("brands", locale),
      folder: folderById.get(m.collectionId)!.name,
    }));

  if (photos.length === 0) return null;

  return (
    <section className="border-y border-ink/5 bg-white py-20">
      <Container>
        <SectionTitle title={dict.brandsSection.title} subtitle={dict.brandsSection.subtitle} />
      </Container>
      <div className="mt-12">
        <BrandMarquee photos={photos} labels={dict.product} whatsapp={whatsapp} />
      </div>
    </section>
  );
}
