import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getAllPosts, formatDate } from "@/lib/posts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ScreenshotsSection />
      <TestimonialsSection />
      <BlogPreviewSection posts={posts} />
      <DownloadSection />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroBadge}>
          <span className="badge">✦ Disponible sur iOS &amp; Android</span>
        </div>
        <h1 className={`h1 ${styles.heroTitle}`}>
          Votre coloc,<br />
          <span className={styles.heroGradient}>enfin organisée.</span>
        </h1>
        <p className={`lead ${styles.heroLead}`}>
          Habizy centralise la gestion de votre colocation : rotation des courses,
          dépenses communes, ménage, liste partagée et signalements — le tout dans
          une seule app gratuite.
        </p>
        <div className={styles.heroCtas}>
          <a href={siteConfig.appStoreUrl} className={styles.ctaPrimary}>
            <AppleIcon />
            App Store
          </a>
          <a href={siteConfig.playStoreUrl} className={styles.ctaSecondary}>
            <PlayIcon />
            Google Play
          </a>
        </div>
        <p className={styles.heroNote}>Gratuit · Sans carte bancaire · iOS &amp; Android</p>
      </div>

      {/* Phone mockup */}
      <div className={styles.heroPhone}>
        <PhoneMockup />
      </div>

      {/* Background decoration */}
      <div className={styles.heroBg} aria-hidden />
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { value: "10 000+", label: "colocataires actifs" },
    { value: "450 000+", label: "courses gérées" },
    { value: "1,2 M€", label: "de dépenses suivies" },
    { value: "4,8 ★", label: "note moyenne" },
  ];

  return (
    <section className={styles.stats}>
      <div className="container">
        <ul className={styles.statsGrid}>
          {stats.map((s) => (
            <li key={s.label} className={styles.stat}>
              <strong className={styles.statValue}>{s.value}</strong>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Features ───────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: <CartIcon />,
      title: "Rotation des courses",
      desc: "Un système intelligent de tour pour répartir équitablement les achats. Chacun sait quand c'est son tour.",
      color: "green",
    },
    {
      icon: <ChartIcon />,
      title: "Suivi des dépenses",
      desc: "Enregistrez chaque ticket de caisse. Visualisez en un coup d'œil qui a dépensé quoi pour la coloc.",
      color: "blue",
    },
    {
      icon: <ListIcon />,
      title: "Liste partagée",
      desc: "Ajoutez des articles au fil de la semaine. Le responsable des courses n'a qu'à cocher au fur et à mesure.",
      color: "orange",
    },
    {
      icon: <BroomIcon />,
      title: "Gestion du ménage",
      desc: "Suivez les tâches ménagères de la semaine. Voyez qui a fait son ménage et encouragez-vous mutuellement.",
      color: "purple",
    },
    {
      icon: <FlagIcon />,
      title: "Signalements",
      desc: "Un problème dans le logement ? Photographiez-le et signalez-le à tous vos colocataires en un tap.",
      color: "red",
    },
    {
      icon: <BellIcon />,
      title: "Notifications temps réel",
      desc: "Restez informé des activités de votre coloc : nouveau ticket, changement de tour, signalement.",
      color: "teal",
    },
  ];

  return (
    <section className={`section ${styles.features}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Fonctionnalités</span>
          <h2 className="h2">Tout ce dont votre coloc a besoin</h2>
          <p className="lead">
            Une suite complète d&apos;outils pensés pour les colocataires modernes.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={`${styles.featureCard} ${styles[`feature-${f.color}`]}`}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={`h3 ${styles.featureTitle}`}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className={styles.featuresLink}>
          <Link href="/features" className={styles.linkBtn}>
            Voir toutes les fonctionnalités →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── How it works ───────────────────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Créez votre colocation",
      desc: "Téléchargez Habizy, créez votre espace et invitez vos colocataires en partageant un simple code.",
    },
    {
      num: "02",
      title: "Organisez votre quotidien",
      desc: "Configurez la rotation des courses, ajoutez votre liste d'articles et répartissez les tâches.",
    },
    {
      num: "03",
      title: "Suivez en temps réel",
      desc: "Recevez des notifications, suivez les dépenses et gardez une vue complète sur la vie de la coloc.",
    },
  ];

  return (
    <section className={`section ${styles.howItWorks}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Comment ça marche</span>
          <h2 className="h2">Prêt en 3 minutes</h2>
          <p className="lead">Simple à mettre en place, puissant au quotidien.</p>
        </div>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepContent}>
                <h3 className="h3">{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
              {i < steps.length - 1 && <div className={styles.stepConnector} aria-hidden />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Screenshots ────────────────────────────────────────────────────────── */
function ScreenshotsSection() {
  return (
    <section className={`section ${styles.screenshots}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Aperçu de l&apos;app</span>
          <h2 className="h2">Une interface pensée pour la coloc</h2>
          <p className="lead">Intuitive, rapide et agréable à utiliser au quotidien.</p>
        </div>
        <div className={styles.screenshotsGrid}>
          {[
            { label: "Accueil", color: "#10B981" },
            { label: "Les courses", color: "#F97316" },
            { label: "Ménage", color: "#8B5CF6" },
            { label: "Dépenses", color: "#3B82F6" },
          ].map((s) => (
            <div key={s.label} className={styles.screenshotPhone}>
              <div className={styles.phoneMockSmall} style={{ "--phone-color": s.color } as React.CSSProperties}>
                <div className={styles.phoneMockScreen}>
                  <div className={styles.mockHeader} style={{ background: s.color }}>
                    <div className={styles.mockDot} />
                    <div className={styles.mockTitle}>{s.label}</div>
                  </div>
                  <div className={styles.mockContent}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={styles.mockRow}>
                        <div className={styles.mockAvatar} style={{ background: s.color + "33" }} />
                        <div className={styles.mockLines}>
                          <div className={styles.mockLine} style={{ width: `${60 + i * 10}%` }} />
                          <div className={styles.mockLineShort} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.screenshotLabel}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Habizy a complètement éliminé les disputes sur les courses dans notre coloc. Maintenant tout le monde sait qui doit y aller !",
      author: "Sophie M.",
      role: "Étudiante, Lyon",
      avatar: "S",
      color: "#22C55E",
    },
    {
      quote: "Le suivi des dépenses est top. En un coup d'œil on voit si quelqu'un a plus dépensé que les autres. La transparence totale.",
      author: "Théo K.",
      role: "Jeune actif, Paris",
      avatar: "T",
      color: "#3B82F6",
    },
    {
      quote: "On utilise Habizy depuis 8 mois. L'app du ménage a tout changé, plus besoin de se disputer pour savoir qui a nettoyé.",
      author: "Camille R.",
      role: "Ingénieure, Bordeaux",
      avatar: "C",
      color: "#F97316",
    },
  ];

  return (
    <section className={`section ${styles.testimonials}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Témoignages</span>
          <h2 className="h2">Ils adorent Habizy</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t.author} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <blockquote className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</blockquote>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar} style={{ background: t.color + "22", color: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <strong className={styles.testimonialName}>{t.author}</strong>
                  <span className={styles.testimonialRole}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Blog preview ───────────────────────────────────────────────────────── */
function BlogPreviewSection({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  return (
    <section className={`section ${styles.blogPreview}`}>
      <div className="container">
        <div className={styles.sectionHeaderRow}>
          <div>
            <span className="badge">Blog</span>
            <h2 className="h2">Conseils pour votre coloc</h2>
          </div>
          <Link href="/blog" className={styles.linkBtn}>
            Voir tous les articles →
          </Link>
        </div>
        <div className={styles.blogGrid}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.blogCard}>
              <span className={styles.blogCategory}>{p.category}</span>
              <h3 className={styles.blogTitle}>{p.title}</h3>
              <p className={styles.blogDesc}>{p.description}</p>
              <div className={styles.blogMeta}>
                <time dateTime={p.date}>{formatDate(p.date)}</time>
                <span>{p.readingTime} min de lecture</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Download CTA ───────────────────────────────────────────────────────── */
function DownloadSection() {
  return (
    <section className={styles.download}>
      <div className={`container ${styles.downloadInner}`}>
        <h2 className={`h2 ${styles.downloadTitle}`}>
          Prêt à simplifier votre coloc ?
        </h2>
        <p className={styles.downloadDesc}>
          Rejoignez des milliers de colocataires qui font confiance à Habizy.
          Gratuit, sans engagement.
        </p>
        <div className={styles.downloadCtas}>
          <a href={siteConfig.appStoreUrl} className={styles.downloadBtn}>
            <AppleIcon />
            <span><small>Télécharger sur</small><strong>App Store</strong></span>
          </a>
          <a href={siteConfig.playStoreUrl} className={styles.downloadBtn}>
            <PlayIcon />
            <span><small>Télécharger sur</small><strong>Google Play</strong></span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Phone mockup (hero) ────────────────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className={styles.phoneOuter}>
      <div className={styles.phoneFrame}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          {/* Status bar */}
          <div className={styles.phoneStatus}>
            <span>9:41</span>
            <span>●●●</span>
          </div>
          {/* App UI mock */}
          <div className={styles.mockAppHeader}>
            <div>
              <div className={styles.mockGreeting}>Bonjour,</div>
              <div className={styles.mockName}>Camille 👋</div>
            </div>
            <div className={styles.mockBell} />
          </div>
          <div className={styles.mockCard}>
            <div className={styles.mockCardLabel}>Dépenses de la coloc</div>
            <div className={styles.mockCardValue}>1 248,50 €</div>
            <div className={styles.mockCardSub}>4 colocataires</div>
          </div>
          <div className={styles.mockCoursesCard}>
            <div className={styles.mockCoursesHeader}>
              <div className={styles.mockCoursesIcon} />
              <span>Les courses</span>
            </div>
            <div className={styles.mockTurnPill}>C&apos;est ton tour ! 🛒</div>
            <div className={styles.mockItem}><span>🥛 Lait</span><span>×2</span></div>
            <div className={styles.mockItem}><span>🍞 Pain</span><span>×1</span></div>
            <div className={styles.mockItem}><span>🧴 Gel douche</span><span>×1</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Icons ──────────────────────────────────────────────────────────────── */
function CartIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>;
}
function ChartIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function ListIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="3" cy="18" r="1.5"/></svg>;
}
function BroomIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 3L8 15"/><path d="M14 11L6 19c-.7.7-.7 1.8 0 2.5l.5.5c.7.7 1.8.7 2.5 0L17 14"/></svg>;
}
function FlagIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
}
function BellIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
}
function AppleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
}
function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/></svg>;
}
