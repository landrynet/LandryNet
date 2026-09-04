import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN" ? session : null;
}

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
