import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Stats } from "@/components/sections/Stats";
import { SectionKicker } from "@/components/ui/section-kicker";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = { title: "Landry Net - Full-stack & réseaux", description: "Portfolio de Landry, développeur full-stack et passionné par les réseaux." };

export default async function PublicHome() {
  const projects = await prisma.project.findMany({ where: { published: true, featured: true }, orderBy: { updatedAt: "desc" } });
  return <main><Hero /><About /><Skills /><ProjectsGrid projects={projects} /><Stats /><section className="public-cta"><SectionKicker>06 / Parlons de votre projet</SectionKicker><h2>Un bon problème à résoudre ?</h2><p>Du premier schéma réseau au dernier détail d&apos;interface, construisons quelque chose d&apos;utile.</p><Link className="button button-dark" href="/contact">Démarrer une conversation ↗</Link></section></main>;
}
