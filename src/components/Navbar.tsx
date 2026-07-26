"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales, localeLabel } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

interface NavDict {
  home: string;
  about: string;
  services: string;
  optical: string;
  contactLenses: string;
  brands: string;
  accessories: string;
  contact: string;
}

export function Navbar({
  locale,
  nav,
}: {
  locale: Locale;
  nav: NavDict;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Full menu mirroring zandooptics.com (right-to-left order).
  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/services`, label: nav.services },
    { href: `/${locale}/category/optical`, label: nav.optical },
    { href: `/${locale}/category/contact-lenses`, label: nav.contactLenses },
    { href: `/${locale}/category/brands`, label: nav.brands },
    { href: `/${locale}/category/accessories`, label: nav.accessories },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const otherLocale = locales.find((l) => l !== locale) ?? locale;
  const switchedPath =
    pathname.replace(new RegExp(`^/${locale}`), `/${otherLocale}`) || `/${otherLocale}`;

  const isActive = (href: string, i: number) =>
    i === 0 ? pathname === href : pathname === href;

  const brandSub = locale === "ar" ? "للبصريات" : "Optics";

  return (
    <header className="sticky top-0 z-50 bg-night text-white shadow-lg">
      <nav className="container flex h-20 items-center justify-between gap-4">
        {/* Brand (right in RTL) */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-10 w-14 text-gold" />
          <span className="leading-none">
            <span className="block font-display text-xl font-bold tracking-wide text-white">Z&amp;O</span>
            <span className="block text-[11px] tracking-widest text-gold-light">{brandSub}</span>
          </span>
        </Link>

        {/* Menu (center) */}
        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link, i) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href, i) ? "text-gold" : "text-white/85 hover:text-gold-light",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions (left) */}
        <div className="flex items-center gap-3">
          <Link
            href={switchedPath}
            className="hidden items-center gap-1 text-sm font-medium text-white/85 transition-colors hover:text-gold-light sm:flex"
            aria-label="Switch language"
          >
            {localeLabel[locale]}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href={`/${locale}/search`}
            aria-label={locale === "ar" ? "بحث" : "Search"}
            className="hidden h-11 w-11 items-center justify-center rounded-full bg-gold text-night transition-colors hover:bg-gold-light sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-white/10 bg-night xl:hidden">
          <ul className="container flex flex-col py-3">
            {links.map((link, i) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium",
                    isActive(link.href, i) ? "text-gold" : "text-white/85",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/search`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85"
              >
                {locale === "ar" ? "بحث" : "Search"}
              </Link>
            </li>
            <li>
              <Link
                href={switchedPath}
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium text-gold-light"
              >
                {localeLabel[otherLocale]}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
