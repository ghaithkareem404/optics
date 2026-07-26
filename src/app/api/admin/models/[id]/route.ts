import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { deleteModel, renameModel } from "@/lib/catalog";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: { name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // Name is optional — an empty string clears the caption.
  const name = String(body.name ?? "").trim();
  const ok = await renameModel(params.id, name);
  if (!ok) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const ok = await deleteModel(params.id);
  if (!ok) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
