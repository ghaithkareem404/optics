import "server-only";
import type { Locale } from "./config";

// Dictionaries are loaded on the server only and typed after the Arabic base.
const dictionaries = {
  ar: () => import("./ar.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ar"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale] ?? dictionaries.ar;
  return load();
}
