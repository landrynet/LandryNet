import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { jsonError, requireAdmin } from "@/lib/api";
import { slugify } from "@/lib/format";

const mediaUrl = z.string().refine((value) => value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://"));
const projectUpdateSchema = z.object({ title: z.string().min(2).optional(), slug: z.string().min(2).optional(), description: z.string().min(10).optional(), content: z.string().nullable().optional(), stack: z.string().min(1).optional(), category: z.string().optional(), imageUrl: mediaUrl.nullable().optional(), liveUrl: z.string().url().nullable().optional(), sourceUrl: z.string().url().nullable().optional(), featured: z.boolean().optional(), published: z.boolean().optional(), sortOrder: z.number().int().min(0).optional() });

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const project = await prisma.project.findUnique({ where: { id: (await context.params).id } });
  if (!project || (!project.published && (await auth())?.user?.role !== "ADMIN")) return jsonError("Projet introuvable.", 404);
  return Response.json(project);
}

export async function PUT(request: Request, context: Context) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try {
    const id = (await context.params).id;
    const data = projectUpdateSchema.parse(await request.json());
    const project = await prisma.project.update({ where: { id }, data: { ...data, ...(data.slug ? { slug: slugify(data.slug) } : {}) } });
    return Response.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) return jsonError("Données projet invalides.", 400);
    return jsonError("Projet introuvable ou impossible à modifier.", 404);
  }
}

export async function DELETE(_request: Request, context: Context) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try { await prisma.project.delete({ where: { id: (await context.params).id } }); return Response.json({ success: true }); } catch { return jsonError("Projet introuvable.", 404); }
}
