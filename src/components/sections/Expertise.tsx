import { SectionKicker } from "@/components/ui/section-kicker";

export function Expertise() {
  const domains = [
    {
      title: "Full-Stack Development",
      description: "Applications web, APIs, architecture backend, interfaces modernes.",
      techs: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"]
    },
    {
      title: "Networks & Infrastructure",
      description: "TCP/IP, VLAN, routage, infrastructure et services réseau.",
      techs: ["Cisco", "TCP/IP", "VLAN", "Firewall", "Routing"]
    },
    {
      title: "Cloud & DevOps",
      description: "Docker, CI/CD, déploiement, Linux, automatisation.",
      techs: ["Docker", "Linux", "Git", "GitHub Actions", "VPS"]
    },
    {
      title: "Security",
      description: "Authentification, RBAC, sécurité applicative et infrastructure.",
      techs: ["OAuth", "JWT", "VPN", "Web Security"]
    }
  ];

  return (
    <section className="section-grid" id="skills">
      <div className="section-intro">
        <SectionKicker>02 / Expertise</SectionKicker>
        <h2>Domaines de compétences</h2>
      </div>
      <div className="expertise-grid">
        {domains.map((domain) => (
          <div key={domain.title} className="expertise-card">
            <h3>{domain.title}</h3>
            <p>{domain.description}</p>
            <div className="tech-badges">
              {domain.techs.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      
    </section>
  );
}
