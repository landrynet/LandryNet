import { skills } from "@/data/skills";
import { SectionKicker } from "@/components/ui/section-kicker";

export function Skills() {
  return <section className="skills-section section-grid"><div><SectionKicker>02 / Compétences</SectionKicker><h2>Des outils au service des idées.</h2></div><div className="skills-grid">{skills.map((group, index) => <article className="skill-group" key={group.category}><span className={`skill-number accent-${["coral", "lime", "blue"][index]}`}>0{index + 1}</span><h3>{group.category}</h3><div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>;
}
