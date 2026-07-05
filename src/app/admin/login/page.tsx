'use client';

import Image from 'next/image';
import { useActionState } from 'react';
import { loginAction } from '../actions';
import styles from '../admin.module.css';

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginBrand}>
          <div className={styles.loginLogoMark}>
            <Image src="/logo.png" alt="Habizy" width={42} height={42} />
          </div>
          <div className={styles.loginBrandText}>
            <strong>Habizy</strong>
            <span>Super Admin</span>
          </div>
        </div>

        <h1 className={styles.loginTitle}>Connexion</h1>
        <p className={styles.loginSubtitle}>Accès réservé aux super-admins Habizy.</p>

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
      </div>
    </div>
  );
}
