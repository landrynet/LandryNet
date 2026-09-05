import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Hero() {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: ['HERO_KICKER', 'HERO_TITLE', 'HERO_SUBTITLE'] } }
  });
  
  const getVal = (key: string) => settings.find(s => s.key === key)?.value;

  return (
    <section className="public-hero page-grid">
      <div className="hero-copy">
        <p className="eyebrow">{getVal('HERO_KICKER') || "Landry Net / Available"}</p>
        <h1>{getVal('HERO_TITLE') || "Je relie les idées aux systèmes."}</h1>
        <p className="hero-intro">
          {getVal('HERO_SUBTITLE') || "Full-Stack Developer · Network Engineer"}
          <br/>
          Je conçois des applications web claires et des infrastructures réseau solides, de l&apos;architecture au dernier détail.
        </p>
        <div className="hero-tags">
          <span>Application</span>
          <span>API</span>
          <span>Database</span>
          <span>Cloud</span>
          <span>Network</span>
        </div>
        <div className="hero-actions">
          <Link className="button button-dark" href="/projets">Voir mes projets <span>↗</span></Link>
          <Link className="text-link" href="/contact">Me contacter <span>↗</span></Link>
          <a className="text-link" href="/cv.pdf" target="_blank" rel="noreferrer" style={{ marginLeft: '12px' }}>Télécharger CV <span>↓</span></a>
        </div>
      </div>
      <div className="hero-art" aria-label="Composition abstraite représentant un réseau" role="img">
        <span className="hero-art-label">Systems & Infrastructure</span>
        <div className="network-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-shape hero-shape-one" style={{ background: 'var(--ink)' }} />
        <div className="hero-shape hero-shape-two" style={{ background: 'var(--muted)', transform: 'rotate(45deg)' }} />
        <span className="hero-art-note">Connect / build / repeat</span>
      </div>
    </section>
  );
}
