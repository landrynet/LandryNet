import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { jsonError, requireAdmin } from "@/lib/api";
import { slugify } from "@/lib/format";

const mediaUrl = z.string().refine((value) => value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://"));
const postSchema = z.object({ title: z.string().min(3), slug: z.string().min(3).optional(), excerpt: z.string().min(10), content: z.string().min(1), coverImage: mediaUrl.nullable().optional(), tags: z.string().default(""), published: z.boolean().default(false), publishedAt: z.coerce.date().nullable().optional() });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const publishedParam = searchParams.get("published");
  if (publishedParam === "false" && (await auth())?.user?.role !== "ADMIN") return jsonError("Authentification admin requise.", 401);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? 20) || 20, 1), 100);
  const where = { ...(publishedParam === "false" ? { published: false } : { published: true }), ...(tag ? { tags: { contains: tag } } : {}) };
  const posts = await prisma.post.findMany({ where, orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }], take: limit });
  return Response.json({ data: posts });
}

export async function POST(request: Request) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try {
    const data = postSchema.parse(await request.json());
    const post = await prisma.post.create({ data: { ...data, slug: data.slug ? slugify(data.slug) : slugify(data.title), publishedAt: data.published ? (data.publishedAt ?? new Date()) : null } });
    return Response.json(post, { status: 201 });
  } catch (error) { if (error instanceof z.ZodError) return jsonError("Données article invalides.", 400); return jsonError("Impossible de créer l'article.", 500); }
}
