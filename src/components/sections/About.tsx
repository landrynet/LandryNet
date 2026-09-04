import { SectionKicker } from "@/components/ui/section-kicker";

const highlights = [
  { number: "01", title: "Réseaux", text: "Infrastructure, routage et sécurité pensés pour durer." },
  { number: "02", title: "Full-stack", text: "Des interfaces rapides reliées à des APIs fiables." },
  { number: "03", title: "Cloud", text: "Des déploiements simples, observables et prêts à évoluer." },
];

export function About() {
  return (
    <section className="about-section section-grid">
      <div>
        <SectionKicker>02 / À propos</SectionKicker>
        <h2>Du réseau à l&apos;interface, je relie les bons points.</h2>
      </div>
      <div className="about-content">
        <p className="about-lede">Je suis Landry, développeur full-stack et passionné par les infrastructures réseau. Je construis des produits numériques qui restent lisibles, performants et agréables à utiliser.</p>
        <div className="about-highlights">
          {highlights.map((highlight) => (
            <article key={highlight.number} className="about-highlight">
              <span>{highlight.number}</span>
              <div><h3>{highlight.title}</h3><p>{highlight.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
