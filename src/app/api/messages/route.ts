import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { jsonError, requireAdmin } from "@/lib/api";
import { sendContactNotification } from "@/lib/email";

const messageSchema = z.object({ name: z.string().min(2), email: z.string().email(), subject: z.string().min(3), message: z.string().min(20) });
const requestLog = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

export async function GET(request: Request) {
  if (!await requireAdmin()) return jsonError("Authentification admin requise.", 401);
  const { searchParams } = new URL(request.url);
  const unread = searchParams.get("unread");
  const messages = await prisma.contactMessage.findMany({ where: unread === "true" ? { isRead: false } : undefined, orderBy: { createdAt: "desc" } });
  return Response.json({ data: messages });
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const key = forwarded?.split(",")[0]?.trim() || "anonymous";
  const previous = requestLog.get(key);
  if (previous && Date.now() - previous < RATE_LIMIT_MS) return jsonError("Trop de messages. Réessayez dans une minute.", 429);
  try {
    const data = messageSchema.parse(await request.json());
    const message = await prisma.contactMessage.create({ data });
    requestLog.set(key, Date.now());
    await sendContactNotification(data).catch((error) => console.error("Notification email impossible:", error));
    return Response.json({ id: message.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return jsonError("Données invalides.", 400);
    return jsonError("Impossible d'enregistrer le message.", 500);
  }
}
