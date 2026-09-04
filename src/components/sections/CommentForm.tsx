"use client";

import { useState } from "react";

export function CommentForm({ postId }: { postId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(formData: FormData) {
    setStatus(null);
    setError(null);
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, name: formData.get("name"), email: formData.get("email"), content: formData.get("content") }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(result.error ?? "Impossible d'envoyer le commentaire.");
      return;
    }
    setStatus(result.message);
    (document.querySelector("#comment-form") as HTMLFormElement | null)?.reset();
  }

  return (
    <form id="comment-form" className="comment-form" action={submit}>
      <p className="section-kicker">Participer à la discussion</p>
      <div className="form-row"><label>Nom<input name="name" required minLength={2} /></label><label>Email<input name="email" type="email" required /></label></div>
      <label>Commentaire<textarea name="content" rows={4} required minLength={3} /></label>
      {status ? <p className="form-success" role="status">{status}</p> : null}
      {error ? <p className="auth-error" role="alert">{error}</p> : null}
      <button className="button button-dark" type="submit">Envoyer le commentaire ↗</button>
    </form>
  );
}
