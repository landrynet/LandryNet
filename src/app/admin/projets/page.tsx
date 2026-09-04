import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProjectRowActions } from "@/components/admin/ProjectRowActions";

export default async function AdminProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header admin-panel__header--stacked">
        <div>
          <p className="section-kicker">Contenu</p>
          <h2>Gestion des projets</h2>
        </div>
        <Link href="/admin/projets/new" className="button button-dark">Nouveau projet</Link>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Technos</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.title}</td>
                <td><span className="pill">{project.category}</span></td>
                <td>{project.stack}</td>
                <td>{new Date(project.createdAt).toLocaleDateString("fr-FR")}</td>
                <td>
                  <ProjectRowActions projectId={project.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
