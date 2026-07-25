import type { SVGProps } from "react";

/** Z&O monogram formed from two lenses — the brand mark. */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="16" cy="26" r="10" stroke="currentColor" strokeWidth="3" />
      <circle cx="34" cy="22" r="8" stroke="currentColor" strokeWidth="3" />
      <path
        d="M24.5 25.5c1-2 4-2.5 5.5-1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6.5 22 10 15M41.5 16 44 11"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
