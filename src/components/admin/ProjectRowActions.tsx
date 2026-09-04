"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProjectRowActions({ projectId }: { projectId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Supprimer ce projet ?")) return;
    const response = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    if (response.ok) router.refresh();
  };

  return (
    <div className="table-actions">
      <Link href={`/admin/projets/${projectId}/edit`} className="action-link">Modifier</Link>
      <button type="button" className="action-button action-button--danger" onClick={handleDelete}>Supprimer</button>
    </div>
  );
}
