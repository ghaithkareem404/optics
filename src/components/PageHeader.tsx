import { Container } from "./ui";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="border-b border-ink/5 bg-cream py-14">
      <Container>
        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-ink-muted">{subtitle}</p> : null}
      </Container>
    </section>
  );
}
