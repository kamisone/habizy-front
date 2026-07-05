import { ClipboardList } from 'lucide-react';
import { adminFetch, fmtDateTime } from '@/lib/admin';
import styles from '../../admin.module.css';

export const metadata = { title: 'Journal d\'audit' };

type AuditLog = {
  id: string; action: string; targetType: string; targetId: string | null;
  targetName: string; actorId: string; actorName: string;
  details: Record<string, unknown> | null; createdAt: string;
};

type PagedResult = { logs: AuditLog[]; total: number; page: number; pages: number };

const actionStyles: Record<string, string> = {
  DELETE_USER: styles.auditDelete,
  DELETE_COLOCATION: styles.auditDelete,
  SUSPEND_USER: styles.auditSuspend,
  SUSPEND_COLOCATION: styles.auditSuspend,
  ACTIVATE_USER: styles.auditActivate,
  ACTIVATE_COLOCATION: styles.auditActivate,
  BROADCAST_NOTIFICATION: styles.auditBroadcast,
  BOOTSTRAP: styles.auditBootstrap,
};

const actionLabels: Record<string, string> = {
  DELETE_USER: 'Supprimer utilisateur',
  DELETE_COLOCATION: 'Supprimer colocation',
  SUSPEND_USER: 'Suspendre utilisateur',
  SUSPEND_COLOCATION: 'Suspendre colocation',
  ACTIVATE_USER: 'Réactiver utilisateur',
  ACTIVATE_COLOCATION: 'Réactiver colocation',
  BROADCAST_NOTIFICATION: 'Diffusion notif.',
  BOOTSTRAP: 'Bootstrap super-admin',
};

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; page?: string }>;
}) {
  const params = await searchParams;
  const action = params.action ?? '';
  const page = parseInt(params.page ?? '1', 10);

  const qs = new URLSearchParams();
  if (action) qs.set('action', action);
  qs.set('page', String(page));

  const data = await adminFetch<PagedResult>(`/super-admin/audit-logs?${qs}`);

  const pageHref = (p: number) => {
    const q = new URLSearchParams();
    if (action) q.set('action', action);
    q.set('page', String(p));
    return `/admin/audit-logs?${q}`;
  };

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Journal d&apos;audit</h1>
          <p className={styles.pageSubtitle}>Toutes les actions effectuées par les super-admins</p>
        </div>
      </div>

      <form method="GET" className={styles.toolbar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Action</label>
          <select name="action" defaultValue={action} className={styles.filterSelect}>
            <option value="">Toutes</option>
            {Object.entries(actionLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
          Filtrer
        </button>
        {action && (
          <a href="/admin/audit-logs" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
            Réinitialiser
          </a>
        )}
      </form>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHead}>
          <span className={styles.tableCardTitle}>Activité super-admin</span>
          <span className={styles.tableCardMeta}>{data.total} entrée{data.total > 1 ? 's' : ''}</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Cible</th>
              <th>Effectué par</th>
              <th>Détails</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.logs.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <ClipboardList size={32} />
                    <span className={styles.emptyStateTitle}>Aucune action enregistrée</span>
                    <span className={styles.emptyStateText}>Les actions super-admin apparaissent ici automatiquement</span>
                  </div>
                </td>
              </tr>
            )}
            {data.logs.map((log) => (
              <tr key={log.id}>
                <td>
                  <span className={`${styles.auditBadge} ${actionStyles[log.action] ?? styles.auditDefault}`}>
                    {actionLabels[log.action] ?? log.action}
                  </span>
                </td>
                <td>
                  <div className={styles.cellPrimary}>{log.targetName}</div>
                  <div className={styles.cellMuted}>{log.targetType}</div>
                </td>
                <td>
                  <div className={styles.cellPrimary}>{log.actorName}</div>
                  <div className={styles.cellMono}>{log.actorId.slice(0, 8)}…</div>
                </td>
                <td>
                  {log.details
                    ? <span className={styles.cellMuted} style={{ fontFamily: 'monospace', fontSize: 11 }}>
                        {Object.entries(log.details)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' · ')}
                      </span>
                    : <span className={styles.cellMuted}>—</span>}
                </td>
                <td className={styles.cellMuted}>{fmtDateTime(log.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.pages > 1 && (
          <div className={styles.pagination}>
            <span>Page {data.page} / {data.pages} · {data.total} entrées</span>
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
