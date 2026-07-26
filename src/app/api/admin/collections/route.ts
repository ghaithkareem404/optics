import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { addCollection } from "@/lib/catalog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { categoryId?: string; brandId?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const categoryId = String(body.categoryId ?? body.brandId ?? "").trim();
  const name = String(body.name ?? "").trim();
  if (!categoryId) return NextResponse.json({ error: "missing_category" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "missing_name" }, { status: 400 });

  try {
    const item = await addCollection(categoryId, name);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return NextResponse.json(
      { error: "save_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
