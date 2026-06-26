import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Habizy est gratuit pour tous les colocataires. Découvrez nos plans et ce qui est inclus.",
  alternates: { canonical: `${siteConfig.url}/pricing` },
};

const freePlan = {
  name: "Gratuit",
  price: "0€",
  period: "pour toujours",
  desc: "Tout ce dont vous avez besoin pour gérer votre colocation.",
  cta: "Télécharger l'app",
  features: [
    "Jusqu'à 6 colocataires",
    "Rotation des courses illimitée",
    "Suivi des dépenses",
    "Liste partagée",
    "Gestion du ménage",
    "Signalements avec photos",
    "Notifications push",
    "Historique de 6 mois",
    "Support par e-mail",
  ],
};

const futurePlan = {
  name: "Pro",
  price: "Bientôt",
  period: "",
  desc: "Des fonctionnalités avancées pour les colocations exigeantes.",
  cta: "Être notifié",
  features: [
    "Tout le plan Gratuit",
    "Colocataires illimités",
    "Historique illimité",
    "Export PDF des comptes",
    "Rappels personnalisés",
    "Statistiques avancées",
    "Support prioritaire",
    "Intégration calendrier",
  ],
  soon: true,
};

const faqs = [
  {
    q: "Habizy sera-t-il toujours gratuit ?",
    a: "Oui, le plan gratuit restera disponible pour toujours. Les fonctionnalités de base — rotation, dépenses, liste, ménage — ne seront jamais payantes.",
  },
  {
    q: "Y a-t-il des publicités dans l'application ?",
    a: "Non. Habizy est sans publicité. Nous finançons le développement via un futur plan Pro optionnel.",
  },
  {
    q: "Faut-il une carte bancaire pour s'inscrire ?",
    a: "Non. Téléchargez l'app et créez votre colocation en moins de 2 minutes, sans aucune information de paiement.",
  },
  {
    q: "Quand le plan Pro sera-t-il disponible ?",
    a: "Nous travaillons activement sur les fonctionnalités Pro. Inscrivez-vous sur notre liste d'attente pour être notifié en premier.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Tarifs</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Simple et transparent</h1>
          <p className={`lead ${styles.heroLead}`}>
            Habizy est gratuit pour tous. Sans carte bancaire, sans engagement,
            sans publicité.
          </p>
        </div>
      </section>

      <section className={`section ${styles.plans}`}>
        <div className="container">
          <div className={styles.plansGrid}>
            <div className={`${styles.planCard} ${styles.planFree}`}>
              <div className={styles.planHeader}>
                <span className="badge">Actuel</span>
                <h2 className={styles.planName}>{freePlan.name}</h2>
                <div className={styles.planPrice}>
                  <strong>{freePlan.price}</strong>
                  <span>{freePlan.period}</span>
                </div>
                <p className={styles.planDesc}>{freePlan.desc}</p>
              </div>
              <ul className={styles.planFeatures}>
                {freePlan.features.map((f) => (
                  <li key={f} className={styles.planFeature}>
                    <span className={styles.check}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className={styles.planCtas}>
                <a href={siteConfig.appStoreUrl} className={styles.ctaPrimary}>App Store</a>
                <a href={siteConfig.playStoreUrl} className={styles.ctaPrimary}>Google Play</a>
              </div>
            </div>

            <div className={`${styles.planCard} ${styles.planPro}`}>
              <div className={styles.planHeader}>
                <span className={`badge ${styles.badgeSoon}`}>Bientôt</span>
                <h2 className={styles.planName}>{futurePlan.name}</h2>
                <div className={styles.planPrice}>
                  <strong>{futurePlan.price}</strong>
                </div>
                <p className={styles.planDesc}>{futurePlan.desc}</p>
              </div>
              <ul className={styles.planFeatures}>
                {futurePlan.features.map((f) => (
                  <li key={f} className={`${styles.planFeature} ${styles.planFeatureMuted}`}>
                    <span className={styles.checkMuted}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className={styles.planCtas}>
                <a href={`mailto:${siteConfig.supportEmail}?subject=Plan Pro Habizy`} className={styles.ctaOutline}>
                  Être notifié
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <h2 className={`h2 ${styles.faqTitle}`}>Questions fréquentes</h2>
          <dl className={styles.faqList}>
            {faqs.map((item) => (
              <div key={item.q} className={styles.faqItem}>
                <dt className={styles.faqQ}>{item.q}</dt>
                <dd className={styles.faqA}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
