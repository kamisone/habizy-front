import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Découvrez toutes les fonctionnalités d'Habizy : rotation des courses, suivi des dépenses, liste partagée, gestion du ménage, signalements et notifications.",
  alternates: { canonical: `${siteConfig.url}/features` },
};

const featureGroups = [
  {
    title: "Courses & Dépenses",
    color: "green",
    features: [
      {
        icon: "🛒",
        title: "Rotation automatique des courses",
        desc: "Habizy attribue automatiquement les courses à tour de rôle. Chaque colocataire sait quand c'est son tour et reçoit une notification pour lui rappeler.",
        details: ["Algorithme d'équité basé sur la fréquence", "Notifications de rappel", "Possibilité d'échanger son tour", "Historique des tours"],
      },
      {
        icon: "🧾",
        title: "Scan et ajout de tickets",
        desc: "Photographiez votre ticket de caisse ou saisissez manuellement le montant. Habizy calcule automatiquement la répartition équitable.",
        details: ["Ajout du montant et du magasin", "Date et description", "Historique complet", "Vue par colocataire"],
      },
      {
        icon: "📊",
        title: "Tableau de bord des dépenses",
        desc: "Visualisez en temps réel qui a dépensé quoi pour la colocation. Les statistiques détaillées permettent de vérifier l'équité sur la durée.",
        details: ["Total dépensé par personne", "Graphiques mensuels", "Comparaison sur plusieurs mois", "Export des données"],
      },
    ],
  },
  {
    title: "Liste partagée",
    color: "orange",
    features: [
      {
        icon: "📝",
        title: "Liste d'achats collaborative",
        desc: "Ajoutez des articles à la liste au fil de la semaine. Le responsable des courses n'a qu'à ouvrir l'app pour tout voir.",
        details: ["Ajout en temps réel", "Catégorisation des articles", "Quantités et commentaires", "Synchronisation instantanée"],
      },
      {
        icon: "✅",
        title: "Cochage en temps réel",
        desc: "Pendant les courses, cochez les articles au fur et à mesure. Vos colocataires voient la progression en direct.",
        details: ["Interface rapide pour cocher", "Visible par tous en direct", "Remise à zéro après courses", "Historique des achats"],
      },
    ],
  },
  {
    title: "Vie quotidienne",
    color: "purple",
    features: [
      {
        icon: "🧹",
        title: "Gestion du ménage",
        desc: "Définissez les tâches ménagères hebdomadaires et suivez qui les a accomplies. Finis les conflits sur la propreté de l'appartement.",
        details: ["Tâches personnalisables", "Suivi hebdomadaire", "Voir qui a fait quoi", "Rappels optionnels"],
      },
      {
        icon: "🚨",
        title: "Signalements",
        desc: "Signalez un problème dans le logement (fuite, panne, dégâts) avec une photo. Tous les colocataires sont informés immédiatement.",
        details: ["Photo du problème", "Statut (ouvert/résolu)", "Visible par tous", "Historique des incidents"],
      },
      {
        icon: "🔔",
        title: "Notifications intelligentes",
        desc: "Recevez des notifications pertinentes : c'est votre tour, nouveau signalement, ticket de courses ajouté. Jamais de spam.",
        details: ["Notifications push iOS & Android", "Paramétrage fin", "Résumés quotidiens optionnels", "Aucune pub"],
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Fonctionnalités</span>
          <h1 className={`h1 ${styles.heroTitle}`}>
            Tout ce dont votre coloc<br />a besoin, au même endroit
          </h1>
          <p className={`lead ${styles.heroLead}`}>
            Habizy réunit dans une seule app tout ce qui rend la vie en colocation
            plus simple, plus juste et plus sereine.
          </p>
        </div>
      </section>

      {featureGroups.map((group) => (
        <section key={group.title} className={`section ${styles.group}`}>
          <div className="container">
            <div className={styles.groupHeader}>
              <h2 className={`h2 ${styles[`color-${group.color}`]}`}>{group.title}</h2>
            </div>
            <div className={styles.featuresGrid}>
              {group.features.map((f) => (
                <div key={f.title} className={styles.featureCard}>
                  <div className={styles.featureEmoji}>{f.icon}</div>
                  <h3 className={`h3 ${styles.featureTitle}`}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                  <ul className={styles.featureList}>
                    {f.details.map((d) => (
                      <li key={d} className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.cta}>
        <div className="container">
          <h2 className={`h2 ${styles.ctaTitle}`}>Prêt à essayer ?</h2>
          <p className={styles.ctaDesc}>
            Toutes ces fonctionnalités sont incluses gratuitement dans Habizy.
          </p>
          <div className={styles.ctaBtns}>
            <a href={siteConfig.appStoreUrl} className={styles.ctaBtn}>App Store</a>
            <a href={siteConfig.playStoreUrl} className={styles.ctaBtn}>Google Play</a>
          </div>
        </div>
      </section>
    </>
  );
}
