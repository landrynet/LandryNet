import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate, parseList } from "@/lib/format";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { CommentForm } from "@/components/sections/CommentForm";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const post = await prisma.post.findUnique({ where: { slug: (await params).slug } }); return { title: post ? `${post.title} - Blog` : "Article introuvable", description: post?.excerpt }; }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await prisma.post.findUnique({ where: { slug: (await params).slug, published: true }, include: { comments: { where: { approved: true }, orderBy: { createdAt: "desc" } } } });
  if (!post) notFound();
  return <main className="post-detail"><Link className="back-link" href="/blog">← Tous les articles</Link><p className="eyebrow">{post.publishedAt ? formatDate(post.publishedAt) : "Note"}</p><h1>{post.title}</h1><p className="post-lede">{post.excerpt}</p><ProjectImage src={post.coverImage} alt={`Illustration de ${post.title}`} className="post-detail__image" /><div className="tech-badges">{parseList(post.tags).map((tag) => <span key={tag}>{tag}</span>)}</div><article className="markdown-content">{post.content.split("\n\n").map((paragraph) => paragraph.startsWith("## ") ? <h2 key={paragraph}>{paragraph.slice(3)}</h2> : <p key={paragraph}>{paragraph}</p>)}</article><section className="comments-section"><p className="section-kicker">Commentaires ({post.comments.length})</p>{post.comments.length ? post.comments.map((comment) => <article className="comment" key={comment.id}><strong>{comment.name}</strong><p>{comment.content}</p><small>{formatDate(comment.createdAt)}</small></article>) : <p className="empty-state">Soyez le premier à commenter.</p>}<CommentForm postId={post.id} /></section></main>;
}
