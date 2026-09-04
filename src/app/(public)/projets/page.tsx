import { prisma } from "@/lib/prisma";
import { ProjectFilters } from "@/components/sections/ProjectFilters";
import Link from "next/link";
import { LiveSearch } from "@/components/ui/LiveSearch";

export const metadata = { title: "Projets - Alex Martin", description: "Découvrez les projets web et logiciels réalisés par Alex Martin." };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const page = Math.max(Number(params.page ?? 1) || 1, 1);
  const limit = 9;
  const where = { published: true, ...(query ? { OR: [{ title: { contains: query } }, { description: { contains: query } }, { stack: { contains: query } }] } : {}) };
  const [projects, total] = await Promise.all([prisma.project.findMany({ where, orderBy: { updatedAt: "desc" }, skip: (page - 1) * limit, take: limit }), prisma.project.count({ where })]);
  const pages = Math.ceil(total / limit);
  return <main className="listing-page"><div className="listing-heading"><p className="eyebrow">Portfolio / Archive</p><h1>Les projets.</h1><p>Une sélection de produits, interfaces et systèmes conçus avec attention.</p><LiveSearch placeholder="Rechercher un projet" /></div><ProjectFilters projects={projects} />{projects.length === 0 ? <p className="empty-state">Aucun résultat pour cette recherche.</p> : null}{pages > 1 ? <nav className="pagination" aria-label="Pagination projets">{Array.from({ length: pages }, (_, index) => <Link className={page === index + 1 ? "is-current" : ""} key={index + 1} href={`/projets?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(index + 1) })}`}>{index + 1}</Link>)}</nav> : null}</main>;
}
