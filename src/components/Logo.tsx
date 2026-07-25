import type { SVGProps } from "react";

/** Z&O eye monogram — a stylised eye, matching the brand mark on zandooptics.com. */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 48" fill="none" {...props}>
      <path
        d="M6 24C6 24 18 9 36 9s30 15 30 15-12 15-30 15S6 24 6 24Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="24" r="8.5" stroke="currentColor" strokeWidth="3" />
      <circle cx="36" cy="24" r="2.6" fill="currentColor" />
    </svg>
  );
}
