import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "../privacy/page.module.css";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Les conditions générales d'utilisation d'Habizy.",
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Légal</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Conditions d&apos;utilisation</h1>
          <p className={styles.heroDate}>Dernière mise à jour : 1er janvier 2025</p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.prose}>
            <h2>1. Acceptation des conditions</h2>
            <p>
              En téléchargeant, installant ou utilisant l&apos;application Habizy, vous
              acceptez ces conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces
              conditions, vous ne devez pas utiliser l&apos;application.
            </p>

            <h2>2. Description du service</h2>
            <p>
              Habizy est une application mobile permettant aux colocataires d&apos;organiser
              leur vie commune : rotation des courses, suivi des dépenses, liste partagée,
              gestion du ménage et signalements. Le service est fourni gratuitement dans
              sa version de base.
            </p>

            <h2>3. Compte utilisateur</h2>
            <ul>
              <li>Vous devez avoir au moins 16 ans pour créer un compte</li>
              <li>Vous êtes responsable de la confidentialité de vos identifiants</li>
              <li>Un seul compte par personne est autorisé</li>
              <li>Vous êtes responsable de l&apos;exactitude des informations fournies</li>
            </ul>

            <h2>4. Utilisation acceptable</h2>
            <p>Vous vous engagez à ne pas :</p>
            <ul>
              <li>Utiliser l&apos;application à des fins illégales ou frauduleuses</li>
              <li>Publier du contenu offensant, diffamatoire ou illicite</li>
              <li>Tenter de compromettre la sécurité de l&apos;application</li>
              <li>Utiliser l&apos;application pour harceler d&apos;autres utilisateurs</li>
              <li>Revendre ou exploiter commercialement le service sans autorisation</li>
            </ul>

            <h2>5. Données et contenu utilisateur</h2>
            <p>
              Vous conservez la propriété des données et contenus que vous publiez sur
              Habizy. En les publiant, vous nous accordez une licence limitée pour les
              stocker et les afficher aux membres de votre colocation.
            </p>

            <h2>6. Disponibilité du service</h2>
            <p>
              Nous nous efforçons de maintenir l&apos;application disponible en permanence,
              mais nous ne pouvons garantir une disponibilité sans interruption. Des
              maintenances planifiées ou des incidents techniques peuvent temporairement
              interrompre le service.
            </p>

            <h2>7. Limitation de responsabilité</h2>
            <p>
              Habizy est fourni &ldquo;tel quel&rdquo;. Nous ne sommes pas responsables
              des dommages indirects résultant de l&apos;utilisation de l&apos;application,
              ni des litiges entre colocataires. L&apos;application est un outil
              d&apos;organisation et n&apos;a pas vocation à remplacer un accord légal
              entre colocataires.
            </p>

            <h2>8. Propriété intellectuelle</h2>
            <p>
              L&apos;application Habizy, son logo, son design et ses fonctionnalités sont
              protégés par les droits de propriété intellectuelle. Toute reproduction
              ou utilisation sans autorisation est interdite.
            </p>

            <h2>9. Résiliation</h2>
            <p>
              Vous pouvez supprimer votre compte à tout moment depuis les paramètres
              de l&apos;application. Nous nous réservons le droit de suspendre ou résilier
              un compte en cas de violation de ces conditions.
            </p>

            <h2>10. Modifications des conditions</h2>
            <p>
              Nous pouvons modifier ces conditions à tout moment. En cas de modification
              substantielle, vous serez notifié dans l&apos;application. La poursuite de
              l&apos;utilisation après notification vaut acceptation des nouvelles conditions.
            </p>

            <h2>11. Droit applicable</h2>
            <p>
              Ces conditions sont régies par le droit français. Tout litige sera soumis
              à la compétence exclusive des tribunaux français.
            </p>

            <h2>12. Contact</h2>
            <p>
              Pour toute question relative à ces conditions :{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
