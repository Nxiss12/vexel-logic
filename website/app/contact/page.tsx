"use client";
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '', hp: '' });
  const [status, setStatus] = useState('');

  async function onSubmit(e: any) {
    e.preventDefault();
    if (form.hp) return setStatus('Spam detected');
    setStatus('Sending...');
    const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) setStatus('Thanks — we will be in touch'); else setStatus('Error sending');
  }

  return (
    <div className="container mx-auto py-16 px-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-4 py-2 border rounded" />
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full px-4 py-2 border rounded" />
        <input placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full px-4 py-2 border rounded" />
        <input placeholder="Business type" value={form.business} onChange={e=>setForm({...form,business:e.target.value})} className="w-full px-4 py-2 border rounded" />
        <textarea required placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full px-4 py-2 border rounded" />
        <input name="hp" value={form.hp} onChange={e=>setForm({...form,hp:e.target.value})} className="hidden" />
        <div className="flex items-center gap-4">
          <button type="submit" className="px-5 py-2 bg-brand text-white rounded-2xl">Send</button>
          <div className="text-sm text-slate-500">{status}</div>
        </div>
      </form>
    </div>
  );
}
