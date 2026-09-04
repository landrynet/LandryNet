import Link from "next/link";

export function Footer() {
  return (
    <footer className="public-footer">
      <div><span className="footer-mark">L</span><strong>Landry Net</strong><p>Full-stack & réseaux.</p></div>
      <div><p className="footer-label">Navigation</p><Link href="/projets">Projets</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></div>
      <div><p className="footer-label">Réseaux</p><a href="https://github.com" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://x.com" target="_blank" rel="noreferrer">Twitter ↗</a></div>
      <div><p className="footer-label">Disponible pour vos projets</p><a className="footer-email" href="mailto:hello@landrynet.dev">hello@landrynet.dev ↗</a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Landry Net</span><span>Built with Next.js / TypeScript</span></div>
    </footer>
  );
}
