import { FileText, Search } from 'lucide-react';
import { adminFetch, fmtDateTime } from '@/lib/admin';
import styles from '../../admin.module.css';

export const metadata = { title: 'Signalements' };

type Report = {
  id: string; title: string; description: string | null; tags: string[] | null;
  createdAt: string; updatedAt: string;
  user: { id: string; name: string; email: string };
  colocation: { id: string; name: string };
};

type PagedResult = { reports: Report[]; total: number; page: number; pages: number };

type Colocation = { id: string; name: string };

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; colocationId?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? '';
  const colocationId = params.colocationId ?? '';
  const page = parseInt(params.page ?? '1', 10);

  const qs = new URLSearchParams();
  if (search) qs.set('search', search);
  if (colocationId) qs.set('colocationId', colocationId);
  qs.set('page', String(page));

  const [data, colocations] = await Promise.all([
    adminFetch<PagedResult>(`/super-admin/reports?${qs}`),
    adminFetch<Colocation[]>('/super-admin/colocations'),
  ]);

  const activeFilters = search || colocationId;

  const pageHref = (p: number) => {
    const q = new URLSearchParams();
    if (search) q.set('search', search);
    if (colocationId) q.set('colocationId', colocationId);
    q.set('page', String(p));
    return `/admin/reports?${q}`;
  };

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Signalements</h1>
          <p className={styles.pageSubtitle}>{data.total} signalement{data.total > 1 ? 's' : ''} sur la plateforme</p>
        </div>
      </div>

      <form method="GET" className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={14} />
          <input
            name="search"
            defaultValue={search}
            placeholder="Rechercher par titre ou description…"
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Colocation</label>
          <select name="colocationId" defaultValue={colocationId} className={styles.filterSelect}>
            <option value="">Toutes</option>
            {colocations.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
          Filtrer
        </button>
        {activeFilters && (
          <a href="/admin/reports" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
            Réinitialiser
          </a>
        )}
      </form>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHead}>
          <span className={styles.tableCardTitle}>Tous les signalements</span>
          <span className={styles.tableCardMeta}>{data.total} total</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Colocation</th>
              <th>Tags</th>
              <th>Créé le</th>
            </tr>
          </thead>
          <tbody>
            {data.reports.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <FileText size={32} />
                    <span className={styles.emptyStateTitle}>Aucun signalement</span>
                    <span className={styles.emptyStateText}>Les signalements créés dans les colocations apparaissent ici</span>
                  </div>
                </td>
              </tr>
            )}
            {data.reports.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className={styles.cellPrimary}>{r.title}</div>
                  {r.description && (
                    <div className={styles.cellMuted} style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.description}
                    </div>
                  )}
                </td>
                <td>
                  <div className={styles.cellPrimary}>{r.user?.name ?? '—'}</div>
                  <div className={styles.cellMuted}>{r.user?.email}</div>
                </td>
                <td>{r.colocation?.name ?? '—'}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(r.tags ?? []).slice(0, 3).map(t => (
                      <span key={t} className={`${styles.badge} ${styles.badgeGray}`}>{t}</span>
                    ))}
                    {(r.tags ?? []).length > 3 && (
                      <span className={`${styles.badge} ${styles.badgeGray}`}>+{(r.tags ?? []).length - 3}</span>
                    )}
                  </div>
                </td>
                <td className={styles.cellMuted}>{fmtDateTime(r.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.pages > 1 && (
          <div className={styles.pagination}>
            <span>Page {data.page} / {data.pages} · {data.total} résultats</span>
            <div className={styles.paginationPages}>
              {page > 1 && <a href={pageHref(page - 1)} className={styles.pageBtn}>←</a>}
              {Array.from({ length: Math.min(data.pages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <a key={p} href={pageHref(p)} className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}>{p}</a>
                );
              })}
              {page < data.pages && <a href={pageHref(page + 1)} className={styles.pageBtn}>→</a>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
