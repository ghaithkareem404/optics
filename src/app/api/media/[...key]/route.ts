import { get } from "@vercel/blob";

export const runtime = "nodejs";

/** Public proxy that streams images from the private Blob store, so catalog
 *  images can be shown on the site without exposing the store publicly. */
export async function GET(
  _request: Request,
  { params }: { params: { key: string[] } },
) {
  const pathname = (params.key || []).map((s) => decodeURIComponent(s)).join("/");
  if (!pathname) return new Response("Not found", { status: 404 });

  try {
    const result = await get(pathname, { access: "private" });
    if (!result || !result.stream) return new Response("Not found", { status: 404 });
    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
