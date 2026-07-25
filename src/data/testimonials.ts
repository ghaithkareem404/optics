import type { Localized } from "./types";

export interface Testimonial {
  id: string;
  name: Localized;
  role: Localized;
  quote: Localized;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: { ar: "أحمد الربيعي", en: "Ahmed Al-Rubaie" },
    role: { ar: "عميل", en: "Customer" },
    rating: 5,
    quote: {
      ar: "خدمة ممتازة وفحص نظر دقيق. اخترت نظارة رائعة والموظفون محترفون جداً.",
      en: "Excellent service and a precise eye exam. I picked a great pair and the staff are very professional.",
    },
  },
  {
    id: "t2",
    name: { ar: "سارة حسين", en: "Sara Hussein" },
    role: { ar: "عميلة", en: "Customer" },
    rating: 5,
    quote: {
      ar: "أفضل مكان للنظارات في بغداد. جودة العدسات السويسرية فرق كبير فعلاً.",
      en: "The best place for glasses in Baghdad. The Swiss lenses genuinely make a big difference.",
    },
  },
  {
    id: "t3",
    name: { ar: "مصطفى كريم", en: "Mustafa Kareem" },
    role: { ar: "عميل", en: "Customer" },
    rating: 5,
    quote: {
      ar: "ماركات أصلية وأسعار عادلة وخدمة سريعة. أنصح الجميع بالتعامل معهم.",
      en: "Authentic brands, fair prices and fast service. I recommend them to everyone.",
    },
  },
];
