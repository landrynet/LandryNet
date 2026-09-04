import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, parseList } from "@/lib/format";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { LiveSearch } from "@/components/ui/LiveSearch";

export const metadata = { title: "Blog - Alex Martin", description: "Notes sur le design produit, le code et les systèmes." };

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const page = Math.max(Number(params.page ?? 1) || 1, 1);
  const limit = 6;
  const where = { published: true, ...(query ? { OR: [{ title: { contains: query } }, { excerpt: { contains: query } }, { tags: { contains: query } }] } : {}) };
  const [posts, total] = await Promise.all([prisma.post.findMany({ where, orderBy: { publishedAt: "desc" }, skip: (page - 1) * limit, take: limit }), prisma.post.count({ where })]);
  const pages = Math.ceil(total / limit);
  return <main className="listing-page"><div className="listing-heading"><p className="eyebrow">Journal / Notes</p><h1>Le blog.</h1><p>Des réflexions courtes sur le design, l&apos;ingénierie et le travail bien fait.</p><LiveSearch placeholder="Rechercher un article" /></div><div className="post-grid">{posts.map((post) => <article className="post-card" key={post.id}><Link className="post-card__image" href={`/blog/${post.slug}`}><ProjectImage src={post.coverImage} alt={`Illustration de ${post.title}`} className="post-card__image-content" /></Link><p className="post-date">{post.publishedAt ? formatDate(post.publishedAt) : ""}</p><h2><Link href={`/blog/${post.slug}`}>{post.title} ↗</Link></h2><p>{post.excerpt}</p><div className="tech-badges">{parseList(post.tags).map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>{posts.length === 0 ? <p className="empty-state">Aucun résultat pour cette recherche.</p> : null}{pages > 1 ? <nav className="pagination" aria-label="Pagination blog">{Array.from({ length: pages }, (_, index) => <Link className={page === index + 1 ? "is-current" : ""} key={index + 1} href={`/blog?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(index + 1) })}`}>{index + 1}</Link>)}</nav> : null}</main>;
}
