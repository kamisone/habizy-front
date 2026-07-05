'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { adminFetch } from '@/lib/admin';
import { getApiUrl } from '@/lib/api-url';

// ─── Auth ────────────────────────────────────────────────────────────────────
export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const api = getApiUrl();

  let loginRes: Response;
  try {
    loginRes = await fetch(`${api}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });
  } catch {
    return { error: 'Service indisponible, veuillez réessayer' };
  }

  if (!loginRes.ok) return { error: 'Identifiants incorrects' };

  const { accessToken } = await loginRes.json();

  let meRes: Response;
  try {
    meRes = await fetch(`${api}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
  } catch {
    return { error: 'Impossible de vérifier le compte' };
  }

  if (!meRes.ok) return { error: 'Impossible de vérifier le compte' };

  const me = await meRes.json();
  if (!me.isSuperAdmin) return { error: 'Accès refusé : compte super-admin requis' };

  const store = await cookies();
  store.set('admin_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const store = await cookies();
  store.delete('admin_token');
  redirect('/admin/login');
}

// ─── Users ───────────────────────────────────────────────────────────────────
export async function suspendUserAction(id: string) {
  await adminFetch(`/super-admin/users/${id}/suspend`, { method: 'POST' });
  revalidatePath('/admin/users');
}

export async function activateUserAction(id: string) {
  await adminFetch(`/super-admin/users/${id}/activate`, { method: 'POST' });
  revalidatePath('/admin/users');
}

export async function deleteUserAction(id: string) {
  await adminFetch(`/super-admin/users/${id}`, { method: 'DELETE' });
  revalidatePath('/admin/users');
  revalidatePath('/admin/dashboard');
}

// ─── Colocations ─────────────────────────────────────────────────────────────
export async function suspendColocationAction(id: string) {
  await adminFetch(`/super-admin/colocations/${id}/suspend`, { method: 'POST' });
  revalidatePath('/admin/colocations');
}

export async function activateColocationAction(id: string) {
  await adminFetch(`/super-admin/colocations/${id}/activate`, { method: 'POST' });
  revalidatePath('/admin/colocations');
}

export async function deleteColocationAction(id: string) {
  await adminFetch(`/super-admin/colocations/${id}`, { method: 'DELETE' });
  revalidatePath('/admin/colocations');
  revalidatePath('/admin/dashboard');
}

// ─── Notifications ────────────────────────────────────────────────────────────
export async function broadcastAction(
  _prev: { error?: string; success?: string } | null,
  formData: FormData,
) {
  const title = formData.get('title') as string;
  const message = formData.get('message') as string;
  const colocationId = (formData.get('colocationId') as string) || undefined;

  if (!title?.trim() || !message?.trim()) return { error: 'Titre et message requis' };

  try {
    const result = await adminFetch<{ sent: number }>('/super-admin/notifications/broadcast', {
      method: 'POST',
      body: JSON.stringify({ title: title.trim(), message: message.trim(), colocationId }),
    });
    revalidatePath('/admin/notifications');
    return { success: `Notification envoyée à ${result.sent} utilisateur(s)` };
  } catch {
    return { error: 'Erreur lors de l\'envoi' };
  }
}
