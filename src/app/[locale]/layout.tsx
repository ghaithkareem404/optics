import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, localeDirection, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return {
    title: {
      default: `${dict.brand.name} — ${dict.brand.tagline}`,
      template: `%s · ${dict.brand.name}`,
    },
    description: dict.footer.about,
    openGraph: {
      title: `${dict.brand.name} — ${dict.brand.tagline}`,
      description: dict.footer.about,
      type: "website",
      locale: params.locale === "ar" ? "ar_IQ" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={localeDirection[locale]}>
      <body className="flex min-h-screen flex-col">
        <Navbar locale={locale} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
