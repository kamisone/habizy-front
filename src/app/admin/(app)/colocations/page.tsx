import { Home, Search, Pause, Play, Trash2 } from 'lucide-react';
import { adminFetch, fmtDate } from '@/lib/admin';
import {
  suspendColocationAction, activateColocationAction, deleteColocationAction,
} from '../../actions';
import styles from '../../admin.module.css';

export const metadata = { title: 'Colocations' };

type Colocation = {
  id: string; name: string; inviteCode: string; createdAt: string;
  suspendedAt: string | null; memberCount: number;
  admin: { id: string; name: string; email: string } | null;
};

export default async function ColocationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? '';
  const status = (params.status ?? '') as 'active' | 'suspended' | '';

  const qs = new URLSearchParams();
  if (search) qs.set('search', search);
  if (status) qs.set('status', status);

  const colocations = await adminFetch<Colocation[]>(`/super-admin/colocations?${qs}`);
  const activeCount = colocations.filter(c => !c.suspendedAt).length;
  const suspendedCount = colocations.filter(c => !!c.suspendedAt).length;

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Colocations</h1>
          <p className={styles.pageSubtitle}>
            {colocations.length} trouvée{colocations.length > 1 ? 's' : ''} · {activeCount} actives · {suspendedCount} suspendues
          </p>
        </div>
      </div>

      <form method="GET" className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={14} />
          <input
            name="search"
            defaultValue={search}
            placeholder="Rechercher par nom, code, email admin…"
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Statut</label>
          <select name="status" defaultValue={status} className={styles.filterSelect}>
            <option value="">Tous</option>
            <option value="active">Actives</option>
            <option value="suspended">Suspendues</option>
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
          Filtrer
        </button>
        {(search || status) && (
          <a href="/admin/colocations" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
            Réinitialiser
          </a>
        )}
      </form>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHead}>
          <span className={styles.tableCardTitle}>Toutes les colocations</span>
          <span className={styles.tableCardMeta}>{colocations.length} résultat{colocations.length > 1 ? 's' : ''}</span>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {colocations.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <Home size={32} />
                    <span className={styles.emptyStateTitle}>Aucune colocation trouvée</span>
                    <span className={styles.emptyStateText}>Modifiez vos critères de recherche</span>
                  </div>
                </td>
              </tr>
            )}
            {colocations.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className={styles.cellPrimary}>{c.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>{c.id.slice(0, 8)}…</div>
                </td>
                <td>
                  {c.admin
                    ? <><div className={styles.cellPrimary}>{c.admin.name}</div><div className={styles.cellMuted}>{c.admin.email}</div></>
                    : <span className={styles.cellMuted}>—</span>}
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>
                    {c.memberCount} membre{c.memberCount > 1 ? 's' : ''}
                  </span>
                </td>
                <td><span className={styles.cellMono}>{c.inviteCode}</span></td>
                <td>
                  {c.suspendedAt
                    ? <span className={`${styles.badge} ${styles.badgeRed}`}>Suspendue</span>
                    : <span className={`${styles.badge} ${styles.badgeGreen}`}>Active</span>}
                </td>
                <td className={styles.cellMuted}>{fmtDate(c.createdAt)}</td>
                <td>
                  <div className={styles.rowActions}>
                    {c.suspendedAt ? (
                      <form action={activateColocationAction.bind(null, c.id)}>
                        <button type="submit" className={`${styles.iconBtn} ${styles.iconBtnGreen}`} title="Réactiver">
                          <Play size={13} />
                        </button>
                      </form>
                    ) : (
                      <form action={suspendColocationAction.bind(null, c.id)}>
                        <button type="submit" className={`${styles.iconBtn} ${styles.iconBtnWarning}`} title="Suspendre">
                          <Pause size={13} />
                        </button>
                      </form>
                    )}
                    <form action={deleteColocationAction.bind(null, c.id)}>
                      <button type="submit" className={`${styles.iconBtn} ${styles.iconBtnDanger}`} title="Supprimer définitivement">
                        <Trash2 size={13} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
