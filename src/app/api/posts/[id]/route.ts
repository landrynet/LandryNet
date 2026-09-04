import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, requireAdmin } from "@/lib/api";
import { slugify } from "@/lib/format";

const mediaUrl = z.string().refine((value) => value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://"));
const updateSchema = z.object({ title: z.string().min(3).optional(), slug: z.string().min(3).optional(), excerpt: z.string().min(10).optional(), content: z.string().min(1).optional(), coverImage: mediaUrl.nullable().optional(), tags: z.string().optional(), published: z.boolean().optional(), publishedAt: z.coerce.date().nullable().optional() });
type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const id = (await context.params).id;
  const post = await prisma.post.updateMany({ where: { id, published: true }, data: { views: { increment: 1 } } });
  if (!post.count) return jsonError("Article introuvable.", 404);
  const result = await prisma.post.findUnique({ where: { id } });
  return Response.json(result);
}

export async function PUT(request: Request, context: Context) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try { const data = updateSchema.parse(await request.json()); const post = await prisma.post.update({ where: { id: (await context.params).id }, data: { ...data, ...(data.slug ? { slug: slugify(data.slug) } : {}) } }); return Response.json(post); } catch (error) { if (error instanceof z.ZodError) return jsonError("Données article invalides.", 400); return jsonError("Article introuvable ou impossible à modifier.", 404); }
}

export async function DELETE(_request: Request, context: Context) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try { await prisma.post.delete({ where: { id: (await context.params).id } }); return Response.json({ success: true }); } catch { return jsonError("Article introuvable.", 404); }
}
