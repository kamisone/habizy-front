"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Image
            src="/logo.png"
            alt=""
            width={34}
            height={34}
            className={styles.logoImg}
            priority
          />
          <span className={styles.logoWordmark}>{siteConfig.name}</span>
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

