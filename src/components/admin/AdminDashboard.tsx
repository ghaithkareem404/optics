"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryOption {
  id: string;
  label: string;
}

interface Collection {
  id: string;
  categoryId: string;
  name: string;
  createdAt: number;
}

interface Model {
  id: string;
  categoryId: string;
  collectionId: string;
  name: string;
  pathname: string;
  url: string;
  createdAt: number;
}

export function AdminDashboard({
  categories,
  initialCollections,
  initialModels,
}: {
  categories: CategoryOption[];
  initialCollections: Collection[];
  initialModels: Model[];
}) {
  const router = useRouter();
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [models, setModels] = useState<Model[]>(initialModels);
  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? "");
  const [activeCol, setActiveCol] = useState<string | null>(null);
  const [newCol, setNewCol] = useState("");
  const [imgName, setImgName] = useState("");
  const [query, setQuery] = useState("");
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const catCollections = useMemo(
    () => collections.filter((c) => c.categoryId === activeCat),
    [collections, activeCat],
  );
  const colModels = useMemo(
    () => models.filter((m) => m.collectionId === activeCol),
    [models, activeCol],
  );
  const activeCollection = catCollections.find((c) => c.id === activeCol) || null;

  const colName = (id: string) => collections.find((c) => c.id === id)?.name ?? "";
  const catLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

  // Global search across every category/folder/name.
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return models.filter((m) => {
      const hay = [m.name, colName(m.collectionId), catLabel(m.categoryId)]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, models, collections, categories]);

  function pickCat(id: string) {
    setActiveCat(id);
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
        body: JSON.stringify({ categoryId: activeCat, name }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.item) {
        setCollections((prev) => [data.item, ...prev]);
        setActiveCol(data.item.id);
        setNewCol("");
      } else {
        setMsg({ kind: "err", text: "تعذّر إنشاء الفولدر." });
      }
    } finally {
      setBusy(false);
    }
  }

  async function renameCollection(id: string, current: string) {
    const name = prompt("الاسم الجديد للفولدر:", current);
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
    if (!confirm("حذف هذا الفولدر وكل صوره نهائياً؟")) return;
    const res = await fetch(`/api/admin/collections/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      setModels((prev) => prev.filter((m) => m.collectionId !== id));
      if (activeCol === id) setActiveCol(null);
    }
  }

  async function uploadOne(file: File, name: string): Promise<boolean> {
    const form = new FormData();
    form.append("categoryId", activeCat);
    form.append("collectionId", activeCol as string);
    form.append("name", name);
    form.append("image", file);
    const res = await fetch("/api/admin/models", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.item) {
      setModels((prev) => [data.item, ...prev]);
      return true;
    }
    if (data.error === "unauthorized") router.refresh();
    return false;
  }

  // Uploads one image or many, sequentially (the manifest is a shared file, so
  // parallel writes would clobber each other).
  async function uploadFiles(files: File[]) {
    if (!activeCol || files.length === 0) return;
    const images = files.filter((f) => f.type.startsWith("image/"));
    const skipped = files.length - images.length;
    if (images.length === 0) {
      setMsg({ kind: "err", text: "الملفات يجب أن تكون صوراً." });
      return;
    }
    setBusy(true);
    setMsg({ kind: "ok", text: `جارٍ رفع ${images.length} صورة…` });
    let ok = 0;
    let failed = 0;
    try {
      for (let i = 0; i < images.length; i++) {
        // A single-image upload keeps the typed name; batches upload untitled.
        const name = images.length === 1 ? imgName : "";
        const success = await uploadOne(images[i], name);
        if (success) ok++;
        else failed++;
        setMsg({ kind: "ok", text: `تم رفع ${ok} من ${images.length}…` });
      }
    } catch {
      setMsg({ kind: "err", text: "خطأ في الاتصال أثناء الرفع." });
      setBusy(false);
      return;
    }
    if (ok > 0) setImgName("");
    const parts = [`تم رفع ${ok} صورة`];
    if (failed) parts.push(`فشل ${failed}`);
    if (skipped) parts.push(`تم تجاهل ${skipped} ملف غير صورة`);
    setMsg({ kind: failed ? "err" : "ok", text: parts.join(" · ") });
    setBusy(false);
  }

  async function renameModelName(id: string, current: string) {
    const name = prompt("اسم الصورة (اتركه فارغاً لإزالة العنوان):", current);
    if (name === null) return;
    const trimmed = name.trim();
    const res = await fetch(`/api/admin/models/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    });
    if (res.ok) {
      setModels((prev) => prev.map((m) => (m.id === id ? { ...m, name: trimmed } : m)));
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
          <h1 className="font-display text-2xl font-bold text-ink">إدارة الصور</h1>
          <p className="text-sm text-ink-muted">
            اختر التبويب، أنشئ فولدراً فرعياً، ثم ارفع صوره وسمِّ كل صورة.
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

      {/* Search */}
      <div className="relative mt-6">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted ltr:left-3 rtl:right-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          className={cn(field, "ps-10")}
          placeholder="ابحث باسم الصورة أو الفولدر أو البراند…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute top-1/2 -translate-y-1/2 text-sm text-ink-muted hover:text-ink ltr:right-3 rtl:left-3"
          >
            ✕
          </button>
        ) : null}
      </div>

      {query.trim() ? (
        <div className="mt-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
          <h3 className="mb-3 text-sm font-semibold text-ink">
            نتائج البحث ({searchResults.length})
          </h3>
          {searchResults.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink/15 py-8 text-center text-sm text-ink-muted">
              لا توجد صور مطابقة لـ «{query}».
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((m) => (
                <ModelCard
                  key={m.id}
                  src={`/api/media/${m.pathname}`}
                  name={m.name}
                  subtitle={`${catLabel(m.categoryId)} · ${colName(m.collectionId)}`}
                  onRename={() => renameModelName(m.id, m.name)}
                  onRemove={() => removeModel(m.id)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Step 1: category (header tabs) */}
          <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            ١) التبويب
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const count = models.filter((m) => m.categoryId === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => pickCat(c.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    activeCat === c.id
                      ? "border-gold bg-gold text-ink"
                      : "border-ink/15 bg-white text-ink-muted hover:border-gold",
                  )}
                >
                  {c.label}
                  <span className="ms-1 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Step 2: sub-folders */}
          <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            ٢) الفولدر الفرعي
          </p>
          <div className="rounded-2xl border border-ink/5 bg-white p-4 shadow-card">
            <div className="flex flex-wrap gap-2">
              {catCollections.map((c) => {
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
                      aria-label="حذف الفولدر"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                );
              })}
              {catCollections.length === 0 ? (
                <span className="py-1 text-sm text-ink-muted">لا توجد فولدرات بعد — أنشئ واحداً.</span>
              ) : null}
            </div>

            {/* add sub-folder */}
            <div className="mt-3 flex gap-2">
              <input
                className={field}
                placeholder="اسم فولدر جديد (مثال: نظارات رجالية 2026)"
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

          {/* Step 3: images inside the selected folder */}
          <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            ٣) الصور
          </p>
          {!activeCol ? (
            <p className="rounded-2xl border border-dashed border-ink/15 bg-white py-10 text-center text-sm text-ink-muted">
              اختر فولدراً فرعياً بالأعلى (أو أنشئ واحداً) لبدء رفع الصور بداخله.
            </p>
          ) : (
            <div className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
              <div className="mb-3 flex items-center gap-2 text-sm">
                <span className="text-ink-muted">الفولدر الحالي:</span>
                <span className="font-semibold text-gold-dark">{activeCollection?.name}</span>
              </div>
              <label className="mb-1 block text-xs font-medium text-ink-muted">
                اسم الصورة{" "}
                <span className="font-normal opacity-70">
                  (اختياري — يظهر كعنوان تحت الصورة، ويُستخدم عند رفع صورة واحدة)
                </span>
              </label>
              <input
                className={cn(field, "mb-3")}
                placeholder="مثال: إطار Bella الذهبي"
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
                  const fs = Array.from(e.dataTransfer.files ?? []);
                  if (fs.length) uploadFiles(fs);
                }}
                onClick={() => !busy && inputRef.current?.click()}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
                  dragging ? "border-gold bg-gold/5" : "border-ink/15 hover:border-gold/60",
                  busy && "pointer-events-none opacity-60",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-dark" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 16V4m0 0 4 4m-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-medium text-ink">
                  {busy ? "جارٍ الرفع…" : "اسحب الصور هنا أو اضغط للاختيار"}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  يمكن اختيار أكثر من صورة دفعة واحدة · JPG / PNG / WEBP — حتى 8MB
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const fs = Array.from(e.target.files ?? []);
                    if (fs.length) uploadFiles(fs);
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
                    لا توجد صور في هذا الفولدر بعد.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {colModels.map((m) => (
                      <ModelCard
                        key={m.id}
                        src={`/api/media/${m.pathname}`}
                        name={m.name}
                        onRename={() => renameModelName(m.id, m.name)}
                        onRemove={() => removeModel(m.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ModelCard({
  src,
  name,
  subtitle,
  onRename,
  onRemove,
}: {
  src: string;
  name: string;
  subtitle?: string;
  onRename: () => void;
  onRemove: () => void;
}) {
  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-ink/5 bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name || "model"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* action bar on hover */}
        <div className="absolute inset-x-0 top-0 flex justify-end gap-1.5 bg-gradient-to-b from-black/45 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={onRename}
            aria-label="تعديل الاسم"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-ink shadow transition-colors hover:bg-gold hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 20h4L18 10l-4-4L4 16v4Z" strokeLinejoin="round" />
              <path d="m14 6 4 4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="حذف"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-600 shadow transition-colors hover:bg-red-600 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <figcaption className="px-3 py-2.5">
        {name ? (
          <p className="truncate text-sm font-medium text-ink">{name}</p>
        ) : (
          <button
            type="button"
            onClick={onRename}
            className="text-xs italic text-ink-muted/70 underline decoration-dotted underline-offset-2 hover:text-gold-dark"
          >
            + أضف اسماً
          </button>
        )}
        {subtitle ? <p className="mt-0.5 truncate text-[11px] text-ink-muted">{subtitle}</p> : null}
      </figcaption>
    </figure>
  );
}
