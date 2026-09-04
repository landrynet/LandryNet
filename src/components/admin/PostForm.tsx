"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageUpload } from "@/components/admin/ImageUpload";

const schema = z.object({
  title: z.string().min(3, "Titre requis"),
  slug: z.string().min(3, "Slug requis"),
  excerpt: z.string().min(10, "Extrait requis"),
  content: z.string().min(20, "Contenu trop court"),
  coverImage: z.string().refine((value) => !value || value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://"), "URL d'image invalide"),
  tags: z.string().min(1, "Ajoutez au moins un tag"),
  published: z.boolean().default(false),
});

export function PostForm({ mode, postId, initialValues }: { mode: "create" | "edit"; postId?: string; initialValues?: Partial<z.infer<typeof schema>> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? "",
      slug: initialValues?.slug ?? "",
      excerpt: initialValues?.excerpt ?? "",
      content: initialValues?.content ?? "",
      coverImage: initialValues?.coverImage ?? "",
      tags: initialValues?.tags ?? "design, product",
      published: initialValues?.published ?? false,
    },
  });

  const title = watch("title");

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(mode === "create" ? "/api/posts" : `/api/posts/${postId}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, coverImage: values.coverImage || null, publishedAt: values.published ? new Date().toISOString() : null }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error ?? "Erreur lors de l'enregistrement.");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grid two-up">
        <label>
          <span>Titre</span>
          <input {...register("title")} placeholder="Titre de l’article" onBlur={() => setValue("slug", title?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "")} />
          {errors.title ? <small>{errors.title.message}</small> : null}
        </label>
        <label>
          <span>Slug</span>
          <input {...register("slug")} placeholder="titre-de-l-article" />
          {errors.slug ? <small>{errors.slug.message}</small> : null}
        </label>
      </div>

      <label>
        <span>Extrait</span>
        <textarea {...register("excerpt")} rows={3} placeholder="Résumé court" />
        {errors.excerpt ? <small>{errors.excerpt.message}</small> : null}
      </label>

      <label>
        <span>Contenu</span>
        <textarea {...register("content")} rows={8} placeholder="Markdown ou texte brut…" />
        {errors.content ? <small>{errors.content.message}</small> : null}
      </label>

      <ImageUpload
        value={watch("coverImage")}
        onChange={(url) => setValue("coverImage", url, { shouldValidate: true })}
        onRemove={() => setValue("coverImage", "", { shouldValidate: true })}
        label="Image de couverture"
        aspectRatio="21/9"
      />
      {errors.coverImage ? <small>{errors.coverImage.message}</small> : null}

      <div className="form-grid two-up">
        <label>
          <span>Tags</span>
          <input {...register("tags")} placeholder="design, product, strategy" />
        </label>
        <label className="toggle-row toggle-row--boxed">
          <input type="checkbox" {...register("published")} />
          <span>Publier immédiatement</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-dark" disabled={isSubmitting}>{isSubmitting ? "Enregistrement..." : mode === "create" ? "Créer" : "Mettre à jour"}</button>
        <button type="button" className="button button-outline" onClick={() => router.push("/admin/blog")}>Annuler</button>
      </div>
    </form>
  );
}
