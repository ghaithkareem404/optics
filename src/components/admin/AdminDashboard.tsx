"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BrandOption {
  id: string;
  label: string;
  name: string;
}

interface Collection {
  id: string;
  brandId: string;
  name: string;
  createdAt: number;
}

interface Model {
  id: string;
  brandId: string;
  collectionId: string;
  name: string;
  pathname: string;
  url: string;
  createdAt: number;
}

export function AdminDashboard({
  brands,
  initialCollections,
  initialModels,
}: {
  brands: BrandOption[];
  initialCollections: Collection[];
  initialModels: Model[];
}) {
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [models, setModels] = useState<Model[]>(initialModels);
  const [activeBrand, setActiveBrand] = useState(brands[0]?.id ?? "");
  const [activeCol, setActiveCol] = useState<string | null>(null);
  const [newCol, setNewCol] = useState("");
  const [imgName, setImgName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const brandCollections = useMemo(
    () => collections.filter((c) => c.brandId === activeBrand),
    [collections, activeBrand],
  );
  const colModels = useMemo(
    () => models.filter((m) => m.collectionId === activeCol),
    [models, activeCol],
  );
  const activeCollection = brandCollections.find((c) => c.id === activeCol) || null;

  function pickBrand(id: string) {
    setActiveBrand(id);
    setActiveCol(null);
    setMsg(null);
  }

  async function createCollection() {
    const name = newCol.trim();
    if (!name) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId: activeBrand, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.item) {
        setCollections((prev) => [data.item, ...prev]);
        setActiveCol(data.item.id);
        setNewCol("");
      } else {
        setMsg({ kind: "err", text: "تعذّر إنشاء التصنيف." });
      }
    } finally {
      setBusy(false);
    }
  }

  async function renameCollection(id: string, current: string) {
    const name = prompt("الاسم الجديد للتصنيف:", current);
    if (name === null) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    const res = await fetch(`/api/admin/collections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    });
    if (res.ok) {
      setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c)));
    }
  }

  async function removeCollection(id: string) {
    if (!confirm("حذف هذا التصنيف وكل صوره نهائياً؟")) return;
    const res = await fetch(`/api/admin/collections/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      setModels((prev) => prev.filter((m) => m.collectionId !== id));
      if (activeCol === id) setActiveCol(null);
    }
  }

  async function upload(file: File) {
    if (!activeCol) return;
    if (!file.type.startsWith("image/")) {
      setMsg({ kind: "err", text: "الملف يجب أن يكون صورة." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const form = new FormData();
      form.append("brandId", activeBrand);
      form.append("collectionId", activeCol);
      form.append("name", imgName);
      form.append("image", file);
      const res = await fetch("/api/admin/models", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.item) {
        setModels((prev) => [data.item, ...prev]);
        setImgName("");
        setMsg({ kind: "ok", text: "تم رفع الصورة بنجاح." });
      } else if (data.error === "unauthorized") {
        router.refresh();
      } else if (data.error === "upload_failed") {
        setMsg({ kind: "err", text: "تعذّر الرفع: " + (data.detail || "خطأ غير معروف") });
      } else {
        setMsg({ kind: "err", text: "تعذّر رفع الصورة، حاول مجدداً." });
      }
    } catch {
      setMsg({ kind: "err", text: "خطأ في الاتصال." });
    } finally {
      setBusy(false);
    }
  }

  async function removeModel(id: string) {
    if (!confirm("حذف هذه الصورة نهائياً؟")) return;
    const res = await fetch(`/api/admin/models/${id}`, { method: "DELETE" });
    if (res.ok) setModels((prev) => prev.filter((m) => m.id !== id));
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const field =
    "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-gold";

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">إدارة الموديلات</h1>
          <p className="text-sm text-ink-muted">
            اختر البراند، أنشئ تصنيفاً فرعياً، ثم ارفع صوره بداخله.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-red-400 hover:text-red-600"
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Step 1: brand */}
      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        ١) البراند
      </p>
      <div className="flex flex-wrap gap-2">
        {brands.map((b) => {
          const count = models.filter((m) => m.brandId === b.id).length;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => pickBrand(b.id)}
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

      {/* Step 2: collections */}
      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        ٢) التصنيف الفرعي
      </p>
      <div className="rounded-2xl border border-ink/5 bg-white p-4 shadow-card">
        <div className="flex flex-wrap gap-2">
          {brandCollections.map((c) => {
            const count = models.filter((m) => m.collectionId === c.id).length;
            const on = activeCol === c.id;
            return (
              <div
                key={c.id}
                className={cn(
                  "flex items-center gap-1 rounded-full border py-1 ps-3 pe-1 transition-colors",
                  on ? "border-gold bg-gold/10" : "border-ink/15 bg-white",
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveCol(c.id)}
                  className={cn("text-sm font-medium", on ? "text-gold-dark" : "text-ink")}
                >
                  {c.name}
                  <span className="ms-1 text-xs opacity-60">({count})</span>
                </button>
                <button
                  type="button"
                  onClick={() => renameCollection(c.id, c.name)}
                  aria-label="إعادة تسمية"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-ink-muted hover:bg-ink/5 hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 20h4L18 10l-4-4L4 16v4Z" strokeLinejoin="round" />
                    <path d="m14 6 4 4" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => removeCollection(c.id)}
                  aria-label="حذف التصنيف"
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            );
          })}
          {brandCollections.length === 0 ? (
            <span className="py-1 text-sm text-ink-muted">لا توجد تصنيفات بعد — أنشئ واحداً.</span>
          ) : null}
        </div>

        {/* add collection */}
        <div className="mt-3 flex gap-2">
          <input
            className={field}
            placeholder="اسم تصنيف جديد (مثال: نظارات رجالية 2026)"
            value={newCol}
            onChange={(e) => setNewCol(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createCollection();
              }
            }}
          />
          <button
            type="button"
            onClick={createCollection}
            disabled={busy || !newCol.trim()}
            className="shrink-0 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-50"
          >
            + إضافة
          </button>
        </div>
      </div>

      {/* Step 3: images inside the selected collection */}
      <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        ٣) الصور
      </p>
      {!activeCol ? (
        <p className="rounded-2xl border border-dashed border-ink/15 bg-white py-10 text-center text-sm text-ink-muted">
          اختر تصنيفاً فرعياً بالأعلى (أو أنشئ واحداً) لبدء رفع الصور بداخله.
        </p>
      ) : (
        <div className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center gap-2 text-sm">
            <span className="text-ink-muted">التصنيف الحالي:</span>
            <span className="font-semibold text-gold-dark">{activeCollection?.name}</span>
          </div>
          <input
            className={cn(field, "mb-3")}
            placeholder="اسم الصورة/الموديل (اختياري)"
            value={imgName}
            onChange={(e) => setImgName(e.target.value)}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) upload(f);
            }}
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

          {/* images grid */}
          <div className="mt-5">
            <h3 className="mb-3 text-sm font-semibold text-ink">
              الصور ({colModels.length})
            </h3>
            {colModels.length === 0 ? (
              <p className="rounded-xl border border-dashed border-ink/15 py-8 text-center text-sm text-ink-muted">
                لا توجد صور في هذا التصنيف بعد.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {colModels.map((m) => (
                  <div key={m.id} className="group relative overflow-hidden rounded-xl border border-ink/5 bg-white shadow-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/api/media/${m.pathname}`} alt={m.name || "model"} className="aspect-square w-full object-cover" loading="lazy" />
                    {m.name ? <p className="truncate px-3 py-2 text-xs font-medium text-ink">{m.name}</p> : null}
                    <button
                      type="button"
                      onClick={() => removeModel(m.id)}
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
      )}
    </div>
  );
}
