import { Users, Home, Receipt, TrendingUp, AlertTriangle, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { adminFetch, fmtDate, fmtEuro } from '@/lib/admin';
import BarChart from '../_components/BarChart';
import styles from '../../admin.module.css';

export const metadata = { title: 'Tableau de bord' };

type Overview = {
  users: { total: number; newLast30Days: number; suspended: number; active: number };
  colocations: { total: number; newLast30Days: number; suspended: number; active: number };
  receipts: { total: number; totalSpending: number };
  reports: { total: number };
};

type Analytics = {
  userGrowth: { date: string; count: number }[];
  colocationGrowth: { date: string; count: number }[];
  receiptActivity: { date: string; count: number; total: number }[];
};

type Colocation = {
  id: string; name: string; inviteCode: string; createdAt: string;
  suspendedAt: string | null; memberCount: number;
  admin: { id: string; name: string; email: string } | null;
};

export default async function DashboardPage() {
  const [overview, analytics, colocations] = await Promise.all([
    adminFetch<Overview>('/super-admin/overview'),
    adminFetch<Analytics>('/super-admin/analytics?period=month'),
    adminFetch<Colocation[]>('/super-admin/colocations'),
  ]);

  const kpis = [
    {
      label: 'Utilisateurs actifs', value: overview.users.active,
      sub: `+${overview.users.newLast30Days} ce mois`,
      iconClass: styles.statIconGreen, Icon: Users,
    },
    {
      label: 'Colocations actives', value: overview.colocations.active,
      sub: `+${overview.colocations.newLast30Days} ce mois`,
      iconClass: styles.statIconBlue, Icon: Home,
    },
    {
      label: 'Dépenses suivies', value: fmtEuro(overview.receipts.totalSpending),
      sub: `${overview.receipts.total} tickets`,
      iconClass: styles.statIconAmber, Icon: Receipt,
    },
    {
      label: 'Signalements', value: overview.reports.total,
      sub: 'Total plateforme',
      iconClass: styles.statIconPurple, Icon: BarChart2,
    },
    {
      label: 'Utilisateurs suspendus', value: overview.users.suspended,
      sub: `sur ${overview.users.total} total`,
      iconClass: styles.statIconRed, Icon: AlertTriangle,
    },
    {
      label: 'Colocations suspendues', value: overview.colocations.suspended,
      sub: `sur ${overview.colocations.total} total`,
      iconClass: styles.statIconSlate, Icon: TrendingUp,
    },
  ];

  const recent = colocations.slice(0, 10);

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Tableau de bord</h1>
          <p className={styles.pageSubtitle}>Vue globale de la plateforme Habizy</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {kpis.map(({ label, value, sub, iconClass, Icon }) => (
          <div key={label} className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={styles.statLabel}>{label}</span>
              <span className={`${styles.statIcon} ${iconClass}`}>
                <Icon size={14} />
              </span>
            </div>
            <strong className={styles.statValue}>{value}</strong>
            <span className={`${styles.statSub} ${styles.statSubNeutral}`}>{sub}</span>
          </div>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Nouveaux utilisateurs</div>
          <div className={styles.chartSub}>30 derniers jours</div>
          <BarChart data={analytics.userGrowth} color="#16a34a" />
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Nouvelles colocations</div>
          <div className={styles.chartSub}>30 derniers jours</div>
          <BarChart data={analytics.colocationGrowth} color="#2563eb" />
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Dépenses enregistrées (€)</div>
          <div className={styles.chartSub}>30 derniers jours</div>
          <BarChart data={analytics.receiptActivity} valueKey="total" color="#d97706" formatValue={v => `${v.toFixed(0)}€`} />
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Tickets déposés</div>
          <div className={styles.chartSub}>30 derniers jours</div>
          <BarChart data={analytics.receiptActivity} color="#7c3aed" />
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHead}>
          <span className={styles.tableCardTitle}>Colocations récentes</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className={styles.tableCardMeta}>{colocations.length} au total</span>
            <Link href="/admin/colocations" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
              Voir tout
            </Link>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Colocation</th>
              <th>Admin</th>
              <th>Membres</th>
              <th>Code</th>
              <th>Statut</th>
              <th>Créée le</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <Home size={32} />
                    <span className={styles.emptyStateTitle}>Aucune colocation</span>
                  </div>
                </td>
              </tr>
            )}
            {recent.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className={styles.cellPrimary}>{c.name}</div>
                  <div className={styles.cellMono}>{c.inviteCode}</div>
                </td>
                <td>
                  {c.admin
                    ? <><div className={styles.cellPrimary}>{c.admin.name}</div><div className={styles.cellMuted}>{c.admin.email}</div></>
                    : <span className={styles.cellMuted}>—</span>}
                </td>
                <td>{c.memberCount}</td>
                <td><span className={styles.cellMono}>{c.inviteCode}</span></td>
                <td>
                  {c.suspendedAt
                    ? <span className={`${styles.badge} ${styles.badgeRed}`}>Suspendue</span>
                    : <span className={`${styles.badge} ${styles.badgeGreen}`}>Active</span>}
                </td>
                <td className={styles.cellMuted}>{fmtDate(c.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
