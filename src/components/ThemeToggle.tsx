"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Day/Night theme toggle. Initial theme is picked by the inline head script
 * (auto by the visitor's local time, or their saved manual choice); this just
 * flips the `.dark` class on <html> and persists the manual override.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    root.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "الوضع النهاري" : "الوضع الليلي"}
      title={dark ? "الوضع النهاري" : "الوضع الليلي"}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold-light",
        className,
      )}
    >
      {/* keep icon stable until mounted to avoid hydration mismatch */}
      {mounted && dark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
