"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ userName, userEmail, children }: { userName: string; userEmail: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const titles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/dashboard": "Dashboard",
    "/admin/projets": "Projets",
    "/admin/projets/new": "Nouveau projet",
    "/admin/blog": "Blog",
    "/admin/blog/new": "Nouvel article",
    "/admin/messages": "Messages",
  };
  const title = titles[pathname] ?? "Dashboard";

  return (
    <div className="admin-shell">
      <AdminSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        userName={userName}
        userEmail={userEmail}
      />
      <div className="admin-main-panel">
        <AdminHeader
          title={title}
          userName={userName}
          userEmail={userEmail}
          isOpen={mobileOpen}
          onToggle={() => setMobileOpen((value) => !value)}
        />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
