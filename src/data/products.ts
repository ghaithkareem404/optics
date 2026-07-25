import type { Product } from "./types";

// Placeholder catalog aligned to Z&O Optics categories & brands.
// Replace names, prices and add `image` paths when you export your WooCommerce products.
const G = "#caaa70"; // gold
const T = "#1accbf"; // teal
const D = "#a9884e"; // dark gold
const K = "#14a79c"; // dark teal

export const products: Product[] = [
  { id: "p1", slug: "optiswiss-progressive", name: { ar: "عدسات أوبتي سويس متدرجة", en: "Optiswiss Progressive Lens" }, brand: "Optiswiss", category: "optical", price: 140000, accent: G, featured: true },
  { id: "p2", slug: "titanium-optical-frame", name: { ar: "إطار طبي تيتانيوم", en: "Titanium Optical Frame" }, brand: "Z&O", category: "optical", price: 95000, accent: D, featured: true },
  { id: "p3", slug: "acuvue-daily", name: { ar: "عدسات أكيوفيو اليومية", en: "Acuvue Daily Lenses" }, brand: "Acuvue", category: "contact-lenses", price: 35000, accent: T, featured: true },
  { id: "p4", slug: "bella-monthly-colored", name: { ar: "عدسات بيلا الملونة الشهرية", en: "Bella Colored Monthly" }, brand: "Bella", category: "contact-lenses", price: 30000, accent: K, featured: true },
  { id: "p5", slug: "aviator-sunglasses", name: { ar: "نظارة شمسية أفياتور", en: "Aviator Sunglasses" }, brand: "Z&O", category: "sunglasses", price: 120000, accent: G, featured: true },
  { id: "p6", slug: "swarovski-chain", name: { ar: "سلسلة نظارات سواروفسكي", en: "Swarovski Eyewear Chain" }, brand: "Swarovski", category: "accessories", price: 45000, accent: T, featured: true },
  { id: "p7", slug: "cat-eye-optical", name: { ar: "إطار طبي كات-آي", en: "Cat-Eye Optical Frame" }, brand: "Z&O", category: "optical", price: 88000, accent: K },
  { id: "p8", slug: "wayfarer-sunglasses", name: { ar: "نظارة شمسية وايفيرر", en: "Wayfarer Sunglasses" }, brand: "Z&O", category: "sunglasses", price: 110000, accent: D },
  { id: "p9", slug: "bella-daily-natural", name: { ar: "عدسات بيلا يومية طبيعية", en: "Bella Daily Natural" }, brand: "Bella", category: "contact-lenses", price: 28000, accent: T },
  { id: "p10", slug: "blue-light-frame", name: { ar: "إطار حماية الضوء الأزرق", en: "Blue-Light Frame" }, brand: "Z&O", category: "optical", price: 75000, accent: G },
  { id: "p11", slug: "premium-case", name: { ar: "علبة نظارات فاخرة", en: "Premium Glasses Case" }, brand: "Z&O", category: "accessories", price: 15000, accent: K },
  { id: "p12", slug: "sport-sunglasses", name: { ar: "نظارة شمسية رياضية", en: "Sport Sunglasses" }, brand: "Z&O", category: "sunglasses", price: 130000, accent: D },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
