import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from "@/components/Icons";
import { socialLinks } from "@/data/social";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const dict = await getDictionary(params.locale);
  return { title: dict.contact.title, description: dict.contact.subtitle };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = await getDictionary(params.locale);
  const c = dict.contact;

  const info = [
    { icon: MapPinIcon, label: c.addressLabel, value: c.address, dir: undefined },
    { icon: PhoneIcon, label: c.phoneLabel, value: c.phone, dir: "ltr" as const },
    { icon: MailIcon, label: c.emailLabel, value: c.email, dir: "ltr" as const },
    { icon: ClockIcon, label: c.hoursLabel, value: c.hours, dir: undefined },
  ];

  return (
    <>
      <PageHeader title={c.title} subtitle={c.subtitle} />
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <ul className="space-y-5">
                {info.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold-dark">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-ink-muted">{item.label}</span>
                      <span className="block font-medium text-ink" dir={item.dir}>
                        {item.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <span className="block text-sm font-semibold text-ink">{c.followUs}</span>
                <ul className="mt-3 flex gap-3">
                  {socialLinks.map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-muted transition-colors hover:border-gold hover:text-gold-dark"
                        dangerouslySetInnerHTML={{ __html: social.icon }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10">
                <iframe
                  title="Baghdad map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=44.28%2C33.25%2C44.50%2C33.40&layer=mapnik"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-ink/5 bg-cream p-6 sm:p-8">
              <ContactForm
                labels={{
                  name: c.formName,
                  email: c.formEmail,
                  phone: c.formPhone,
                  message: c.formMessage,
                  submit: c.formSubmit,
                  note: c.formNote,
                  success: c.formSuccess,
                }}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
