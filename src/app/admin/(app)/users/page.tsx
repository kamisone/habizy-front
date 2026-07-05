import { Users, Search, Shield, Pause, Play, Trash2 } from 'lucide-react';
import { adminFetch, fmtDate, getInitials } from '@/lib/admin';
import { suspendUserAction, activateUserAction, deleteUserAction } from '../../actions';
import styles from '../../admin.module.css';

export const metadata = { title: 'Utilisateurs' };

type User = {
  id: string; name: string; email: string; colorHex: string; initial: string;
  isAdmin: boolean; isSuperAdmin: boolean; profileCompleted: boolean;
  suspendedAt: string | null; anonymizedAt: string | null; createdAt: string;
  colocation: { id: string; name: string } | null;
};

type Colocation = { id: string; name: string };

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; role?: string; status?: string; colocationId?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? '';
  const role = (params.role ?? '') as 'admin' | 'super_admin' | 'member' | '';
  const status = (params.status ?? '') as 'active' | 'suspended' | '';
  const colocationId = params.colocationId ?? '';

  const qs = new URLSearchParams();
  if (search) qs.set('search', search);
  if (role) qs.set('role', role);
  if (status) qs.set('status', status);
  if (colocationId) qs.set('colocationId', colocationId);

  const [users, colocations] = await Promise.all([
    adminFetch<User[]>(`/super-admin/users?${qs}`),
    adminFetch<Colocation[]>('/super-admin/colocations'),
  ]);
  const activeCount = users.filter(u => !u.suspendedAt && !u.anonymizedAt).length;
  const suspendedCount = users.filter(u => !!u.suspendedAt).length;

  return (
    <div className={styles.pageInner}>
      <div className={styles.pageHeader}>
        <div className={styles.pageTitles}>
          <h1 className={styles.pageTitle}>Utilisateurs</h1>
          <p className={styles.pageSubtitle}>
            {users.length} trouvé{users.length > 1 ? 's' : ''} · {activeCount} actifs · {suspendedCount} suspendus
          </p>
        </div>
      </div>

      <form method="GET" className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={14} />
          <input
            name="search"
            defaultValue={search}
            placeholder="Rechercher par nom ou email…"
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Rôle</label>
          <select name="role" defaultValue={role} className={styles.filterSelect}>
            <option value="">Tous</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin coloc</option>
            <option value="member">Membre</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Statut</label>
          <select name="status" defaultValue={status} className={styles.filterSelect}>
            <option value="">Tous</option>
            <option value="active">Actifs</option>
            <option value="suspended">Suspendus</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Colocation</label>
          <select name="colocationId" defaultValue={colocationId} className={styles.filterSelect}>
            <option value="">Toutes</option>
            {colocations.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
          Filtrer
        </button>
        {(search || role || status || colocationId) && (
          <a href="/admin/users" className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}>
            Réinitialiser
          </a>
        )}
      </form>

      <div className={styles.tableCard}>
        <div className={styles.tableCardHead}>
          <span className={styles.tableCardTitle}>Tous les utilisateurs</span>
          <span className={styles.tableCardMeta}>{users.length} résultat{users.length > 1 ? 's' : ''}</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Rôle</th>
              <th>Colocation</th>
              <th>Statut</th>
              <th>Inscrit le</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <Users size={32} />
                    <span className={styles.emptyStateTitle}>Aucun utilisateur trouvé</span>
                    <span className={styles.emptyStateText}>Modifiez vos critères de recherche</span>
                  </div>
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className={styles.cellUser}>
                    <div className={styles.avatar} style={{ background: u.colorHex }}>
                      {getInitials(u.name)}
                    </div>
                    <div>
                      <div className={styles.cellPrimary}>{u.name}</div>
                      <div className={styles.cellMuted}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {u.isSuperAdmin
                    ? <span className={`${styles.badge} ${styles.badgePurple}`}><Shield size={10} /> Super Admin</span>
                    : u.isAdmin
                    ? <span className={`${styles.badge} ${styles.badgeGreen}`}>Admin</span>
                    : <span className={`${styles.badge} ${styles.badgeGray}`}>Membre</span>}
                  {!u.profileCompleted && (
                    <span className={`${styles.badge} ${styles.badgeAmber}`} style={{ marginLeft: 4 }}>Incomplet</span>
                  )}
                </td>
                <td>
                  {u.colocation
                    ? <span>{u.colocation.name}</span>
                    : <span className={styles.cellMuted}>—</span>}
                </td>
                <td>
                  {u.anonymizedAt
                    ? <span className={`${styles.badge} ${styles.badgeGray}`}>Anonymisé</span>
                    : u.suspendedAt
                    ? <span className={`${styles.badge} ${styles.badgeRed}`}>Suspendu</span>
                    : <span className={`${styles.badge} ${styles.badgeGreen}`}>Actif</span>}
                </td>
                <td className={styles.cellMuted}>{fmtDate(u.createdAt)}</td>
                <td>
                  {!u.isSuperAdmin && !u.anonymizedAt && (
                    <div className={styles.rowActions}>
                      {u.suspendedAt ? (
                        <form action={activateUserAction.bind(null, u.id)}>
                          <button type="submit" className={`${styles.iconBtn} ${styles.iconBtnGreen}`} title="Réactiver">
                            <Play size={13} />
                          </button>
                        </form>
                      ) : (
                        <form action={suspendUserAction.bind(null, u.id)}>
                          <button type="submit" className={`${styles.iconBtn} ${styles.iconBtnWarning}`} title="Suspendre">
                            <Pause size={13} />
                          </button>
                        </form>
                      )}
                      <form action={deleteUserAction.bind(null, u.id)}>
                        <button type="submit" className={`${styles.iconBtn} ${styles.iconBtnDanger}`} title="Supprimer définitivement">
                          <Trash2 size={13} />
                        </button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
