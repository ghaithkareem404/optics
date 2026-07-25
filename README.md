# Zando Optics — زاندو للبصريات

A modern, bilingual (Arabic / English) website for **Z & O Optics**, a luxury
eyewear & optics store in Baghdad. Rebuilt with a professional, scalable stack.

> ملاحظة: تمّ بناء هذا الموقع بتصميم عصري جديد مع **صور ورسوم مؤقتة (placeholder)**.
> استبدل النصوص والأسعار والصور وروابط التواصل بمعلوماتك الحقيقية (انظر قسم التخصيص أدناه).

## ✨ Features

- **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**
- **Bilingual** Arabic (RTL) & English (LTR) with automatic locale detection
- Fully **responsive** and mobile-first
- **SEO-ready**: per-page metadata, Open Graph, semantic HTML
- Clean, **data-driven** content (products, brands, services, testimonials)
- Placeholder SVG artwork — swap in real photos with zero code changes
- Accessible components, dark premium palette

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /ar
```

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## 🗂️ Project structure

```
src/
├── app/
│   ├── icon.svg                 # favicon
│   └── [locale]/                # ar | en — locale is the first URL segment
│       ├── layout.tsx           # root layout (html/dir, navbar, footer)
│       ├── page.tsx             # home
│       ├── products/            # catalog with category filter
│       ├── services/
│       ├── about/
│       └── contact/             # info + map + demo form
├── components/                  # UI + sections (Hero, Footer, cards, ...)
├── data/                        # products, brands, services, testimonials, social
├── i18n/                        # ar.json, en.json dictionaries + config
├── lib/                         # small helpers
└── middleware.ts                # locale detection & redirect
```

## 🛠️ Customizing your content

Everything is data-driven — you rarely need to touch components:

| What | Where |
| --- | --- |
| UI text / labels | `src/i18n/ar.json`, `src/i18n/en.json` |
| Products & prices | `src/data/products.ts` |
| Brands | `src/data/brands.ts` |
| Services | `src/data/services.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Social links | `src/data/social.ts` |
| Phone / email / address | `contact.*` in the i18n files |
| Colors / theme | `tailwind.config.ts` |

### Adding real product photos

1. Drop the image in `public/products/your-photo.jpg`.
2. Add `image: "/products/your-photo.jpg"` to that product in
   `src/data/products.ts`.

The placeholder SVG is replaced automatically — no other changes needed.

### Connecting the contact form

`src/components/ContactForm.tsx` is a demo (no network call). Wire it to an API
route (`src/app/api/contact/route.ts`), an email service, or a booking system.

## 📦 Deployment

Deploys anywhere Next.js runs. One-click on **Vercel**: import the repo and
deploy — no configuration required.

---

Built with Next.js + TypeScript + Tailwind CSS.
