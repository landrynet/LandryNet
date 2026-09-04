"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function PostRowActions({ postId, published }: { postId: string; published: boolean }) {
  const router = useRouter();

  const togglePublished = async () => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (response.ok) router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer cet article ?")) return;
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (response.ok) router.refresh();
  };

  return (
    <div className="table-actions">
      <Link href={`/admin/blog/${postId}/edit`} className="action-link">Modifier</Link>
      <button type="button" className="action-button" onClick={togglePublished}>{published ? "Dépublier" : "Publier"}</button>
      <button type="button" className="action-button action-button--danger" onClick={handleDelete}>Supprimer</button>
    </div>
  );
}
