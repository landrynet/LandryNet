import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user) {
    return <>{children}</>;
  }

  return (
    <AdminShell
      userName={session.user.name ?? session.user.email ?? "Admin"}
      userEmail={session.user.email ?? "admin@portfolio.local"}
    >
      {children}
    </AdminShell>
  );
}
