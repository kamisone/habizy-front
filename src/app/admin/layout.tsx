import styles from './admin.module.css';

export const metadata = { title: { default: 'Habizy Admin', template: '%s — Habizy Admin' } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.adminRoot}>{children}</div>;
}
