"use client";
import { useState } from 'react';

export default function Support() {
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('');

  async function submit(e: any) {
    e.preventDefault();
    setStatus('Sending...');
    const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg }) });
    if (res.ok) setStatus('Ticket created'); else setStatus('Error');
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <form onSubmit={submit} className="space-y-4">
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="How can we help?" className="w-full border p-3 rounded" />
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-brand text-white rounded-2xl">Submit</button>
          <div className="text-sm text-slate-500">{status}</div>
        </div>
      </form>
    </div>
  );
}
