import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Découvrez comment Habizy collecte, utilise et protège vos données personnelles.",
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Légal</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Politique de confidentialité</h1>
          <p className={styles.heroDate}>Dernière mise à jour : 1er janvier 2025</p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.prose}>
            <h2>1. Introduction</h2>
            <p>
              Habizy (&ldquo;nous&rdquo;, &ldquo;notre&rdquo;) s&apos;engage à protéger votre vie privée. Cette
              politique explique quelles données nous collectons, comment nous les utilisons
              et quels sont vos droits.
            </p>

            <h2>2. Données collectées</h2>
            <h3>2.1 Données que vous nous fournissez</h3>
            <ul>
              <li>Adresse email et nom pour la création de compte</li>
              <li>Informations de colocation (nom, membres)</li>
              <li>Données saisies dans l&apos;app (dépenses, tâches, signalements)</li>
              <li>Photos jointes aux signalements ou tickets</li>
            </ul>

            <h3>2.2 Données collectées automatiquement</h3>
            <ul>
              <li>Identifiant d&apos;appareil pour les notifications push</li>
              <li>Données de connexion (date, heure, adresse IP)</li>
              <li>Informations de crash et d&apos;erreur pour améliorer l&apos;app</li>
            </ul>

            <h2>3. Utilisation des données</h2>
            <p>Nous utilisons vos données uniquement pour :</p>
            <ul>
              <li>Fournir et améliorer les fonctionnalités de l&apos;application</li>
              <li>Envoyer des notifications pertinentes à votre colocation</li>
              <li>Résoudre les problèmes techniques</li>
              <li>Vous contacter en cas de besoin concernant votre compte</li>
            </ul>
            <p>
              Nous ne vendons, ne partageons ni ne monétisons vos données personnelles
              avec des tiers à des fins publicitaires.
            </p>

            <h2>4. Partage des données</h2>
            <p>Vos données ne sont partagées qu&apos;avec :</p>
            <ul>
              <li>Les membres de votre colocation (données communes uniquement)</li>
              <li>Nos prestataires techniques (hébergement, push notifications) sous contrat de confidentialité</li>
              <li>Les autorités compétentes si la loi l&apos;exige</li>
            </ul>

            <h2>5. Sécurité</h2>
            <p>
              Toutes les données sont chiffrées en transit (HTTPS/TLS) et au repos.
              L&apos;accès aux données de production est restreint et audité. Nous suivons
              les meilleures pratiques de sécurité de l&apos;industrie.
            </p>

            <h2>6. Conservation des données</h2>
            <p>
              Vos données sont conservées tant que votre compte est actif. En cas de
              suppression de compte, vos informations personnelles (nom, email,
              téléphone, identifiants de connexion) sont immédiatement anonymisées et
              votre compte ne peut plus être utilisé pour vous connecter. Les dépenses,
              signalements et tâches de ménage partagés avec votre colocation restent
              visibles, sous forme anonyme, tant que la colocation reste active, afin
              de préserver l&apos;historique commun de vos colocataires. Voir notre{" "}
              <a href="/data-deletion">page dédiée à la suppression de compte</a> pour
              le détail complet. Certaines données peuvent être conservées plus
              longtemps si la loi l&apos;exige.
            </p>

            <h2>7. Vos droits (RGPD)</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul>
              <li><strong>Accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Rectification</strong> : corriger vos données inexactes</li>
              <li><strong>Suppression</strong> : faire effacer vos données</li>
              <li><strong>Portabilité</strong> : recevoir vos données dans un format lisible</li>
              <li><strong>Opposition</strong> : vous opposer à certains traitements</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
            </p>

            <h2>8. Cookies</h2>
            <p>
              L&apos;application mobile Habizy n&apos;utilise pas de cookies. Le site web
              habizy.com utilise uniquement des cookies techniques strictement nécessaires
              au fonctionnement du site. Aucun cookie publicitaire ou analytique tiers
              n&apos;est utilisé.
            </p>

            <h2>9. Mineurs</h2>
            <p>
              Habizy n&apos;est pas destiné aux personnes de moins de 16 ans. Si vous
              avez connaissance qu&apos;un mineur nous a fourni des données personnelles,
              contactez-nous immédiatement.
            </p>

            <h2>10. Modifications</h2>
            <p>
              Nous pouvons mettre à jour cette politique. En cas de modification
              substantielle, nous vous en informerons par notification dans l&apos;app
              ou par email.
            </p>

            <h2>11. Contact</h2>
            <p>
              Pour toute question relative à la confidentialité :{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
