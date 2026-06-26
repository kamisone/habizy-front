import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire d'Habizy — une app née d'une vraie frustration en colocation, conçue pour simplifier le quotidien de millions de colocataires.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  {
    icon: "⚖️",
    title: "Équité",
    desc: "Chacun contribue de façon équitable à la vie commune. Habizy rend cette équité visible et mesurable.",
  },
  {
    icon: "🔒",
    title: "Vie privée",
    desc: "Vos données restent les vôtres. Nous ne vendons rien, ne monétisons rien. Simple.",
  },
  {
    icon: "🎯",
    title: "Simplicité",
    desc: "Une interface claire, rapide, sans friction. Si c'est compliqué, personne ne s'en sert.",
  },
  {
    icon: "🤝",
    title: "Harmonie",
    desc: "La colocation doit être agréable. Habizy supprime les points de friction pour que l'essentiel reste la vie ensemble.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">À propos</span>
          <h1 className={`h1 ${styles.heroTitle}`}>
            Né d&apos;une vraie frustration
          </h1>
          <p className={`lead ${styles.heroLead}`}>
            Habizy a été créé parce que gérer une colocation ne devrait pas
            être source de conflits.
          </p>
        </div>
      </section>

      <section className={`section ${styles.story}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <h2 className="h2">L&apos;histoire</h2>
              <p>
                Tout a commencé dans un appartement de 4 personnes à Lyon. Comme
                dans beaucoup de colocations, les mêmes questions revenaient
                chaque semaine : &ldquo;C&apos;est qui qui fait les courses ?&rdquo;, &ldquo;T&apos;as
                gardé le ticket ?&rdquo;, &ldquo;Qui a nettoyé la cuisine cette semaine ?&rdquo;
              </p>
              <p>
                Ces petites frictions répétées finissent par peser. Pas parce
                que les gens sont de mauvaise volonté, mais parce
                qu&apos;il n&apos;y a aucun outil adapté à la réalité de la colocation.
              </p>
              <p>
                Habizy est la réponse à ce problème. Une app construite par des
                gens qui ont vécu en coloc, pour des gens qui vivent en coloc.
                Sans fioriture, sans complication — juste ce qu&apos;il faut pour
                que ça tourne.
              </p>
            </div>
            <div className={styles.storyStat}>
              <div className={styles.bigStat}>
                <span className={styles.bigStatValue}>3,5M</span>
                <span className={styles.bigStatLabel}>personnes vivent en colocation en France</span>
              </div>
              <div className={styles.bigStat}>
                <span className={styles.bigStatValue}>68%</span>
                <span className={styles.bigStatLabel}>déclarent des tensions liées à l&apos;organisation du quotidien</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <h2 className={`h2 ${styles.valuesTitle}`}>Nos valeurs</h2>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={`h3 ${styles.valueTitle}`}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.contactInner}>
            <h2 className="h2">Envie d&apos;en savoir plus ?</h2>
            <p className={`lead ${styles.contactDesc}`}>
              Pour toute question, partenariat ou retour d&apos;expérience,
              écrivez-nous directement.
            </p>
            <a href={`mailto:${siteConfig.supportEmail}`} className={styles.contactBtn}>
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
