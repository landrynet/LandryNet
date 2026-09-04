This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
# Portfolio Full-stack

Portfolio personnel construit avec Next.js App Router, TypeScript et Tailwind CSS.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` lance le serveur de développement.
- `npm run lint` vérifie le code avec ESLint.
- `npm run build` génère le build de production.
- `npm run start` démarre le build de production.

## Structure

```text
src/
	app/                 Routes App Router et styles globaux
	components/          Composants UI, layout et sections
	data/                Données statiques typées du portfolio
	lib/                 Utilitaires partagés
	types/               Types TypeScript métier
prisma/
	schema.prisma        Modèles Project, Skill et ContactMessage
```

La base SQLite locale se configure avec `DATABASE_URL="file:./dev.db"`.

```bash
npm run db:validate
npm run db:generate
npm run db:push
npm run db:seed-public
```

## Phase 6 : production

Le guide complet de déploiement Vercel, Neon, Cloudinary et Resend se trouve dans [docs/VERCEL.md](docs/VERCEL.md).

Le projet supporte les services de production suivants via variables d'environnement :

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` : les uploads utilisent Cloudinary quand ces trois variables sont présentes, sinon le stockage local est conservé en développement.
- `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL` et éventuellement `RESEND_FROM_EMAIL` : une notification est envoyée après chaque nouveau message de contact. L'absence de ces variables ne bloque pas l'enregistrement du message.
- `NEXTAUTH_URL` : URL canonique utilisée par les métadonnées, `robots.txt` et `sitemap.xml`.

Pour une base Neon, configurez `DATABASE_URL` et `DIRECT_URL`, changez le provider Prisma en `postgresql`, puis régénérez le client et appliquez les migrations avec `npx prisma migrate deploy`. Cette étape doit être faite avec l'URL Neon réelle ; le dépôt reste volontairement en SQLite local tant qu'elle n'est pas fournie.

Avant un déploiement Vercel :

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Les endpoints SEO sont disponibles sur `/robots.txt` et `/sitemap.xml`.

## Authentification admin

Copier `.env.example` vers `.env`, puis renseigner `AUTH_SECRET`, `ADMIN_EMAIL` et `ADMIN_PASSWORD` pour créer le premier compte :

```bash
npm run db:push
npm run db:seed
```

La connexion est disponible sur `/admin/login`. Les routes `/admin/*` sont protégées par Auth.js et le middleware. Le mot de passe est stocké uniquement sous forme de hash bcrypt.

## Frontend public

- `/` : accueil, compétences et projets en vedette
- `/projets` : liste avec filtres par catégorie
- `/projets/[slug]` : détail dynamique d'un projet
- `/blog` et `/blog/[slug]` : articles publiés
- `/contact` : formulaire enregistré via `/api/messages`

## API Phase 4

- `/api/projects` et `/api/projects/[id]` : lecture publique publiée, CRUD admin
- `/api/posts` et `/api/posts/[id]` : articles publiés, CRUD admin et compteur de vues
- `/api/messages` et `/api/messages/[id]` : création publique protégée par rate limiting, gestion admin
- `/api/upload` : upload/suppression admin d&apos;images JPG, PNG, WebP ou GIF jusqu&apos;à 5 MB

Les styles utilisent une approche mobile-first avec grilles une colonne sur smartphone, deux colonnes sur tablette et trois colonnes sur desktop. Les contrôles tactiles ont une hauteur minimale de 44 à 48 pixels.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
