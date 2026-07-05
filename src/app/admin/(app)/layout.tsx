import styles from '../admin.module.css';
import AdminSidebar from './AdminSidebar';

export default function AdminAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <AdminSidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
