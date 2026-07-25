import type { Locale } from "@/i18n/config";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export type ProductCategory =
  | "optical"
  | "sunglasses"
  | "contact-lenses"
  | "accessories";

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  brand: string;
  category: ProductCategory;
  /** Starting price in Iraqi Dinar. Display only — wire to real pricing later. */
  price: number;
  /** Accent color used by the placeholder art; swap for a real image path later. */
  accent: string;
  featured?: boolean;
  /** Optional real image path in /public. Falls back to generated placeholder art. */
  image?: string;
}

export interface Brand {
  id: string;
  /** Brand name (kept latin so it reads the same in both languages). */
  name: string;
  /** Localized short label shown under the name in the compact strip. */
  note: Localized;
  /** Longer description used in the featured-brands cards. */
  description?: Localized;
  /** Accent color for the placeholder card art. */
  accent?: string;
  /** Include in the large "featured brands" section. */
  featured?: boolean;
}

export interface Service {
  id: string;
  icon: "eye" | "lens" | "glasses" | "shield" | "sparkle" | "clock";
  title: Localized;
  description: Localized;
}
