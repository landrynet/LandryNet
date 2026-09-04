"use client";

import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export function AdminHeader({ title, userName, userEmail, isOpen, onToggle }: { title: string; userName: string; userEmail: string; isOpen: boolean; onToggle: () => void; }) {
  return (
    <header className="admin-header-bar">
      <div className="admin-header-bar__left">
        <button type="button" className="admin-mobile-toggle" aria-label="Ouvrir le menu" onClick={onToggle}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <div>
          <p className="section-kicker">Espace admin</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="admin-header-bar__right">
        <Link href="/" className="button button-outline admin-quick-link">
          Voir le site
        </Link>
        <div className="admin-user-mini">
          <span className="admin-user-mini__avatar">{userName.slice(0, 1).toUpperCase() || "A"}</span>
          <div>
            <strong>{userName}</strong>
            <small>{userEmail}</small>
          </div>
        </div>
      </div>
    </header>
  );
}
