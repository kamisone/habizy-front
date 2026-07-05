import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Suppression du compte et des données",
  description: "Comment demander la suppression de votre compte Habizy et de vos données associées.",
  alternates: { canonical: `${siteConfig.url}/data-deletion` },
};

export default function DataDeletionPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Légal</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Suppression du compte et des données</h1>
          <p className={styles.heroDate}>Dernière mise à jour : 5 juillet 2026</p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.prose}>
            <p>
              Cette page explique comment demander la suppression de votre compte
              utilisateur <strong>Habizy</strong> ainsi que les données associées, et
              détaille ce qui est supprimé, ce qui est conservé, et pendant combien
              de temps.
            </p>

            <h2>1. Comment demander la suppression</h2>
            <h3>Depuis l&apos;application (recommandé)</h3>
            <ol>
              <li>Ouvrez l&apos;application Habizy et connectez-vous à votre compte</li>
              <li>Allez dans l&apos;onglet <strong>Profil</strong> (en bas de l&apos;écran)</li>
              <li>Faites défiler jusqu&apos;en bas et appuyez sur <strong>&laquo; Supprimer mon compte &raquo;</strong></li>
              <li>Confirmez dans la fenêtre qui s&apos;affiche</li>
            </ol>
            <p>
              La suppression est traitée immédiatement : vous êtes déconnecté(e) et
              votre compte ne peut plus être utilisé pour vous reconnecter.
            </p>

            <h3>Sans accès à l&apos;application</h3>
            <p>
              Si vous n&apos;avez plus accès à l&apos;application (téléphone perdu,
              application désinstallée, etc.), envoyez une demande de suppression à{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>{" "}
              depuis l&apos;adresse email associée à votre compte. Votre demande sera
              traitée sous 30 jours.
            </p>

            <h2>2. Données supprimées</h2>
            <p>Dès que la suppression est effectuée, les éléments suivants sont définitivement retirés ou rendus inutilisables :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email (remplacée par une valeur anonyme, non identifiable)</li>
              <li>Numéro de téléphone</li>
              <li>Mot de passe et identifiants de connexion (votre compte ne peut plus jamais être utilisé pour vous connecter)</li>
              <li>Appareil enregistré pour les notifications push</li>
              <li>Votre appartenance à votre ou vos colocation(s) — vous disparaissez de la liste des membres, du planning de ménage et des notifications de la colocation</li>
            </ul>

            <h2>3. Données conservées</h2>
            <p>
              Habizy sert à gérer des dépenses et des tâches partagées entre
              colocataires. Pour préserver l&apos;exactitude des comptes et de
              l&apos;historique de vos anciens colocataires, certaines données restent
              visibles au sein de la colocation, mais totalement dissociées de votre
              identité :
            </p>
            <ul>
              <li>Les tickets de caisse et dépenses que vous avez enregistrés</li>
              <li>Les signalements / tickets de maintenance que vous avez créés</li>
              <li>L&apos;historique des tâches de ménage qui vous ont été assignées</li>
            </ul>
            <p>
              Ces éléments restent attribués à un profil anonymisé (&laquo; Utilisateur
              supprimé &raquo;) : votre nom, votre email et toute autre information
              personnelle en sont retirés et ne peuvent pas être restaurés.
            </p>

            <h2>4. Durée de conservation</h2>
            <p>
              La suppression de vos informations personnelles (nom, email, téléphone,
              identifiants) est <strong>immédiate</strong> et définitive. Les données
              partagées listées ci-dessus (section 3) sont conservées, sous forme
              anonymisée, tant que la colocation concernée reste active — elles font
              partie de l&apos;historique commun de vos anciens colocataires. Elles ne
              sont supprimées que si la colocation elle-même est supprimée.
            </p>

            <h2>5. Questions</h2>
            <p>
              Pour toute question sur ce processus, contactez-nous à{" "}
              <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
              Voir aussi notre{" "}
              <a href="/privacy">politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
