import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [projects, posts, unreadMessages, recentMessages] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.findMany({ take: 3, orderBy: { createdAt: "desc" } }),
  ]);

  const totalViews = await prisma.post.aggregate({ _sum: { views: true } }).then((result) => Number(result._sum.views ?? 0));

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header">
        <div>
          <p className="section-kicker">Vue d’ensemble</p>
          <h2>Bienvenue dans votre dashboard</h2>
        </div>
      </div>

      <DashboardStats projects={projects} posts={posts} unreadMessages={unreadMessages} totalViews={totalViews} />

      <div className="dashboard-grid">
        <section className="panel-card">
          <h3>Activité récente</h3>
          <ul className="activity-list">
            {recentMessages.length ? recentMessages.map((message) => (
              <li key={message.id}><span>{message.subject}</span><strong>{message.name}</strong></li>
            )) : <li><span>Aucune activité récente</span><strong>—</strong></li>}
          </ul>
        </section>

        <section className="panel-card">
          <h3>À faire</h3>
          <ul className="todo-list">
            <li>Préparer les prochaines publications</li>
            <li>Répondre aux demandes non traitées</li>
            <li>Mettre à jour les visuels des projets</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
