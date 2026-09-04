"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="status-page">
      <p className="section-kicker">Erreur temporaire</p>
      <h1>Impossible de charger cette page.</h1>
      <p>Réessayez dans un instant.</p>
      <button type="button" className="button button-dark" onClick={reset}>Réessayer</button>
    </main>
  );
}
