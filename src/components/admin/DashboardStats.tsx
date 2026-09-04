import Link from "next/link";
import { FiBarChart2, FiBookOpen, FiInbox, FiTrendingUp } from "react-icons/fi";

export function DashboardStats({
  projects,
  posts,
  unreadMessages,
  totalViews,
}: {
  projects: number;
  posts: number;
  unreadMessages: number;
  totalViews: number;
}) {
  const stats = [
    { label: "Projets", value: projects, href: "/admin/projets", icon: FiBarChart2 },
    { label: "Articles", value: posts, href: "/admin/blog", icon: FiBookOpen },
    { label: "Messages non lus", value: unreadMessages, href: "/admin/messages", icon: FiInbox },
    { label: "Vues totales", value: totalViews.toLocaleString("fr-FR"), href: "/admin/dashboard", icon: FiTrendingUp },
  ];

  return (
    <div className="stats-grid">
      {stats.map(({ label, value, href, icon: Icon }) => (
        <Link key={label} href={href} className="stat-card">
          <div className="stat-card__icon"><Icon /></div>
          <div className="stat-card__content">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
