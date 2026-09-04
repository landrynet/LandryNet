# Déploiement Landry Net sur Vercel

## Important avant le déploiement

Le dépôt fonctionne actuellement avec SQLite et `better-sqlite3` pour le développement local. SQLite n'est pas une base persistante adaptée aux fonctions serverless Vercel.

Pour une vraie production, il faut d'abord utiliser une base PostgreSQL managée, par exemple Neon, puis adapter `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Après cette modification :

```bash
npm install @prisma/adapter-pg pg
npm uninstall @prisma/adapter-better-sqlite3 better-sqlite3
npx prisma generate
npx prisma migrate dev --name init_postgresql
```

Ne lancez pas cette migration sans une vraie URL Neon et une sauvegarde de la base locale.

## Importer le projet

1. Ouvrir Vercel et choisir **Add New Project**.
2. Importer `landrynet/LandryNet` depuis GitHub.
3. Framework preset : **Next.js**.
4. Build command : `npm run build`.
5. Install command : `npm install`.
6. Output directory : laisser la valeur automatique `.next`.

## Variables d'environnement Vercel

Ajouter ces variables pour les environnements **Production**, **Preview** et **Development** selon le besoin.

```env
# PostgreSQL Neon
DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"

# Auth.js / NextAuth
AUTH_SECRET="GENERER_UN_SECRET_LONG_ET_ALEATOIRE"
NEXTAUTH_URL="https://votre-domaine.vercel.app"

# Compte administrateur utilisé par le seed
ADMIN_EMAIL="admin@votre-domaine.com"
ADMIN_PASSWORD="MOT_DE_PASSE_FORT_ET_UNIQUE"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="votre-cloud-name"
CLOUDINARY_API_KEY="votre-api-key"
CLOUDINARY_API_SECRET="votre-api-secret"

# Resend
RESEND_API_KEY="re_votre_cle"
ADMIN_NOTIFICATION_EMAIL="votre-email@domaine.com"
RESEND_FROM_EMAIL="Landry Net <noreply@votre-domaine.com>"
```

Ne jamais mettre ces valeurs dans GitHub, `.env.example` ou le code source : `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `ADMIN_PASSWORD`, `CLOUDINARY_API_SECRET` et `RESEND_API_KEY`.

## Initialiser la base de production

Après avoir configuré les variables Vercel et Neon :

```bash
npx prisma migrate deploy
npm run db:seed
npm run db:seed-public
```

Le seed admin doit être exécuté avec les mêmes variables `DATABASE_URL`, `ADMIN_EMAIL` et `ADMIN_PASSWORD` que la production.

## Vérifications après déploiement

- `/` affiche la page Landry Net.
- `/projets` et `/blog` affichent uniquement les contenus publiés.
- `/admin/login` accepte le compte administrateur.
- `/api/upload` utilise Cloudinary lorsque ses variables sont configurées.
- `/contact` enregistre un message et Resend envoie la notification.
- `/robots.txt` et `/sitemap.xml` répondent correctement.
- Les images distantes utilisent le domaine `res.cloudinary.com` autorisé dans `next.config.ts`.

## Générer un secret Auth.js

PowerShell :

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Domaine personnalisé

Dans Vercel : **Project Settings > Domains**, ajouter le domaine, puis remplacer `NEXTAUTH_URL` par l'URL HTTPS finale et redéployer.
