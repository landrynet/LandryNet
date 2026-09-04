import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { jsonError, requireAdmin } from "@/lib/api";
import { cloudinaryEnabled, deleteImage as deleteCloudinaryImage, uploadImage } from "@/lib/cloudinary";

const MAX_SIZE = 5 * 1024 * 1024;
const allowedTypes = new Map([["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"], ["image/gif", ".gif"]]);
const uploadDirectory = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return jsonError("Aucun fichier fourni.", 400);
  const extension = allowedTypes.get(file.type);
  if (!extension) return jsonError("Format accepté : jpg, png, webp ou gif.", 400);
  if (file.size > MAX_SIZE) return jsonError("La taille maximale est de 5 MB.", 400);
  if (cloudinaryEnabled()) {
    const url = await uploadImage(file);
    return Response.json({ url }, { status: 201 });
  }
  await mkdir(uploadDirectory, { recursive: true });
  const filename = `${randomUUID()}${extension}`;
  await writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/${filename}`, filename }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  const body = await request.json().catch(() => null) as { url?: string } | null;
  if (!body?.url) return jsonError("URL d'image invalide.", 400);
  if (body.url.includes("res.cloudinary.com") && cloudinaryEnabled()) {
    await deleteCloudinaryImage(body.url);
    return Response.json({ success: true });
  }
  if (!body.url.startsWith("/uploads/")) return jsonError("URL d'image invalide.", 400);
  const filename = path.basename(body.url);
  try { await unlink(path.join(uploadDirectory, filename)); return Response.json({ success: true }); } catch { return jsonError("Image introuvable.", 404); }
}
