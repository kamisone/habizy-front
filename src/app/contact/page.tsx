"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(`mailto:support@habizy.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`De: ${form.name} (${form.email})\n\n${form.message}`)}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Contact</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Nous contacter</h1>
          <p className={`lead ${styles.heroLead}`}>
            Une question, un problème, un retour d&apos;expérience ? Notre équipe
            répond sous 48h ouvrées.
          </p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoCol}>
              <h2 className={`h3 ${styles.infoTitle}`}>Coordonnées</h2>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>✉️</span>
                  <div>
                    <strong className={styles.infoLabel}>Email support</strong>
                    <a href="mailto:support@habizy.com" className={styles.infoValue}>support@habizy.com</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>⏱️</span>
                  <div>
                    <strong className={styles.infoLabel}>Délai de réponse</strong>
                    <span className={styles.infoValue}>48h ouvrées</span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>🌍</span>
                  <div>
                    <strong className={styles.infoLabel}>Langues</strong>
                    <span className={styles.infoValue}>Français, English</span>
                  </div>
                </div>
              </div>

              <div className={styles.topics}>
                <p className={styles.topicsTitle}>Vous pouvez nous écrire pour :</p>
                <ul className={styles.topicsList}>
                  {["Signaler un bug", "Proposer une fonctionnalité", "Question sur l'app", "Partenariat ou presse", "Confidentialité & données"].map((t) => (
                    <li key={t} className={styles.topicsItem}>
                      <span>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.formCol}>
              {status === "sent" ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h2 className={styles.successTitle}>Message envoyé !</h2>
                  <p className={styles.successDesc}>
                    Merci de nous avoir contactés. Nous reviendrons vers vous sous 48h ouvrées.
                  </p>
                  <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }} className={styles.resetBtn}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="name" className={styles.label}>Nom</label>
                      <input
                        id="name" name="name" type="text"
                        className={styles.input}
                        placeholder="Votre nom"
                        required
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="email" className={styles.label}>Email</label>
                      <input
                        id="email" name="email" type="email"
                        className={styles.input}
                        placeholder="votre@email.com"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="subject" className={styles.label}>Sujet</label>
                    <select id="subject" name="subject" className={styles.select} required value={form.subject} onChange={handleChange}>
                      <option value="">Choisir un sujet…</option>
                      <option value="Bug">Signaler un bug</option>
                      <option value="Feature">Proposer une fonctionnalité</option>
                      <option value="Question">Question sur l&apos;app</option>
                      <option value="Partenariat">Partenariat ou presse</option>
                      <option value="Données">Confidentialité &amp; données</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                      id="message" name="message"
                      className={styles.textarea}
                      placeholder="Décrivez votre question ou problème en détail…"
                      rows={6}
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                  {status === "error" && (
                    <p className={styles.errorMsg}>Une erreur est survenue. Envoyez directement un email à support@habizy.com.</p>
                  )}
                  <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
                    {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
