import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header">
        <div>
          <p className="section-kicker">Blog</p>
          <h2>Nouvel article</h2>
        </div>
      </div>
      <PostForm mode="create" />
    </div>
  );
}
