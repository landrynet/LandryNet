import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Gallery } from "@/components/ui/Gallery";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({ where: { slug: resolvedParams.slug } });
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.title} | Landry Net`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({ 
    where: { slug: resolvedParams.slug },
    include: { images: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!project) notFound();

  const techs = project.stack.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <main className="detail-page">
      <Link href="/projets" className="back-link">← Retour aux projets</Link>

      <section className="detail-hero">
        <div className="detail-heading">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="detail-actions">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button button-dark">Voir le site ↗</a>}
            {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="button button-outline">Code source ↗</a>}
          </div>
        </div>
        <div className="detail-visual">
          {project.imageUrl && (
            <Image src={project.imageUrl} alt={project.title} fill className="detail-visual__image" />
          )}
        </div>
      </section>

      <div className="detail-body">
        <div className="detail-content">
          {project.problem && (
            <div className="project-section">
              <h2>Le problème</h2>
              <p>{project.problem}</p>
            </div>
          )}
          
          {project.solution && (
            <div className="project-section">
              <h2>La solution</h2>
              <p>{project.solution}</p>
            </div>
          )}

          {project.features && (
            <div className="project-section">
              <h2>Fonctionnalités</h2>
              <div dangerouslySetInnerHTML={{ __html: project.features }} />
            </div>
          )}

          {project.architecture && (
            <div className="project-section">
              <h2>Architecture</h2>
              <div dangerouslySetInnerHTML={{ __html: project.architecture }} />
            </div>
          )}
          
          {project.content && (
            <div className="project-section">
              <h2>Détails</h2>
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          )}
        </div>
        
        <aside className="detail-sidebar">
          <div className="detail-tech">
            <h3 className="eyebrow">Technologies</h3>
            <div className="tech-badges">
              {techs.map(tech => <span key={tech}>{tech}</span>)}
            </div>
          </div>
          {project.role && (
            <div className="detail-role" style={{ marginTop: '40px' }}>
              <h3 className="eyebrow">Mon rôle</h3>
              <p style={{ fontSize: '14px', color: 'var(--ink)' }}>{project.role}</p>
            </div>
          )}
        </aside>
      </div>

      {project.images && project.images.length > 0 && (
        <section className="project-gallery-section" style={{ marginTop: '100px' }}>
          <h2>Galerie</h2>
          <Gallery images={project.images} />
        </section>
      )}

      
    </main>
  );
}
