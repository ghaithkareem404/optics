import "server-only";
import crypto from "crypto";
import { put, del, get } from "@vercel/blob";

export interface ModelItem {
  id: string;
  brandId: string;
  name: string;
  /** Blob pathname; images are served publicly through /api/media/<pathname>. */
  pathname: string;
  url: string;
  createdAt: number;
}

export interface Catalog {
  models: ModelItem[];
}

const MANIFEST_PATH = "catalog/manifest.json";

/** Read the catalog manifest from the (private) Blob store. Returns an empty
 *  catalog on any error so the public site never breaks. */
export async function getCatalog(): Promise<Catalog> {
  try {
    const result = await get(MANIFEST_PATH, { access: "private" });
    if (!result || !result.stream) return { models: [] };
    const text = await new Response(result.stream).text();
    const data = JSON.parse(text) as Catalog;
    return { models: Array.isArray(data.models) ? data.models : [] };
  } catch {
    return { models: [] };
  }
}

async function saveCatalog(catalog: Catalog): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(catalog), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

/** Upload a model image under a brand and record it in the manifest. */
export async function addModel(input: {
  brandId: string;
  name: string;
  file: File;
}): Promise<ModelItem> {
  const safeName = input.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const blob = await put(`models/${input.brandId}/${safeName}`, input.file, {
    access: "private",
    addRandomSuffix: true,
  });
  const item: ModelItem = {
    id: crypto.randomUUID(),
    brandId: input.brandId,
    name: input.name || "",
    pathname: blob.pathname,
    url: blob.url,
    createdAt: Date.now(),
  };
  const catalog = await getCatalog();
  catalog.models.unshift(item);
  await saveCatalog(catalog);
  return item;
}

/** Delete a model image (both the blob and the manifest entry). */
export async function deleteModel(id: string): Promise<boolean> {
  const catalog = await getCatalog();
  const item = catalog.models.find((m) => m.id === id);
  if (!item) return false;
  try {
    await del(item.url);
  } catch {
    // ignore blob deletion errors; still drop the manifest entry
  }
  catalog.models = catalog.models.filter((m) => m.id !== id);
  await saveCatalog(catalog);
  return true;
}
