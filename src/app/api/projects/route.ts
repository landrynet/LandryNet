import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { jsonError, requireAdmin } from "@/lib/api";
import { slugify } from "@/lib/format";

const mediaUrl = z.string().refine((value) => value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://"));
const projectSchema = z.object({
  title: z.string().min(2), slug: z.string().min(2).optional(), description: z.string().min(10), content: z.string().optional().nullable(), stack: z.string().min(1), category: z.string().default("OTHER"), imageUrl: mediaUrl.optional().nullable(), liveUrl: z.string().url().optional().nullable(), sourceUrl: z.string().url().optional().nullable(), featured: z.boolean().default(false), published: z.boolean().default(false), sortOrder: z.number().int().min(0).default(0),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const featured = searchParams.get("featured");
  const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? 20) || 20, 1), 100);
  const page = Math.max(Number(searchParams.get("page") ?? 1) || 1, 1);
  const session = await auth();
  const where = { ...(session?.user?.role === "ADMIN" ? {} : { published: true }), ...(category ? { category } : {}), ...(featured === "true" ? { featured: true } : {}) };
  const [projects, total] = await Promise.all([prisma.project.findMany({ where, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], skip: (page - 1) * limit, take: limit }), prisma.project.count({ where })]);
  return Response.json({ data: projects, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try {
    const data = projectSchema.parse(await request.json());
    const project = await prisma.project.create({ data: { ...data, slug: data.slug ? slugify(data.slug) : slugify(data.title) } });
    return Response.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return jsonError("Données projet invalides.", 400);
    return jsonError("Impossible de créer le projet.", 500);
  }
}
