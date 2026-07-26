import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "./ui";
import { EyeIcon, ShieldIcon, GlassesIcon, SparkleIcon, LensIcon, ClockIcon } from "./Icons";

const icons = [EyeIcon, ShieldIcon, GlassesIcon, SparkleIcon, LensIcon, ClockIcon];

export function WhyChooseUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-night py-20 text-white">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold-light">
            {dict.brand.tagline}
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{dict.whyUs.title}</h2>
          <p className="mt-3 text-white/70">{dict.whyUs.subtitle}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dict.whyUs.items.map((item, i) => {
            const Icon = icons[i] ?? ShieldIcon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-gold/40"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-light">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/65">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
