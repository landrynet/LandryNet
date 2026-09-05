"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBarChart2, FiBookOpen, FiChevronRight, FiInbox, FiLayout, FiLogOut, FiMessageSquare, FiTool, FiX, FiBriefcase, FiSettings } from "react-icons/fi";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FiBarChart2 },
  { href: "/admin/projets", label: "Projets", icon: FiLayout },
  { href: "/admin/experience", label: "Parcours", icon: FiBriefcase },
  { href: "/admin/blog", label: "Notes", icon: FiBookOpen },
  { href: "/admin/messages", label: "Messages", icon: FiMessageSquare },
  { href: "/admin/settings", label: "Paramètres", icon: FiSettings },
];

export function AdminSidebar({ isOpen, onClose, userName, userEmail }: { isOpen: boolean; onClose: () => void; userName: string; userEmail: string }) {
  const pathname = usePathname();

  return (
    <>
      <aside className={`admin-sidebar ${isOpen ? "is-open" : ""}`} aria-label="Sidebar admin">
        <div className="admin-sidebar__top">
          <Link href="/" className="admin-brand" onClick={onClose}>
            <span className="admin-brand__mark">L</span>
            <div>
              <strong>Landry Net</strong>
              <small>Portfolio</small>
            </div>
          </Link>
          <button type="button" className="admin-sidebar__close" aria-label="Fermer le menu" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} className={`admin-nav-item ${active ? "is-active" : ""}`} onClick={onClose}>
                <span className="admin-nav-item__icon"><Icon /></span>
                <span>{label}</span>
                <FiChevronRight className="admin-nav-item__arrow" />
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-user-card">
            <div className="admin-user-card__avatar">{userName?.slice(0, 1).toUpperCase() ?? "A"}</div>
            <div>
              <strong>{userName}</strong>
              <small>{userEmail}</small>
            </div>
          </div>
          <form action="/api/auth/signout?callbackUrl=/admin/login" method="post" className="admin-signout-form">
            <button type="submit" className="admin-signout-button">
              <FiLogOut />
              <span>Déconnexion</span>
            </button>
          </form>
        </div>
      </aside>
      <div className={`admin-sidebar__backdrop ${isOpen ? "is-visible" : ""}`} onClick={onClose} />
    </>
  );
}
