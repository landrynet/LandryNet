import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PostRowActions } from "@/components/admin/PostRowActions";

export default async function AdminBlogPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const posts = await prisma.post.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }] });

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header admin-panel__header--stacked">
        <div>
          <p className="section-kicker">Rédaction</p>
          <h2>Gestion du blog</h2>
        </div>
        <Link href="/admin/blog/new" className="button button-dark">Nouvel article</Link>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Vues</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td><span className="pill pill--soft">{post.published ? "Publié" : "Brouillon"}</span></td>
                <td>{new Date(post.createdAt).toLocaleDateString("fr-FR")}</td>
                <td>{post.views}</td>
                <td>
                  <PostRowActions postId={post.id} published={post.published} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
