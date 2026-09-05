"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/#about", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/#skills", label: "Compétences" },
  { href: "/#experience", label: "Parcours" },
  { href: "/blog", label: "Notes" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`public-nav ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="wordmark" href="/" onClick={() => setOpen(false)} aria-label="Accueil">
        <span className="wordmark-mark">L</span><span>Landry Net</span>
      </Link>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <nav className={`public-nav-links ${open ? "is-open" : ""}`} aria-label="Navigation principale">
        {links.map((link) => <Link key={link.href} className={pathname === link.href ? "is-active" : ""} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        <ThemeToggle />
        <a href="/cv.pdf" target="_blank" className="button button-dark nav-cta">Télécharger mon CV</a>
      </nav>
    </header>
  );
}
