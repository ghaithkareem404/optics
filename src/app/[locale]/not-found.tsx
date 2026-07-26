import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream px-4 text-center text-ink">
      <div>
        <p className="font-display text-6xl font-bold text-gold">404</p>
        <p className="mt-4 text-ink-muted">الصفحة غير موجودة · Page not found</p>
        <Link
          href="/ar"
          className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-night"
        >
          العودة للرئيسية · Back home
        </Link>
      </div>
    </div>
  );
}
