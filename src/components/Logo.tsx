import type { SVGProps } from "react";

/**
 * Z&O eye monogram recreated as vector art from the brand logo:
 * a gold almond eye with a white iris ring and a small "Q" tail.
 * Colors are fixed (gold + white) since the mark always sits on a dark surface.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 72" fill="none" {...props}>
      <path
        d="M10 42C34 12 94 12 118 38"
        stroke="#caaa70"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M20 46C42 66 86 66 108 48"
        stroke="#caaa70"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="64" cy="42" r="17" stroke="#ffffff" strokeWidth="5" />
      <path d="M74 52l9 10" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
