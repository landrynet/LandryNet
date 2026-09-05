import Link from "next/link";
import { parseList } from "@/lib/format";
import { ProjectImage } from "@/components/ui/ProjectImage";

type ProjectCardProps = { project: { title: string; slug: string; description: string; stack: string; category: string; imageUrl: string | null } };

export function ProjectCard({ project }: ProjectCardProps) {
  const techs = parseList(project.stack).slice(0, 3); // Limiter à 3 technos principales

  return (
    <article className="project-card">
      <Link href={`/projets/${project.slug}`}>
        <div className="project-visual">
          {project.imageUrl ? (
             <img src={project.imageUrl} alt={project.title} className="project-visual__image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          ) : (
             <div className="project-image-placeholder"><span>{project.title.charAt(0)}</span></div>
          )}
          <div className="project-visual__overlay">
            <span>{project.category}</span>
            <strong>↗</strong>
          </div>
        </div>
        <div className="project-card-body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tech-badges">
            {techs.map((tech) => <span key={tech}>{tech}</span>)}
            {parseList(project.stack).length > 3 && <span>+{parseList(project.stack).length - 3}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}
