import { auth } from "@/auth";

export async function requireAdmin() {
  try {
    const session = await auth();
    return session?.user?.role === "ADMIN" ? session : null;
  } catch (error) {
    console.error("Auth check failed:", error);
    return null;
  }
}

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
