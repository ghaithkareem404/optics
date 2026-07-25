import type { Brand } from "./types";

// Real brands carried by Z&O Optics (from zandooptics.com). Swap in logo images later.
export const brands: Brand[] = [
  {
    id: "optiswiss",
    name: "Optiswiss",
    note: { ar: "عدسات أوبتي سويس", en: "Optiswiss lenses" },
    accent: "#caaa70",
    featured: true,
    description: {
      ar: "دقة سويسرية منذ عام 1937. عدسات بصرية عالية الجودة مصنعة بتقنيات رقمية مدعومة بالذكاء الاصطناعي، وحاصلة على اعتمادات CE و FDA الدولية.",
      en: "Swiss precision since 1937. High-quality optical lenses made with AI-powered digital technology, certified by CE and FDA international standards.",
    },
  },
  {
    id: "acuvue",
    name: "Acuvue",
    note: { ar: "عدسات أكيوفيو", en: "Acuvue lenses" },
    accent: "#1accbf",
    featured: true,
    description: {
      ar: "مصنعة بأعلى معايير الجودة الطبية العالمية وحاصلة على اعتمادات FDA و CE. تتميز بتقنيات مبتكرة تضمن ترطيب العين وراحة فائقة تدوم طوال اليوم.",
      en: "Made to the highest global medical standards and FDA/CE certified. Innovative technologies ensure eye hydration and superior all-day comfort.",
    },
  },
  {
    id: "bella",
    name: "Bella",
    note: { ar: "عدسات بيلا", en: "Bella lenses" },
    accent: "#a9884e",
    featured: true,
    description: {
      ar: "سحر الأناقة والأمان الطبي في آن واحد. عدسات كورية أصلية معتمدة من FDA و CE، متوفرة بخيارات يومية وشهرية تمنحك إطلالة طبيعية ساحرة ووضوحاً استثنائياً.",
      en: "The charm of elegance with medical safety. Authentic Korean lenses, FDA/CE certified, available in daily and monthly options for a naturally captivating look.",
    },
  },
  {
    id: "swarovski",
    name: "Swarovski",
    note: { ar: "إكسسوارات سواروفسكي", en: "Swarovski accessories" },
    accent: "#14a79c",
    featured: true,
    description: {
      ar: "الأناقة تكمن في التفاصيل. تشكيلة راقية من سلاسل النظارات الفاخرة المصنوعة يدوياً والمرصعة بأحجار سواروفسكي الكريستالية الأصلية لتضفي لمسة من البريق والفخامة.",
      en: "Elegance is in the details. A refined range of luxury eyewear chains, handcrafted and set with authentic Swarovski crystals for a touch of sparkle and luxury.",
    },
  },
];

export function getFeaturedBrands(): Brand[] {
  return brands.filter((b) => b.featured);
}
