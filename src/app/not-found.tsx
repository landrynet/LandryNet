import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">Erreur 404</p><h1>Cette page a disparu dans le système.</h1><p>Le lien demandé n&apos;existe pas ou n&apos;est plus disponible.</p><Link className="button button-dark" href="/">Retour à l&apos;accueil ↗</Link></main>;
}
