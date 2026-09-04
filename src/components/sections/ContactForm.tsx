"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Email invalide."),
  subject: z.string().min(3, "Indiquez un sujet."),
  message: z.string().min(20, "Votre message doit contenir au moins 20 caractères."),
});
type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error("send");
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-row"><label>Nom<input {...register("name")} placeholder="Votre nom" />{errors.name && <small>{errors.name.message}</small>}</label><label>Email<input {...register("email")} type="email" placeholder="vous@exemple.com" />{errors.email && <small>{errors.email.message}</small>}</label></div>
    <label>Sujet<input {...register("subject")} placeholder="Parlons de votre projet" />{errors.subject && <small>{errors.subject.message}</small>}</label>
    <label>Message<textarea {...register("message")} rows={6} placeholder="Quelques mots sur votre besoin..." />{errors.message && <small>{errors.message.message}</small>}</label>
    {status === "success" && <p className="form-success" role="status">Message envoyé. Merci, je vous réponds rapidement.</p>}
    {status === "error" && <p className="auth-error" role="alert">Une erreur est survenue. Réessayez ou écrivez directement par email.</p>}
    <button className="button button-dark" disabled={isSubmitting} type="submit">{isSubmitting ? "Envoi..." : "Envoyer le message ↗"}</button>
  </form>;
}
