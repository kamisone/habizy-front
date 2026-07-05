'use client';

import Image from 'next/image';
import { useActionState } from 'react';
import { loginAction } from '../actions';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPageOverlay} />

      <div className={styles.loginCard}>
        <div className={styles.loginBrand}>
          <div className={styles.loginLogoMark}>
            <Image src="/logo.png" alt="Habizy" width={46} height={46} />
          </div>
          <div>
            <span className={styles.loginBrandName}>Habizy</span>
            <span className={styles.loginBrandBadge}>Super Admin</span>
          </div>
        </div>

        <div className={styles.loginDivider} />

        <h1 className={styles.loginTitle}>Connexion</h1>
        <p className={styles.loginSubtitle}>Accès réservé aux administrateurs Habizy.</p>

        {state?.error && <div className={styles.loginError}>{state.error}</div>}

        <form action={action}>
          <div className={styles.loginField}>
            <label htmlFor="email" className={styles.loginLabel}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={styles.loginInput}
              placeholder="admin@habizy.app"
            />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="password" className={styles.loginLabel}>Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={styles.loginInput}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className={styles.loginBtn} disabled={pending}>
            {pending ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className={styles.loginFooter}>Habizy &copy; {new Date().getFullYear()} · Accès restreint</p>
      </div>
    </div>
  );
}
