"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();
  const params = useSearchParams();
  const next = params?.get('next') || '/portal/dashboard';

  async function submit(e: any) {
    e.preventDefault();
    setStatus('Signing in...');
    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email }), headers: { 'Content-Type': 'application/json' } });
    if (res.ok) { router.push(next); } else setStatus('Failed');
  }

  return (
    <div className="container mx-auto py-16 px-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input type="email" required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 border rounded" />
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-brand text-white rounded-2xl">Sign In</button>
          <div className="text-sm text-slate-500">{status}</div>
        </div>
      </form>
    </div>
  );
}
