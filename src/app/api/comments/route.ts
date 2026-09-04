import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/api";

const commentSchema = z.object({
  postId: z.string().min(1),
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  content: z.string().min(3).max(2000),
});

export async function POST(request: Request) {
  try {
    const data = commentSchema.parse(await request.json());
    const post = await prisma.post.findFirst({ where: { id: data.postId, published: true }, select: { id: true } });
    if (!post) return jsonError("Article introuvable.", 404);
    const comment = await prisma.comment.create({ data: { ...data, approved: false } });
    return Response.json({ id: comment.id, message: "Commentaire envoyé pour modération." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return jsonError("Commentaire invalide.", 400);
    return jsonError("Impossible d'enregistrer le commentaire.", 500);
  }
}
