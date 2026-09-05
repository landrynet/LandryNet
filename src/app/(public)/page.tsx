import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { Timeline } from "@/components/sections/Timeline";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Methodology } from "@/components/sections/Methodology";
import { SectionKicker } from "@/components/ui/section-kicker";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = { 
  title: "Landry Net - Full-Stack Developer & Network Engineer", 
  description: "Portfolio de Landry Net, développeur full-stack et ingénieur réseau. Applications, APIs, systèmes et infrastructure." 
};

export default async function PublicHome() {
  const projects = await prisma.project.findMany({ where: { published: true, featured: true }, orderBy: { sortOrder: "asc" }, take: 4 });
  const experiences = await prisma.experience.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });

  return (
    <main>
      <Hero />
      <Expertise />
      <Timeline experiences={experiences} />
      <ProjectsGrid projects={projects} />
      <Methodology />
      
      <section className="public-cta">
        <SectionKicker>06 / Parlons de votre projet</SectionKicker>
        <h2>Construisons quelque chose d&apos;utile.</h2>
        <p>Du premier schéma réseau au dernier détail d&apos;interface, je conçois des systèmes complets et évolutifs.</p>
        <Link className="button button-dark" href="/contact">
          Démarrer une conversation ↗
        </Link>
      </section>
    </main>
  );
}
