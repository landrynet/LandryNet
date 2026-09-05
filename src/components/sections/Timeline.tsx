import { SectionKicker } from "@/components/ui/section-kicker";

type Experience = {
  id: string;
  title: string;
  company: string | null;
  period: string;
  description: string;
};

export function Timeline({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="section-grid" id="experience">
      <div className="section-intro">
        <SectionKicker>03 / Parcours</SectionKicker>
        <h2>Évolution & Expériences</h2>
      </div>
      <div className="timeline-container">
        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-period">{exp.period}</div>
            <div className="timeline-content">
              <h3>{exp.title}</h3>
              {exp.company && <strong>{exp.company}</strong>}
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      
    </section>
  );
}
