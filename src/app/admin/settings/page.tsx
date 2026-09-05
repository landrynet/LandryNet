import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const settings = await prisma.siteSetting.findMany({ orderBy: { key: "asc" } });

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header admin-panel__header--stacked">
        <div>
          <p className="section-kicker">Configuration</p>
          <h2>Paramètres du site</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Clé</th>
              <th>Valeur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((s) => (
              <tr key={s.id}>
                <td>{s.key}</td>
                <td>{s.value}</td>
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
