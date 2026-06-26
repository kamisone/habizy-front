import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./Footer.module.css";

const productLinks = [
  { href: "/features", label: "Fonctionnalités" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "À propos" },
];

const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Politique de confidentialité" },
  { href: "/terms", label: "Conditions d'utilisation" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand column */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
              <rect width="28" height="28" rx="8" fill="url(#footer-logo)" />
              <path d="M9 19V12l5-4 5 4v7h-3.5v-4h-3v4H9Z" fill="white" fillOpacity="0.95" />
              <defs>
                <linearGradient id="footer-logo" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22C55E" />
                  <stop offset="1" stopColor="#15803D" />
                </linearGradient>
              </defs>
            </svg>
            <span>{siteConfig.name}</span>
          </Link>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <div className={styles.stores}>
            <a href={siteConfig.appStoreUrl} className={styles.storeBtn} aria-label="Télécharger sur l'App Store">
              <AppleIcon />
              <span><small>Disponible sur</small><strong>App Store</strong></span>
            </a>
            <a href={siteConfig.playStoreUrl} className={styles.storeBtn} aria-label="Télécharger sur Google Play">
              <PlayIcon />
              <span><small>Disponible sur</small><strong>Google Play</strong></span>
            </a>
          </div>
        </div>

        {/* Links columns */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Produit</h3>
          <ul className={styles.colLinks}>
            {productLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.colLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Support</h3>
          <ul className={styles.colLinks}>
            {supportLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.colLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Légal</h3>
          <ul className={styles.colLinks}>
            {legalLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.colLink}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          © {year} {siteConfig.name}. Tous droits réservés.
        </p>
        <div className={styles.social}>
          <a href={siteConfig.socialLinks.instagram} aria-label="Instagram" className={styles.socialLink}>
            <InstagramIcon />
          </a>
          <a href={siteConfig.socialLinks.tiktok} aria-label="TikTok" className={styles.socialLink}>
            <TikTokIcon />
          </a>
          <a href={siteConfig.socialLinks.linkedin} aria-label="LinkedIn" className={styles.socialLink}>
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.83a4.85 4.85 0 01-1.07-.14z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
