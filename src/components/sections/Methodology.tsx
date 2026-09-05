import { SectionKicker } from "@/components/ui/section-kicker";

export function Methodology() {
  const steps = [
    { num: "01", title: "Comprendre", desc: "Comprendre le problème et les besoins métiers avant d'écrire la moindre ligne de code." },
    { num: "02", title: "Concevoir", desc: "Architecture, base de données et expérience utilisateur. Les fondations solides font les bons projets." },
    { num: "03", title: "Construire", desc: "Développement propre, maintenable et documenté en utilisant les technologies adaptées." },
    { num: "04", title: "Déployer", desc: "Configuration de l'infrastructure, CI/CD et déploiement sécurisé." },
    { num: "05", title: "Améliorer", desc: "Suivi des performances, de la sécurité et évolution continue du système." }
  ];

  return (
    <section className="approach">
      <div className="section-grid">
        <div className="section-intro">
          <SectionKicker>05 / Méthodologie</SectionKicker>
          <h2>Comment je construis</h2>
        </div>
        <div className="methodology-list">
          {steps.map((step) => (
            <div key={step.num} className="method-step">
              <span className="method-num">{step.num} — </span>
              <div className="method-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      
    </section>
  );
}
