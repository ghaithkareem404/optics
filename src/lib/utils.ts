/** Join class names, dropping falsy values. A tiny, dependency-free `clsx`. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as a localized price string. */
export function formatPrice(value: number, locale: "ar" | "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-IQ" : "en-US").format(value);
}
