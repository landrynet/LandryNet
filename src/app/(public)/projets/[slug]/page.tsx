import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseList } from "@/lib/format";
import { ProjectImage } from "@/components/ui/ProjectImage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = await prisma.project.findUnique({ where: { slug: (await params).slug } });
  return { title: project ? `${project.title} - Alex Martin` : "Projet introuvable", description: project?.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await prisma.project.findUnique({ where: { slug: (await params).slug, published: true } });
  if (!project) notFound();
  const others = await prisma.project.findMany({ where: { published: true, NOT: { id: project.id } }, take: 2, orderBy: { updatedAt: "desc" } });
  return <main className="detail-page"><div className="breadcrumb"><Link href="/">Accueil</Link><span>/</span><Link href="/projets">Projets</Link><span>/</span><span>{project.title}</span></div><div className="detail-hero"><div className="detail-visual"><ProjectImage src={project.imageUrl} alt={`Aperçu du projet ${project.title}`} className="detail-visual__image" /><span>{project.category}</span></div><div className="detail-heading"><p className="eyebrow">Projet / {project.category}</p><h1>{project.title}</h1><p>{project.description}</p><div className="detail-actions">{project.liveUrl && <a className="button button-dark" href={project.liveUrl} target="_blank" rel="noreferrer">Voir le site ↗</a>}{project.sourceUrl && <a className="button button-outline" href={project.sourceUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}</div></div></div><div className="detail-body"><div><p className="section-kicker">À propos</p><div className="detail-content">{project.content?.split("\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div><div><p className="section-kicker">Technologies</p><div className="tech-badges detail-tech">{parseList(project.stack).map((tech) => <span key={tech}>{tech}</span>)}</div></div></div>{others.length > 0 && <section className="other-projects"><p className="section-kicker">Continuer la visite</p><div>{others.map((other) => <Link key={other.id} href={`/projets/${other.slug}`}><span>{other.category}</span><strong>{other.title} ↗</strong></Link>)}</div></section>}</main>;
}
