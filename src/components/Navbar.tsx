"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/features", label: "Fonctionnalités" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "À propos" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <LogoIcon />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.link} ${pathname.startsWith(link.href) ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className={styles.actions}>
          <Link href="/contact" className={styles.cta}>
            Télécharger l&apos;app
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.burger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ""}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ""}`} />
          <span className={`${styles.burgerLine} ${open ? styles.burgerOpen : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
          >
            Télécharger l&apos;app
          </Link>
        </div>
      )}
    </header>
  );
}

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
      <path
        d="M9 19V12l5-4 5 4v7h-3.5v-4h-3v4H9Z"
        fill="white"
        fillOpacity="0.95"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
