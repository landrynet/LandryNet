import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const projects = [
  { 
    title: "Edu-Pay", 
    slug: "edu-pay", 
    description: "Système de gestion scolaire et paiements.", 
    content: "Une solution complète de gestion scolaire incluant la facturation, le suivi des présences et un portail parent.", 
    problem: "Les écoles locales perdaient beaucoup de temps à gérer les paiements en espèces et les reçus papier.",
    solution: "Une application full-stack permettant de digitaliser les paiements et le suivi.",
    role: "Full-Stack Developer & Architect",
    stack: "Next.js, TypeScript, PostgreSQL", 
    category: "PROFESSIONAL", 
    featured: true, 
    published: true 
  },
  { 
    title: "Infrastructure Réseau Multi-Site", 
    slug: "infra-network", 
    description: "Déploiement et sécurisation d'une infrastructure réseau.", 
    content: "Mise en place de VLANs, VPN site-à-site et pare-feu pour une entreprise locale.", 
    stack: "Cisco, TCP/IP, VLAN, Firewall", 
    category: "PROFESSIONAL", 
    featured: true, 
    published: true 
  }
];

const posts = [
  { 
    title: "Architecture réseau moderne", 
    slug: "architecture-reseau", 
    excerpt: "Comment penser son infrastructure pour la scalabilité.", 
    content: "## Séparation des flux\n\nL'utilisation des VLANs permet...", 
    tags: "réseaux, architecture", 
    published: true, 
    publishedAt: new Date("2026-08-12") 
  },
];

const experiences = [
  {
    title: "Full-Stack Developer & Network Engineer",
    company: "Indépendant",
    period: "Aujourd'hui",
    description: "Développement d'applications web sur mesure et mise en place d'infrastructures réseaux.",
    published: true,
    sortOrder: 1
  }
];

const settings = [
  { key: "SITE_TITLE", value: "Landry Net - Portfolio" },
  { key: "SITE_DESCRIPTION", value: "Portfolio de Landry Net, Full-Stack Developer et Network Engineer." },
  { key: "HERO_KICKER", value: "Landry Net / Available" },
  { key: "HERO_TITLE", value: "Je relie les idées aux systèmes." },
  { key: "HERO_SUBTITLE", value: "Full-Stack Developer · Network Engineer" }
];

async function main() {
  for (const project of projects) await prisma.project.upsert({ where: { slug: project.slug }, update: project, create: project });
  for (const post of posts) await prisma.post.upsert({ where: { slug: post.slug }, update: post, create: post });
  
  const currentSkills = await prisma.skill.findMany();
  if (currentSkills.length === 0) {
    for (const skill of [
      ["TCP/IP", "Networks"], ["VLAN", "Networks"], ["Firewall", "Networks"], ["Routing", "Networks"],
      ["TypeScript", "Frontend"], ["React", "Frontend"], ["Next.js", "Frontend"], 
      ["Node.js", "Backend"], ["PostgreSQL", "Database"], ["APIs REST", "Backend"],
      ["Git", "DevOps"], ["Docker", "DevOps"], ["Linux", "DevOps"], ["CI/CD", "DevOps"],
    ]) await prisma.skill.upsert({ where: { name: skill[0] }, update: { category: skill[1] }, create: { name: skill[0], category: skill[1] } });
  }

  const currentExp = await prisma.experience.findMany();
  if (currentExp.length === 0) {
    for (const exp of experiences) await prisma.experience.create({ data: exp });
  }

  for (const setting of settings) await prisma.siteSetting.upsert({ where: { key: setting.key }, update: { value: setting.value }, create: setting });
}

main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
