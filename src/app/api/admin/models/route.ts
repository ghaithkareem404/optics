import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { addModel, getCatalog } from "@/lib/catalog";

export const runtime = "nodejs";

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const catalog = await getCatalog();
  return NextResponse.json(catalog);
}

export async function POST(request: Request) {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "storage_not_configured" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const brandId = String(form.get("brandId") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const file = form.get("image");

  if (!brandId) return NextResponse.json({ error: "missing_brand" }, { status: 400 });
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "missing_image" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "not_an_image" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "too_large" }, { status: 400 });
  }

  const item = await addModel({ brandId, name, file });
  return NextResponse.json({ ok: true, item });
}
