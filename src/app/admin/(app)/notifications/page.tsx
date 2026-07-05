import { Bell, Search } from 'lucide-react';
import { adminFetch, fmtDateTime } from '@/lib/admin';
import BroadcastForm from './BroadcastForm';
import styles from '../../admin.module.css';

export const metadata = { title: 'Notifications' };

type NotifItem = {
  id: string; type: string; title: string | null; message: string;
  isRead: boolean; userId: string; colocationId: string | null; createdAt: string;
};

type PagedResult = { items: NotifItem[]; total: number; page: number; pages: number };

const typeColors: Record<string, string> = {
  ANNOUNCEMENT: 'badgeBlue',
  RECEIPT_ADDED: 'badgeGreen',
  SPENDING_GAP: 'badgeAmber',
  REPORT_CREATED: 'badgePurple',
  REPORT_UPDATED: 'badgePurple',
  COMMENT_ADDED: 'badgeGray',
  MEMBER_JOINED: 'badgeGreen',
};

const typeLabels: Record<string, string> = {
  ANNOUNCEMENT: 'Annonce',
  RECEIPT_ADDED: 'Ticket ajouté',
  SPENDING_GAP: 'Écart dépenses',
  REPORT_CREATED: 'Signalement créé',
  REPORT_UPDATED: 'Signalement MàJ',
  COMMENT_ADDED: 'Commentaire',
  MEMBER_JOINED: 'Nouveau membre',
};

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string }>;
}) {
  const params = await searchParams;
  const type = params.type ?? '';
  const page = parseInt(params.page ?? '1', 10);

  const qs = new URLSearchParams();
  if (type) qs.set('type', type);
  qs.set('page', String(page));

  const data = await adminFetch<PagedResult>(`/super-admin/notifications?${qs}`);

  const pageHref = (p: number) => {
    const q = new URLSearchParams();
    if (type) q.set('type', type);
    q.set('page', String(p));
    return `/admin/notifications?${q}`;
  };

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Notifications</h1>
          <p className={styles.pageSubtitle}>Historique des notifications et diffusion d&apos;annonces</p>
        </div>
      </div>

      <BroadcastForm />

      <form method="GET" className={styles.toolbar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Type</label>
          <select name="type" defaultValue={type} className={styles.filterSelect}>
            <option value="">Tous</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
          Filtrer
        </button>
        {type && (
          <a href="/admin/notifications" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
            Réinitialiser
          </a>
        )}
      </form>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHead}>
          <span className={styles.tableCardTitle}>Historique</span>
          <span className={styles.tableCardMeta}>{data.total} notifications</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Titre</th>
              <th>Message</th>
              <th>Destinataire</th>
              <th>Lu</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <Bell size={32} />
                    <span className={styles.emptyStateTitle}>Aucune notification</span>
                    <span className={styles.emptyStateText}>Les notifications envoyées apparaissent ici</span>
                  </div>
                </td>
              </tr>
            )}
            {data.items.map((n) => (
              <tr key={n.id}>
                <td>
                  <span className={`${styles.badge} ${styles[typeColors[n.type] ?? 'badgeGray']}`}>
                    {typeLabels[n.type] ?? n.type}
                  </span>
                </td>
                <td className={styles.cellPrimary}>{n.title ?? '—'}</td>
                <td>
                  <span style={{ maxWidth: 260, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {n.message}
                  </span>
                </td>
                <td><span className={styles.cellMono}>{n.userId.slice(0, 8)}…</span></td>
                <td>
                  {n.isRead
                    ? <span className={`${styles.badge} ${styles.badgeGreen}`}>Lu</span>
                    : <span className={`${styles.badge} ${styles.badgeGray}`}>Non lu</span>}
                </td>
                <td className={styles.cellMuted}>{fmtDateTime(n.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.pages > 1 && (
          <div className={styles.pagination}>
            <span>Page {data.page} / {data.pages} · {data.total} total</span>
            <div className={styles.paginationPages}>
              {page > 1 && <a href={pageHref(page - 1)} className={styles.pageBtn}>←</a>}
              {Array.from({ length: Math.min(data.pages, 7) }, (_, i) => (
                <a
                  key={i + 1}
                  href={pageHref(i + 1)}
                  className={`${styles.pageBtn} ${i + 1 === page ? styles.pageBtnActive : ''}`}
                >
                  {i + 1}
                </a>
              ))}
              {page < data.pages && <a href={pageHref(page + 1)} className={styles.pageBtn}>→</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
