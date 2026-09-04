import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MessageRowActions } from "@/components/admin/MessageRowActions";

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="admin-panel admin-panel--spacious">
      <div className="admin-panel__header">
        <div>
          <p className="section-kicker">Inbox</p>
          <h2>Messages</h2>
        </div>
      </div>

      <div className="message-list">
        {messages.map((message) => (
          <article key={message.id} className={`message-card ${message.isRead ? "" : "is-unread"}`}>
            <div className="message-card__meta">
              <span>{message.name}</span>
              {message.isRead ? <span className="pill pill--soft">Lu</span> : <span className="pill">Nouveau</span>}
            </div>
            <h3>{message.subject}</h3>
            <p>{message.message}</p>
            <div className="message-card__footer">
              <small>{new Date(message.createdAt).toLocaleDateString("fr-FR")}</small>
              <MessageRowActions messageId={message.id} isRead={message.isRead} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
