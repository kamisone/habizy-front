'use client';

import { useActionState } from 'react';
import { broadcastAction } from '../../actions';
import styles from '../../admin.module.css';

export default function BroadcastForm() {
  const [state, action, pending] = useActionState(broadcastAction, null);

  return (
    <div className={styles.formCard}>
      <div className={styles.formCardTitle}>Envoyer une annonce</div>

      {state?.error && (
        <div className={`${styles.formAlert} ${styles.formAlertError}`}>{state.error}</div>
      )}
      {state?.success && (
        <div className={`${styles.formAlert} ${styles.formAlertSuccess}`}>{state.success}</div>
      )}

      <form action={action}>
        <div className={styles.formGrid}>
          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label className={styles.formLabel}>Titre *</label>
            <input name="title" required className={styles.formInput} placeholder="Titre de la notification" />
          </div>
          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label className={styles.formLabel}>Message *</label>
            <textarea name="message" required className={styles.formTextarea} placeholder="Contenu de la notification…" />
          </div>
          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label className={styles.formLabel}>Colocation cible (optionnel)</label>
            <input name="colocationId" className={styles.formInput} placeholder="ID de la colocation (laisser vide = tous les utilisateurs)" />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <button type="submit" disabled={pending} className={`${styles.btn} ${styles.btnGreen}`}>
            {pending ? 'Envoi en cours…' : 'Envoyer la notification'}
          </button>
        </div>
      </form>
    </div>
  );
}
