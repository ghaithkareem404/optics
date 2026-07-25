import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "s1",
    icon: "eye",
    title: { ar: "فحص النظر", en: "Eye Examination" },
    description: {
      ar: "فحص شامل ودقيق للعين باستخدام أحدث الأجهزة وعلى يد مختصين معتمدين.",
      en: "A thorough, precise eye exam using the latest equipment by certified specialists.",
    },
  },
  {
    id: "s2",
    icon: "lens",
    title: { ar: "عدسات OptiSwiss", en: "OptiSwiss Lenses" },
    description: {
      ar: "عدسات سويسرية عالية الوضوح والمتانة، نحن الوكيل الرسمي لها في العراق.",
      en: "High-clarity, durable Swiss lenses — we are the official agent in Iraq.",
    },
  },
  {
    id: "s3",
    icon: "glasses",
    title: { ar: "تركيب وضبط النظارات", en: "Fitting & Adjustment" },
    description: {
      ar: "ضبط دقيق لإطار نظارتك ليناسب وجهك ويمنحك أعلى درجات الراحة.",
      en: "Precise frame fitting tailored to your face for maximum comfort.",
    },
  },
  {
    id: "s4",
    icon: "shield",
    title: { ar: "ضمان الأصالة", en: "Authenticity Warranty" },
    description: {
      ar: "جميع المنتجات أصلية 100% مع ضمان رسمي من الوكلاء المعتمدين.",
      en: "All products are 100% authentic with an official warranty from certified agents.",
    },
  },
  {
    id: "s5",
    icon: "sparkle",
    title: { ar: "استشارة الأناقة", en: "Style Consultation" },
    description: {
      ar: "نساعدك في اختيار النظارة الأنسب لملامحك وأسلوب حياتك.",
      en: "We help you choose the frame that best suits your features and lifestyle.",
    },
  },
  {
    id: "s6",
    icon: "clock",
    title: { ar: "خدمة سريعة", en: "Fast Service" },
    description: {
      ar: "تجهيز نظارتك بسرعة وكفاءة دون المساس بجودة العمل.",
      en: "Your glasses prepared quickly and efficiently without compromising quality.",
    },
  },
];
