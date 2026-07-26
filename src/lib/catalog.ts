import "server-only";
import crypto from "crypto";
import { put, del, get } from "@vercel/blob";

export interface Collection {
  id: string;
  brandId: string;
  name: string;
  createdAt: number;
}

export interface ModelItem {
  id: string;
  brandId: string;
  /** The sub-collection this image belongs to (empty for legacy items). */
  collectionId: string;
  name: string;
  /** Blob pathname; images are served publicly through /api/media/<pathname>. */
  pathname: string;
  url: string;
  createdAt: number;
}

export interface Catalog {
  collections: Collection[];
  models: ModelItem[];
}

const MANIFEST_PATH = "catalog/manifest.json";

/** Read the catalog manifest from the (private) Blob store. Returns an empty
 *  catalog on any error so the public site never breaks. */
export async function getCatalog(): Promise<Catalog> {
  try {
    const result = await get(MANIFEST_PATH, { access: "private" });
    if (!result || !result.stream) return { collections: [], models: [] };
    const text = await new Response(result.stream).text();
    const data = JSON.parse(text) as Partial<Catalog>;
    return {
      collections: Array.isArray(data.collections) ? data.collections : [],
      models: Array.isArray(data.models) ? data.models : [],
    };
  } catch {
    return { collections: [], models: [] };
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

/* ----------------------------- collections ----------------------------- */

export async function addCollection(brandId: string, name: string): Promise<Collection> {
  const col: Collection = { id: crypto.randomUUID(), brandId, name, createdAt: Date.now() };
  const catalog = await getCatalog();
  catalog.collections.unshift(col);
  await saveCatalog(catalog);
  return col;
}

export async function renameCollection(id: string, name: string): Promise<boolean> {
  const catalog = await getCatalog();
  const col = catalog.collections.find((c) => c.id === id);
  if (!col) return false;
  col.name = name;
  await saveCatalog(catalog);
  return true;
}

export async function deleteCollection(id: string): Promise<boolean> {
  const catalog = await getCatalog();
  const col = catalog.collections.find((c) => c.id === id);
  if (!col) return false;
  // delete all images inside this collection
  const toDelete = catalog.models.filter((m) => m.collectionId === id);
  for (const m of toDelete) {
    try {
      await del(m.url);
    } catch {
      /* ignore */
    }
  }
  catalog.models = catalog.models.filter((m) => m.collectionId !== id);
  catalog.collections = catalog.collections.filter((c) => c.id !== id);
  await saveCatalog(catalog);
  return true;
}

/* ------------------------------- models -------------------------------- */

export async function addModel(input: {
  brandId: string;
  collectionId: string;
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
    collectionId: input.collectionId,
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

export async function deleteModel(id: string): Promise<boolean> {
  const catalog = await getCatalog();
  const item = catalog.models.find((m) => m.id === id);
  if (!item) return false;
  try {
    await del(item.url);
  } catch {
    /* ignore */
  }
  catalog.models = catalog.models.filter((m) => m.id !== id);
  await saveCatalog(catalog);
  return true;
}
