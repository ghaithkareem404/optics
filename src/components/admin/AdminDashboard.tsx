"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BrandOption {
  id: string;
  label: string;
  name: string;
}

interface Model {
  id: string;
  brandId: string;
  name: string;
  url: string;
  createdAt: number;
}

export function AdminDashboard({
  brands,
  initialModels,
}: {
  brands: BrandOption[];
  initialModels: Model[];
}) {
  const router = useRouter();
  const [models, setModels] = useState<Model[]>(initialModels);
  const [activeBrand, setActiveBrand] = useState(brands[0]?.id ?? "");
  const [name, setName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const brandModels = useMemo(
    () => models.filter((m) => m.brandId === activeBrand),
    [models, activeBrand],
  );

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      setMsg({ kind: "err", text: "الملف يجب أن يكون صورة." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const form = new FormData();
      form.append("brandId", activeBrand);
      form.append("name", name);
      form.append("image", file);
      const res = await fetch("/api/admin/models", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.item) {
        setModels((prev) => [data.item, ...prev]);
        setName("");
        setMsg({ kind: "ok", text: "تم رفع الصورة بنجاح." });
      } else if (data.error === "storage_not_configured") {
        setMsg({ kind: "err", text: "لم يُفعّل التخزين (Vercel Blob) بعد." });
      } else if (data.error === "unauthorized") {
        router.refresh();
      } else {
        setMsg({ kind: "err", text: "تعذّر رفع الصورة، حاول مجدداً." });
      }
    } catch {
      setMsg({ kind: "err", text: "خطأ في الاتصال." });
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("حذف هذه الصورة نهائياً؟")) return;
    const res = await fetch(`/api/admin/models/${id}`, { method: "DELETE" });
    if (res.ok) {
      setModels((prev) => prev.filter((m) => m.id !== id));
    } else {
      setMsg({ kind: "err", text: "تعذّر الحذف." });
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">إدارة الموديلات</h1>
          <p className="text-sm text-ink-muted">أضف أو احذف صور الموديلات تحت كل براند.</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-red-400 hover:text-red-600"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Brand tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {brands.map((b) => {
          const count = models.filter((m) => m.brandId === b.id).length;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBrand(b.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeBrand === b.id
                  ? "border-gold bg-gold text-ink"
                  : "border-ink/15 bg-white text-ink-muted hover:border-gold",
              )}
            >
              {b.label}
              <span className="ms-1 text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Upload zone */}
      <div className="mt-6 rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
        <input
          className="mb-3 w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
          placeholder="اسم الموديل (اختياري)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
            dragging ? "border-gold bg-gold/5" : "border-ink/15 hover:border-gold/60",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 16V4m0 0 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
          </svg>
          <p className="mt-3 text-sm font-medium text-ink">
            {busy ? "جارٍ الرفع…" : "اسحب الصورة هنا أو اضغط للاختيار"}
          </p>
          <p className="mt-1 text-xs text-ink-muted">JPG / PNG / WEBP — حتى 8MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </div>
        {msg ? (
          <p className={cn("mt-3 text-sm font-medium", msg.kind === "ok" ? "text-green-700" : "text-red-600")}>
            {msg.text}
          </p>
        ) : null}
      </div>

      {/* Gallery */}
      <div className="mt-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          الصور الحالية ({brandModels.length})
        </h2>
        {brandModels.length === 0 ? (
          <p className="rounded-xl border border-dashed border-ink/15 bg-white py-10 text-center text-sm text-ink-muted">
            لا توجد صور تحت هذا البراند بعد.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brandModels.map((m) => (
              <div key={m.id} className="group relative overflow-hidden rounded-xl border border-ink/5 bg-white shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name || "model"} className="aspect-square w-full object-cover" loading="lazy" />
                {m.name ? (
                  <p className="truncate px-3 py-2 text-xs font-medium text-ink">{m.name}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => remove(m.id)}
                  aria-label="حذف"
                  className="absolute top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 opacity-0 shadow transition-opacity hover:bg-red-600 hover:text-white group-hover:opacity-100 ltr:right-2 rtl:left-2"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
