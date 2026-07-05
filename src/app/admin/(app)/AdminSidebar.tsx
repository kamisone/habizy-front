'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Home, Users, FileText, Bell, BarChart2, ClipboardList, LogOut,
} from 'lucide-react';
import { logoutAction } from '../actions';
import styles from '../admin.module.css';

const mainNav = [
  { href: '/admin/dashboard', label: 'Tableau de bord', Icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytiques', Icon: BarChart2 },
];

const manageNav = [
  { href: '/admin/colocations', label: 'Colocations', Icon: Home },
  { href: '/admin/users', label: 'Utilisateurs', Icon: Users },
  { href: '/admin/reports', label: 'Signalements', Icon: FileText },
];

const systemNav = [
  { href: '/admin/notifications', label: 'Notifications', Icon: Bell },
  { href: '/admin/audit-logs', label: 'Journal d\'audit', Icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.logoMark}>
          <Image src="/logo.png" alt="Habizy" width={33} height={33} />
        </div>
        <div className={styles.brandText}>
          <strong>Habizy</strong>
          <span>Super Admin</span>
        </div>
      </div>

      <ul className={styles.sidebarNav}>
        <li className={styles.sidebarSection}>Général</li>
        {mainNav.map(({ href, label, Icon }) => (
          <li key={href} className={styles.sidebarItem}>
            <Link href={href} className={`${styles.sidebarLink} ${isActive(href) ? styles.sidebarLinkActive : ''}`}>
              <Icon size={15} />
              {label}
            </Link>
          </li>
        ))}

        <li className={styles.sidebarSection}>Gestion</li>
        {manageNav.map(({ href, label, Icon }) => (
          <li key={href} className={styles.sidebarItem}>
            <Link href={href} className={`${styles.sidebarLink} ${isActive(href) ? styles.sidebarLinkActive : ''}`}>
              <Icon size={15} />
              {label}
            </Link>
          </li>
        ))}

        <li className={styles.sidebarSection}>Système</li>
        {systemNav.map(({ href, label, Icon }) => (
          <li key={href} className={styles.sidebarItem}>
            <Link href={href} className={`${styles.sidebarLink} ${isActive(href) ? styles.sidebarLinkActive : ''}`}>
              <Icon size={15} />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.sidebarFooter}>
        <form action={logoutAction}>
          <button type="submit" className={styles.logoutBtn}>
            <LogOut size={15} />
            Déconnexion
          </button>
        </form>
      </div>
    </aside>
  );
}
