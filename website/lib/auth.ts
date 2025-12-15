import { cookies } from 'next/headers';

export function getSession() {
  const c = cookies().get('vexel_session');
  if (!c) return null;
  try {
    const val = c.value;
    return { user: { email: val } };
  } catch {
    return null;
  }
}

export function setSession(res: Response, email: string) {
  // DEV-only simple cookie. TODO: replace with signed session store.
  res.headers.append('Set-Cookie', `vexel_session=${email}; Path=/; HttpOnly; SameSite=Lax`);
}

export function clearSession(res: Response) {
  res.headers.append('Set-Cookie', `vexel_session=; Path=/; HttpOnly; Max-Age=0`);
}
