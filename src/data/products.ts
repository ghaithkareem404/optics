import type { Product } from "./types";

// Placeholder catalog. Replace names, prices and add `image` paths with your real data.
export const products: Product[] = [
  {
    id: "p1",
    slug: "aurora-optical-01",
    name: { ar: "إطار أورورا الطبي", en: "Aurora Optical Frame" },
    brand: "Aurora",
    category: "optical",
    price: 85000,
    accent: "#415a77",
    featured: true,
  },
  {
    id: "p2",
    slug: "solaris-aviator",
    name: { ar: "نظارة سولاريس أفياتور", en: "Solaris Aviator" },
    brand: "Solaris",
    category: "sunglasses",
    price: 120000,
    accent: "#c8a24a",
    featured: true,
  },
  {
    id: "p3",
    slug: "clarion-daily-lenses",
    name: { ar: "عدسات كلاريون اليومية", en: "Clarion Daily Lenses" },
    brand: "Clarion",
    category: "contact-lenses",
    price: 35000,
    accent: "#2a9d8f",
    featured: true,
  },
  {
    id: "p4",
    slug: "monarch-cat-eye",
    name: { ar: "إطار مونارك كات-آي", en: "Monarch Cat-Eye" },
    brand: "Monarch",
    category: "optical",
    price: 95000,
    accent: "#9d4edd",
    featured: true,
  },
  {
    id: "p5",
    slug: "coastline-wayfarer",
    name: { ar: "نظارة كوستلاين وايفيرر", en: "Coastline Wayfarer" },
    brand: "Coastline",
    category: "sunglasses",
    price: 110000,
    accent: "#e76f51",
    featured: true,
  },
  {
    id: "p6",
    slug: "titanium-rimless",
    name: { ar: "إطار تيتانيوم بدون حواف", en: "Titanium Rimless" },
    brand: "Aurora",
    category: "optical",
    price: 140000,
    accent: "#1b263b",
    featured: true,
  },
  {
    id: "p7",
    slug: "horizon-round",
    name: { ar: "نظارة هورايزون الدائرية", en: "Horizon Round" },
    brand: "Horizon",
    category: "sunglasses",
    price: 99000,
    accent: "#0d6efd",
  },
  {
    id: "p8",
    slug: "vivid-monthly-lenses",
    name: { ar: "عدسات فيفيد الشهرية", en: "Vivid Monthly Lenses" },
    brand: "Vivid",
    category: "contact-lenses",
    price: 45000,
    accent: "#d62828",
  },
  {
    id: "p9",
    slug: "premium-cleaning-kit",
    name: { ar: "طقم تنظيف فاخر", en: "Premium Cleaning Kit" },
    brand: "Zando",
    category: "accessories",
    price: 15000,
    accent: "#588157",
  },
  {
    id: "p10",
    slug: "leather-hard-case",
    name: { ar: "علبة نظارات جلدية", en: "Leather Hard Case" },
    brand: "Zando",
    category: "accessories",
    price: 20000,
    accent: "#6f4518",
  },
  {
    id: "p11",
    slug: "eclipse-sport",
    name: { ar: "نظارة إكليبس الرياضية", en: "Eclipse Sport" },
    brand: "Eclipse",
    category: "sunglasses",
    price: 130000,
    accent: "#023047",
  },
  {
    id: "p12",
    slug: "clarity-blue-light",
    name: { ar: "إطار كلاريتي للضوء الأزرق", en: "Clarity Blue-Light Frame" },
    brand: "Clarity",
    category: "optical",
    price: 75000,
    accent: "#457b9d",
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
