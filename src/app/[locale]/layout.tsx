import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, localeDirection, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

// Runs before paint: apply the saved theme, or auto-pick by the visitor's local
// hour (day 7:00–18:59 → light, otherwise dark). Prevents a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){var h=new Date().getHours();t=(h>=7&&h<19)?'light':'dark';}var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.dataset.theme=t;}catch(e){}})();`;

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

  const chatConfig = {
    title: dict.chat.title,
    status: dict.chat.status,
    greeting: dict.chat.greeting,
    placeholder: dict.chat.placeholder,
    hint: dict.chat.hint,
    whatsapp: dict.chat.whatsapp,
    q: dict.chat.q,
    a: dict.chat.a,
    hoursText: `${dict.homeHours.from} — ${dict.homeHours.to} · ${dict.homeHours.days}`,
    address: dict.contact.address,
    branch2: dict.contact.branch2,
    phone: dict.contact.phone,
    waNumber: dict.contact.phone.replace(/\D/g, ""),
  };

  return (
    <html lang={locale} dir={localeDirection[locale]}>
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Navbar locale={locale} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <ChatWidget config={chatConfig} locale={locale} />
      </body>
    </html>
  );
}
