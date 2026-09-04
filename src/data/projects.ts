import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    title: "Atelier Metrics",
    description: "A calm, fast dashboard for teams that need to see the signal before the noise.",
    stack: ["Next.js", "TypeScript", "Prisma"],
    accent: "coral",
    href: "#contact",
  },
  {
    title: "Field Notes",
    description: "A small publishing system built around thoughtful writing and durable content models.",
    stack: ["React", "PostgreSQL", "Motion"],
    accent: "lime",
    href: "#contact",
  },
  {
    title: "Relay Commerce",
    description: "A focused storefront experience where product detail and checkout stay out of the way.",
    stack: ["Next.js", "Stripe", "Zod"],
    accent: "blue",
    href: "#contact",
  },
];
