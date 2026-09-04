import Link from "next/link";
import { SectionKicker } from "@/components/ui/section-kicker";
import { ProjectCard } from "@/components/ui/ProjectCard";

type ProjectsGridProps = { projects: Array<{ id: string; title: string; slug: string; description: string; stack: string; category: string; imageUrl: string | null }> };

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return <section className="featured-section section-grid"><div className="section-intro"><SectionKicker>03 / Projets en vedette</SectionKicker><h2>Des systèmes utiles, bien construits.</h2><Link className="text-link" href="/projets">Tous les projets ↗</Link></div><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.id ?? project.slug} project={project} />)}</div></section>;
}
