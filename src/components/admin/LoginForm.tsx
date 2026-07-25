"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(
        data.error === "not_configured"
          ? "لم تُضبط بيانات الدخول بعد على الخادم."
          : "اسم المستخدم أو كلمة المرور غير صحيحة.",
      );
    } catch {
      setError("تعذّر الاتصال، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-gold";

  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-ink/5 bg-white p-8 shadow-card">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-20 items-center justify-center rounded-xl bg-ink">
          <Logo className="h-8 w-12" />
        </span>
        <h1 className="mt-4 font-display text-xl font-bold text-ink">لوحة تحكم Z&amp;O</h1>
        <p className="mt-1 text-sm text-ink-muted">سجّل الدخول لإدارة صور الموديلات</p>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          className={field}
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          className={field}
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-white disabled:opacity-60"
        >
          {loading ? "جارٍ الدخول…" : "دخول"}
        </button>
      </form>
    </div>
  );
}
