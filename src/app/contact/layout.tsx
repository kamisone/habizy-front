import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Habizy pour toute question, bug, suggestion ou partenariat.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
