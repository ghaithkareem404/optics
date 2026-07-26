import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { deleteModel, updateModel } from "@/lib/catalog";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let body: { name?: string; subtitle?: string; description?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // All fields optional — only provided keys are updated; empty strings clear them.
  const patch: { name?: string; subtitle?: string; description?: string } = {};
  if (body.name !== undefined) patch.name = String(body.name).trim();
  if (body.subtitle !== undefined) patch.subtitle = String(body.subtitle).trim();
  if (body.description !== undefined) patch.description = String(body.description).trim();
  const ok = await updateModel(params.id, patch);
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
