"use client";
import { useState } from 'react';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="border rounded p-3">
          <button className="w-full text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>{it.q}</button>
          {open === i && <div className="mt-2 text-slate-600">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
