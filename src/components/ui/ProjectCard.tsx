import Link from "next/link";
import { parseList } from "@/lib/format";
import { ProjectImage } from "@/components/ui/ProjectImage";

type ProjectCardProps = { project: { title: string; slug: string; description: string; stack: string; category: string; imageUrl: string | null } };

export function ProjectCard({ project }: ProjectCardProps) {
  return <article className="project-card"><Link href={`/projets/${project.slug}`}><div className="project-visual"><ProjectImage src={project.imageUrl} alt={`Aperçu du projet ${project.title}`} className="project-visual__image" /><div className="project-visual__overlay"><span>{project.category}</span><strong>↗</strong></div></div><div className="project-card-body"><h3>{project.title}</h3><p>{project.description}</p><div className="tech-badges">{parseList(project.stack).map((tech) => <span key={tech}>{tech}</span>)}</div></div></Link></article>;
}
