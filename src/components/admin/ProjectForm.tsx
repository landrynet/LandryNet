"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImageUpload } from "@/components/admin/ImageUpload";

const schema = z.object({
  title: z.string().min(2, "Titre requis"),
  slug: z.string().min(2, "Slug requis"),
  description: z.string().min(10, "Description trop courte"),
  content: z.string().min(10, "Contenu requis"),
  imageUrl: z.string().refine((value) => !value || value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://"), "URL d'image invalide"),
  category: z.string().min(1),
  stack: z.string().min(1, "Ajoutez au moins une technologie"),
  liveUrl: z.string().url().or(z.literal("")),
  sourceUrl: z.string().url().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export function ProjectForm({ mode, projectId, initialValues }: { mode: "create" | "edit"; projectId?: string; initialValues?: Partial<z.infer<typeof schema>> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? "",
      slug: initialValues?.slug ?? "",
      description: initialValues?.description ?? "",
      content: initialValues?.content ?? "",
      imageUrl: initialValues?.imageUrl ?? "",
      category: initialValues?.category ?? "PROFESSIONAL",
      stack: initialValues?.stack ?? "Next.js, TypeScript",
      liveUrl: initialValues?.liveUrl ?? "",
      sourceUrl: initialValues?.sourceUrl ?? "",
      featured: initialValues?.featured ?? false,
      published: initialValues?.published ?? false,
    },
  });

  const title = watch("title");

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    try {
      const body = {
        ...values,
        liveUrl: values.liveUrl || undefined,
        sourceUrl: values.sourceUrl || undefined,
        content: values.content || undefined,
        imageUrl: values.imageUrl || null,
      };
      const response = await fetch(mode === "create" ? "/api/projects" : `/api/projects/${projectId}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error ?? "Erreur lors de l'enregistrement.");
      }
      router.push("/admin/projets");
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
          <input {...register("title")} placeholder="Nom du projet" onBlur={() => setValue("slug", title?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "")} />
          {errors.title ? <small>{errors.title.message}</small> : null}
        </label>
        <label>
          <span>Slug</span>
          <input {...register("slug")} placeholder="nom-du-projet" />
          {errors.slug ? <small>{errors.slug.message}</small> : null}
        </label>
      </div>

      <div className="form-grid two-up">
        <label>
          <span>Catégorie</span>
          <select {...register("category")}>
            <option value="PROFESSIONAL">Professionnel</option>
            <option value="PERSONAL">Personnel</option>
            <option value="ACADEMIC">Académique</option>
            <option value="OTHER">Autre</option>
          </select>
        </label>
        <label>
          <span>Technologies</span>
          <input {...register("stack")} placeholder="Next.js, TypeScript" />
        </label>
      </div>

      <label>
        <span>Description</span>
        <textarea {...register("description")} rows={4} placeholder="Courte description du projet" />
        {errors.description ? <small>{errors.description.message}</small> : null}
      </label>

      <label>
        <span>Contenu</span>
        <textarea {...register("content")} rows={7} placeholder="Détails, contexte, solution, résultats…" />
        {errors.content ? <small>{errors.content.message}</small> : null}
      </label>

      <ImageUpload
        value={watch("imageUrl")}
        onChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
        onRemove={() => setValue("imageUrl", "", { shouldValidate: true })}
        label="Image du projet"
      />
      {errors.imageUrl ? <small>{errors.imageUrl.message}</small> : null}

      <div className="form-grid two-up">
        <label>
          <span>URL live</span>
          <input {...register("liveUrl")} type="url" placeholder="https://..." />
          {errors.liveUrl ? <small>{errors.liveUrl.message}</small> : null}
        </label>
        <label>
          <span>URL repository</span>
          <input {...register("sourceUrl")} type="url" placeholder="https://github.com/..." />
          {errors.sourceUrl ? <small>{errors.sourceUrl.message}</small> : null}
        </label>
      </div>

      <label className="toggle-row">
        <input type="checkbox" {...register("featured")} />
        <span>Mettre en avant sur la page d’accueil</span>
      </label>

      <label className="toggle-row">
        <input type="checkbox" {...register("published")} />
        <span>Publier le projet</span>
      </label>

      <div className="form-actions">
        <button type="submit" className="button button-dark" disabled={isSubmitting}>{isSubmitting ? "Enregistrement..." : mode === "create" ? "Créer" : "Mettre à jour"}</button>
        <button type="button" className="button button-outline" onClick={() => router.push("/admin/projets")}>Annuler</button>
      </div>
    </form>
  );
}
