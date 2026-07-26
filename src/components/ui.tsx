import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-ink-muted">{subtitle}</p> : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-gold text-night hover:bg-gold-dark hover:text-white shadow-card",
  secondary: "bg-night text-white hover:bg-night-soft",
  ghost: "border border-ink/20 text-ink hover:border-gold hover:text-gold-dark",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
