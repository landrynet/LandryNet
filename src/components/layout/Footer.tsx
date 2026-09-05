import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Footer() {
  const socials = await prisma.socialLink.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' } });
  
  return (
    <footer className="public-footer">
      <div><span className="footer-mark">L</span><strong>Landry Net</strong><p>Full-Stack Developer · Network Engineer</p></div>
      <div><p className="footer-label">Navigation</p><Link href="/projets">Projets</Link><Link href="/blog">Notes</Link><Link href="/contact">Contact</Link></div>
      <div>
        <p className="footer-label">Réseaux</p>
        {socials.length > 0 ? (
          socials.map(s => <a key={s.id} href={s.url} target="_blank" rel="noreferrer">{s.platform} ↗</a>)
        ) : (
          <>
            <a href="https://github.com/landrynet" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/landrynet" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </>
        )}
      </div>
      <div><p className="footer-label">Disponible pour vos projets</p><a className="footer-email" href="mailto:hello@landrynet.dev">Me contacter ↗</a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Landry Net</span></div>
    </footer>
  );
}
