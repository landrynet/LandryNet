import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, requireAdmin } from "@/lib/api";

type Context = { params: Promise<{ id: string }> };
const readSchema = z.object({ isRead: z.boolean() });

export async function PATCH(request: Request, context: Context) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try { const data = readSchema.parse(await request.json()); const message = await prisma.contactMessage.update({ where: { id: (await context.params).id }, data }); return Response.json(message); } catch (error) { if (error instanceof z.ZodError) return jsonError("Statut invalide.", 400); return jsonError("Message introuvable.", 404); }
}

export async function DELETE(_request: Request, context: Context) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  try { await prisma.contactMessage.delete({ where: { id: (await context.params).id } }); return Response.json({ success: true }); } catch { return jsonError("Message introuvable.", 404); }
}
