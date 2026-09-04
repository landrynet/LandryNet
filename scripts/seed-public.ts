import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const projects = [
  { title: "Atelier Metrics", slug: "atelier-metrics", description: "Un dashboard rapide pour repérer le signal avant le bruit.", content: "Atelier Metrics transforme des données complexes en décisions lisibles. L'interface privilégie la hiérarchie, la vitesse et des interactions simples.", stack: "Next.js, TypeScript, Prisma", category: "PROFESSIONAL", featured: true, published: true },
  { title: "Field Notes", slug: "field-notes", description: "Un système éditorial pensé pour des textes durables.", content: "Field Notes est un espace de publication calme, conçu autour d'un modèle de contenu solide et d'une lecture confortable.", stack: "React, PostgreSQL, Motion", category: "PERSONAL", featured: true, published: true },
  { title: "Relay Commerce", slug: "relay-commerce", description: "Une expérience e-commerce où le produit reste au centre.", content: "Relay Commerce réduit les frictions du parcours d'achat et met les détails produit au premier plan.", stack: "Next.js, Stripe, Zod", category: "ACADEMIC", featured: false, published: true },
];

const posts = [
  { title: "Construire une interface qui respire", slug: "interface-qui-respire", excerpt: "Quelques principes pour rendre les systèmes complexes plus lisibles.", content: "## La lisibilité est une fonctionnalité\n\nUne bonne interface laisse de la place à la décision. Elle hiérarchise, réduit le bruit et accompagne chaque action.", tags: "design, produit", published: true, publishedAt: new Date("2026-08-12") },
];

async function main() {
  for (const project of projects) await prisma.project.upsert({ where: { slug: project.slug }, update: project, create: project });
  for (const post of posts) await prisma.post.upsert({ where: { slug: post.slug }, update: post, create: post });
  for (const skill of [
    ["TCP/IP", "Réseaux"], ["VLAN", "Réseaux"], ["Firewall", "Réseaux"], ["Cisco", "Réseaux"],
    ["TypeScript", "Développement"], ["React", "Développement"], ["Next.js", "Développement"], ["Node.js", "Développement"],
    ["Git", "Outils"], ["Docker", "Outils"], ["Prisma", "Outils"], ["CI/CD", "Outils"],
  ]) await prisma.skill.upsert({ where: { name: skill[0] }, update: { category: skill[1] }, create: { name: skill[0], category: skill[1] } });
}

main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
