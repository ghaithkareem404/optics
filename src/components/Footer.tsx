import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./ui";
import { Logo } from "./Logo";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "./Icons";
import { socialLinks } from "@/data/social";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="bg-night text-white">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-9 w-9 text-gold" />
            <span className="font-display text-lg font-bold">{dict.brand.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{dict.footer.about}</p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-gold-light">
            {dict.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 transition-colors hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-gold-light">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {dict.contact.address}
                <span className="block text-white/45">{dict.contact.branch2}</span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${dict.contact.phone.replace(/\s+/g, "")}`} dir="ltr" className="transition-colors hover:text-gold-light">
                {dict.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 shrink-0 text-gold" />
              {dict.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 shrink-0 text-gold" />
              {dict.contact.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-gold-light">
            {dict.contact.followUs}
          </h3>
          <ul className="mt-4 flex gap-3">
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold-light"
                  dangerouslySetInnerHTML={{ __html: social.icon }}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            {dict.footer.madeWith}. {dict.footer.rights}. © {new Date().getFullYear()}
          </p>
          <p>Next.js + TypeScript</p>
        </Container>
      </div>
    </footer>
  );
}
