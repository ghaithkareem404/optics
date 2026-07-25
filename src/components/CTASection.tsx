import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink, Container } from "./ui";
import { PhoneIcon } from "./Icons";

export function CTASection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-ink-soft px-8 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -top-16 h-56 w-56 rounded-full bg-gold blur-3xl ltr:left-1/4 rtl:right-1/4" />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{dict.cta.title}</h2>
            <p className="mt-4 text-white/75">{dict.cta.subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={`/${locale}/contact`} variant="primary">
                {dict.cta.button}
              </ButtonLink>
              <a
                href={`tel:${dict.contact.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold-light"
              >
                <PhoneIcon className="h-4 w-4" />
                {dict.cta.call}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
