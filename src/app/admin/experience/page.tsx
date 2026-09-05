import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminExperiencePage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const experiences = await prisma.experience.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header admin-panel__header--stacked">
        <div>
          <p className="section-kicker">Contenu</p>
          <h2>Parcours professionnel</h2>
        </div>
        <button className="button button-dark">Nouvelle expérience</button>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Entreprise</th>
              <th>Période</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.title}</td>
                <td>{exp.company}</td>
                <td>{exp.period}</td>
                <td>
                  <button className="action-button">Éditer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
