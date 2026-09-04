import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) redirect("/admin/projets");

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header">
        <div>
          <p className="section-kicker">Projets</p>
          <h2>Modifier le projet</h2>
        </div>
      </div>
      <ProjectForm
        mode="edit"
        projectId={project.id}
        initialValues={{
          title: project.title,
          slug: project.slug,
          description: project.description,
          content: project.content ?? "",
          imageUrl: project.imageUrl ?? "",
          category: project.category,
          stack: project.stack,
          liveUrl: project.liveUrl ?? "",
          sourceUrl: project.sourceUrl ?? "",
          featured: project.featured,
          published: project.published,
        }}
      />
    </div>
  );
}
