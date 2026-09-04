import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) redirect("/admin/blog");

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header">
        <div>
          <p className="section-kicker">Blog</p>
          <h2>Modifier l’article</h2>
        </div>
      </div>
      <PostForm
        mode="edit"
        postId={post.id}
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage ?? "",
          tags: post.tags,
          published: post.published,
        }}
      />
    </div>
  );
}
