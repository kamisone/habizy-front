import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes les réponses à vos questions sur Habizy : inscription, fonctionnalités, sécurité et confidentialité.",
  alternates: { canonical: `${siteConfig.url}/faq` },
};

const faqGroups = [
  {
    category: "Démarrage",
    items: [
      {
        q: "Comment créer ma colocation sur Habizy ?",
        a: "Téléchargez l'application, créez un compte avec votre email, puis tapez « Créer une colocation ». Donnez un nom à votre coloc et partagez le code d'invitation à vos colocataires. Tout est prêt en moins de 2 minutes.",
      },
      {
        q: "Comment rejoindre une colocation existante ?",
        a: "Demandez le code d'invitation à l'un de vos colocataires déjà inscrit. Dans l'app, choisissez « Rejoindre une colocation » et entrez le code. Vous aurez immédiatement accès à toutes les fonctionnalités partagées.",
      },
      {
        q: "Combien de colocataires peut-on avoir ?",
        a: "Le plan gratuit supporte jusqu'à 6 colocataires par colocation. C'est largement suffisant pour la grande majorité des situations.",
      },
      {
        q: "Faut-il un compte pour chaque colocataire ?",
        a: "Oui, chaque colocataire doit créer son propre compte. Cela permet un suivi individuel précis des tours, dépenses et tâches.",
      },
    ],
  },
  {
    category: "Courses & Dépenses",
    items: [
      {
        q: "Comment fonctionne la rotation des courses ?",
        a: "Habizy crée automatiquement un système de tour entre tous les colocataires. Quand les courses sont faites et le ticket ajouté, le tour passe automatiquement au suivant. Chacun reçoit une notification quand c'est son tour.",
      },
      {
        q: "Que faire si quelqu'un ne peut pas faire les courses à son tour ?",
        a: "La fonction d'échange de tour permet de proposer à un autre colocataire de permuter. L'échange doit être accepté par les deux parties.",
      },
      {
        q: "Comment ajouter une dépense ?",
        a: "Dans la section « Les courses », tapez « Ajouter un ticket ». Entrez le montant, le magasin, et optionnellement une photo du reçu. La dépense est immédiatement visible par tous.",
      },
      {
        q: "Les dépenses sont-elles partagées équitablement ?",
        a: "Habizy suit qui paie quoi au fil du temps. L'objectif est que chacun contribue équitablement sur la durée grâce au système de rotation.",
      },
    ],
  },
  {
    category: "Confidentialité & Sécurité",
    items: [
      {
        q: "Mes données sont-elles sécurisées ?",
        a: "Oui. Toutes les données sont chiffrées en transit (HTTPS) et au repos. Nous n'accédons jamais aux données de votre colocation sans votre consentement explicite.",
      },
      {
        q: "Qui peut voir les informations de ma colocation ?",
        a: "Uniquement les colocataires qui ont rejoint votre colocation avec le code d'invitation. Les données sont strictement privées à votre groupe.",
      },
      {
        q: "Habizy vend-il mes données ?",
        a: "Jamais. Nous ne vendons, ne partageons ni ne monétisons vos données personnelles. Habizy génère ses revenus via le futur plan Pro, pas via la publicité.",
      },
      {
        q: "Comment supprimer mon compte ?",
        a: "Vous pouvez supprimer votre compte à tout moment depuis les paramètres de l'application. Toutes vos données sont effacées définitivement sous 30 jours.",
      },
    ],
  },
  {
    category: "Application",
    items: [
      {
        q: "Sur quels appareils Habizy est-il disponible ?",
        a: "Habizy est disponible sur iOS (iPhone) et Android. Une version web est prévue pour l'avenir.",
      },
      {
        q: "L'app fonctionne-t-elle sans connexion internet ?",
        a: "Les données sont synchronisées quand vous êtes connecté. Certaines informations sont mises en cache localement pour une consultation hors ligne, mais les modifications nécessitent une connexion.",
      },
      {
        q: "Comment désactiver les notifications ?",
        a: "Allez dans les paramètres de l'app, section « Notifications ». Vous pouvez choisir quels types de notifications recevoir ou les désactiver complètement.",
      },
      {
        q: "J'ai un problème technique, qui contacter ?",
        a: `Notre équipe support est disponible à ${siteConfig.supportEmail}. Décrivez votre problème et votre appareil, nous répondons sous 48h ouvrées.`,
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">FAQ</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Questions fréquentes</h1>
          <p className={`lead ${styles.heroLead}`}>
            Vous ne trouvez pas ce que vous cherchez ?{" "}
            <a href={`mailto:${siteConfig.supportEmail}`} className={styles.heroLink}>
              Contactez-nous
            </a>
            .
          </p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.faqContainer}>
            {faqGroups.map((group) => (
              <div key={group.category} className={styles.group}>
                <h2 className={`h3 ${styles.groupTitle}`}>{group.category}</h2>
                <div className={styles.itemList}>
                  {group.items.map((item) => (
                    <details key={item.q} className={styles.item}>
                      <summary className={styles.question}>
                        {item.q}
                        <span className={styles.icon} aria-hidden>+</span>
                      </summary>
                      <p className={styles.answer}>{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
