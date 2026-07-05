import { adminFetch, fmtEuro } from '@/lib/admin';
import BarChart from '../_components/BarChart';
import styles from '../../admin.module.css';
import Link from 'next/link';

export const metadata = { title: 'Analytiques' };

type Analytics = {
  period: string; days: number;
  userGrowth: { date: string; count: number }[];
  colocationGrowth: { date: string; count: number }[];
  receiptActivity: { date: string; count: number; total: number }[];
};

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const period = (params.period ?? 'month') as 'week' | 'month' | '3months';

  const analytics = await adminFetch<Analytics>(`/super-admin/analytics?period=${period}`);

  const totalUsers = analytics.userGrowth.reduce((s, d) => s + d.count, 0);
  const totalColocations = analytics.colocationGrowth.reduce((s, d) => s + d.count, 0);
  const totalReceipts = analytics.receiptActivity.reduce((s, d) => s + d.count, 0);
  const totalSpending = analytics.receiptActivity.reduce((s, d) => s + d.total, 0);

  const periodLabels: Record<string, string> = {
    week: '7 derniers jours',
    month: '30 derniers jours',
    '3months': '90 derniers jours',
  };

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Analytiques</h1>
          <p className={styles.pageSubtitle}>Croissance et activité de la plateforme — {periodLabels[period]}</p>
        </div>
        <div className={styles.pageActions}>
          {(['week', 'month', '3months'] as const).map(p => (
            <Link
              key={p}
              href={`/admin/analytics?period=${p}`}
              className={`${styles.btn} ${p === period ? styles.btnPrimary : styles.btnOutline} ${styles.btnSm}`}
            >
              {p === 'week' ? '7j' : p === 'month' ? '30j' : '90j'}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Nouveaux utilisateurs</span>
          </div>
          <strong className={styles.statValue}>{totalUsers}</strong>
          <span className={`${styles.statSub} ${styles.statSubNeutral}`}>{periodLabels[period]}</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Nouvelles colocations</span>
          </div>
          <strong className={styles.statValue}>{totalColocations}</strong>
          <span className={`${styles.statSub} ${styles.statSubNeutral}`}>{periodLabels[period]}</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Tickets enregistrés</span>
          </div>
          <strong className={styles.statValue}>{totalReceipts}</strong>
          <span className={`${styles.statSub} ${styles.statSubNeutral}`}>{periodLabels[period]}</span>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <span className={styles.statLabel}>Dépenses totales</span>
          </div>
          <strong className={styles.statValue}>{fmtEuro(totalSpending)}</strong>
          <span className={`${styles.statSub} ${styles.statSubNeutral}`}>{periodLabels[period]}</span>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Inscriptions utilisateurs</div>
          <div className={styles.chartSub}>{periodLabels[period]} · {totalUsers} nouveaux</div>
          <BarChart data={analytics.userGrowth} color="#16a34a" height={140} />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Création de colocations</div>
          <div className={styles.chartSub}>{periodLabels[period]} · {totalColocations} nouvelles</div>
          <BarChart data={analytics.colocationGrowth} color="#2563eb" height={140} />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Dépenses enregistrées (€)</div>
          <div className={styles.chartSub}>{periodLabels[period]} · {fmtEuro(totalSpending)} total</div>
          <BarChart
            data={analytics.receiptActivity}
            valueKey="total"
            color="#d97706"
            height={140}
            formatValue={v => `${v.toFixed(0)}€`}
          />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Tickets de caisse déposés</div>
          <div className={styles.chartSub}>{periodLabels[period]} · {totalReceipts} tickets</div>
          <BarChart data={analytics.receiptActivity} color="#7c3aed" height={140} />
        </div>
      </div>
    </div>
  );
}
