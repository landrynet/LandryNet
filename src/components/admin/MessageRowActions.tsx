"use client";

import { useRouter } from "next/navigation";

export function MessageRowActions({ messageId, isRead }: { messageId: string; isRead: boolean }) {
  const router = useRouter();

  const toggleRead = async () => {
    const response = await fetch(`/api/messages/${messageId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !isRead }),
    });
    if (response.ok) router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer ce message ?")) return;
    const response = await fetch(`/api/messages/${messageId}`, { method: "DELETE" });
    if (response.ok) router.refresh();
  };

  return (
    <div className="table-actions">
      <button type="button" className="action-link" onClick={toggleRead}>{isRead ? "Marquer non lu" : "Marquer lu"}</button>
      <button type="button" className="action-button action-button--danger" onClick={handleDelete}>Supprimer</button>
    </div>
  );
}
