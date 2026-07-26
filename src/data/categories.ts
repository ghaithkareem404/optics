import type { Locale } from "@/i18n/config";

/** Top-level catalog categories — these mirror the header navigation tabs. */
export const categories = [
  { id: "optical", ar: "العدسات الطبية", en: "Optical Lenses" },
  { id: "contact-lenses", ar: "العدسات اللاصقة", en: "Contact Lenses" },
  { id: "brands", ar: "البراندات", en: "Brands" },
  { id: "accessories", ar: "الاكسسوارات", en: "Accessories" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export function isCategory(id: string): id is CategoryId {
  return categories.some((c) => c.id === id);
}

export function categoryLabel(id: string, locale: Locale): string {
  const c = categories.find((x) => x.id === id);
  return c ? c[locale] : id;
}
