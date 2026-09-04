import { Resend } from "resend";

type ContactNotification = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function sendContactNotification(data: ContactNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !recipient) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: recipient,
    replyTo: data.email,
    subject: `Nouveau message de ${data.name}: ${data.subject}`,
    html: `<h2>Nouveau message reçu</h2><p><strong>De :</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p><p><strong>Sujet :</strong> ${escapeHtml(data.subject)}</p><p style="white-space: pre-wrap">${escapeHtml(data.message)}</p>`,
  });
}
