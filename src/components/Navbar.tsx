"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales, localeLabel } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface NavDict {
  home: string;
  products: string;
  services: string;
  about: string;
  contact: string;
  book: string;
}

export function Navbar({
  locale,
  nav,
  brandName,
}: {
  locale: Locale;
  nav: NavDict;
  brandName: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/products`, label: nav.products },
    { href: `/${locale}/services`, label: nav.services },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const otherLocale = locales.find((l) => l !== locale) ?? locale;
  const switchedPath =
    pathname.replace(new RegExp(`^/${locale}`), `/${otherLocale}`) || `/${otherLocale}`;

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-white/90 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Logo className="h-9 w-9 text-gold" />
          <span className="font-display text-lg font-bold text-ink">{brandName}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-gold-dark"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={switchedPath}
            className="rounded-full border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold-dark"
            aria-label="Switch language"
          >
            {localeLabel[otherLocale]}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-white sm:inline-block"
          >
            {nav.book}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
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

      {open ? (
        <div className="border-t border-ink/5 bg-white lg:hidden">
          <ul className="container flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium",
                    isActive(link.href) ? "bg-cream text-gold-dark" : "text-ink-muted",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-gold px-3 py-2.5 text-center text-sm font-semibold text-ink"
              >
                {nav.book}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
