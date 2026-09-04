import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = { title: "Contact - Alex Martin", description: "Contactez Alex Martin pour parler de votre projet." };

export default function ContactPage() {
  return <main className="contact-page"><div className="contact-intro"><p className="eyebrow">03 / Contact</p><h1>Parlons de la suite.</h1><p>Vous avez un produit à clarifier, une interface à construire ou un système à remettre sur les rails ? Écrivez-moi.</p><div className="contact-details"><a href="mailto:hello@alexmartin.dev">hello@alexmartin.dev ↗</a><span>Paris / Europe</span><span>Réponse sous 2 jours ouvrés</span></div></div><ContactForm /></main>;
}
