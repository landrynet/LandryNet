"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";

const filters = [{ value: "ALL", label: "Tous" }, { value: "PROFESSIONAL", label: "Professionnel" }, { value: "PERSONAL", label: "Personnel" }, { value: "ACADEMIC", label: "Académique" }, { value: "OTHER", label: "Autre" }];

type Project = { title: string; slug: string; description: string; stack: string; category: string; imageUrl: string | null };
export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("ALL");
  const visible = useMemo(() => active === "ALL" ? projects : projects.filter((project) => project.category === active), [active, projects]);
  return <div className="filter-wrap"><div className="filter-bar" role="group" aria-label="Filtrer les projets">{filters.map((filter) => <button className={active === filter.value ? "is-active" : ""} key={filter.value} type="button" onClick={() => setActive(filter.value)}>{filter.label}</button>)}</div><div className="projects-grid filtered-grid">{visible.length ? visible.map((project) => <ProjectCard key={project.slug} project={project} />) : <p className="empty-state">Aucun projet dans cette catégorie.</p>}</div></div>;
}
