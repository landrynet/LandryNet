import Link from "next/link";

const recentMessages = [
  { name: "Sophie L.", email: "sophie@example.com", subject: "Demande de projet", date: "Aujourd’hui" },
  { name: "Nicolas D.", email: "nicolas@example.com", subject: "Refonte mobile", date: "Hier" },
  { name: "Claire M.", email: "claire@example.com", subject: "Portfolio perso", date: "3 jours" },
];

export function RecentMessages() {
  return (
    <section className="panel-card">
      <div className="panel-card__header">
        <h3>Messages récents</h3>
        <Link href="/admin/messages" className="action-link">Voir tout</Link>
      </div>
      <ul className="recent-message-list">
        {recentMessages.map((message) => (
          <li key={message.email}>
            <div className="recent-message-list__person">
              <strong>{message.name}</strong>
              <small>{message.email}</small>
            </div>
            <div className="recent-message-list__subject">
              <span>{message.subject}</span>
              <small>{message.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
