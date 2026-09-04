import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header">
        <div>
          <p className="section-kicker">Projets</p>
          <h2>Nouveau projet</h2>
        </div>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
