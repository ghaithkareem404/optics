import Image from "next/image";

/**
 * Placeholder product artwork: a stylised eyewear illustration tinted with the
 * product's accent color. When you have real photos, pass `image` on the product
 * and this component renders that instead — no other changes needed.
 */
export function ProductArt({
  accent,
  image,
  alt,
}: {
  accent: string;
  image?: string;
  alt: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label={alt}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" fill={`url(#bg-${accent})`} />
      <g
        transform="translate(160 112)"
        fill="none"
        stroke={accent}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="-52" cy="0" r="40" />
        <circle cx="52" cy="0" r="40" />
        <path d="M-12 -4c8 -10 24 -10 24 0" />
        <path d="M-92 -12 -116 -30" />
        <path d="M92 -12 116 -30" />
      </g>
    </svg>
  );
}
