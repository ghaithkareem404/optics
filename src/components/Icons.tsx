import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function LensIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16" />
      <path d="M8.5 8.5a5 5 0 0 1 3-1.5" />
    </svg>
  );
}

export function GlassesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="14" r="3.2" />
      <circle cx="18" cy="14" r="3.2" />
      <path d="M9.2 14c.8-1.5 4.8-1.5 5.6 0" />
      <path d="M2.8 12 4.5 8h2M21.2 12 19.5 8h-2" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.4-3.6" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8c.8 2.2 1.8 3.2 4 4-2.2.8-3.2 1.8-4 4-.8-2.2-1.8-3.2-4-4 2.2-.8 3.2-1.8 4-4Z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.8 3 1.1-6.5L2.6 8.8l6.5-.9L12 2Z" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5c0 8 7 15 15 15l1.5-3.5-4-2-1.5 2c-2.5-1-4.5-3-5.5-5.5l2-1.5-2-4L4 5Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

const iconMap = {
  eye: EyeIcon,
  lens: LensIcon,
  glasses: GlassesIcon,
  shield: ShieldIcon,
  sparkle: SparkleIcon,
  clock: ClockIcon,
} as const;

export type ServiceIconName = keyof typeof iconMap;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & IconProps) {
  const Component = iconMap[name] ?? EyeIcon;
  return <Component {...props} />;
}
