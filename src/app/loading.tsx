export default function Loading() {
  return (
    <main className="loading-state" aria-live="polite" aria-busy="true">
      <span className="loading-state__bar" />
      <p>Chargement...</p>
    </main>
  );
}
