"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const options = [
  { id: 'growth', label: 'Get more customers (missed calls & marketing)', path: '/products/growth-engine' },
  { id: 'admin', label: 'Reduce admin & automation', path: '/products/admin-assassin' },
  { id: 'reputation', label: 'Improve online reviews', path: '/products/reputation-defender' }
];

export default function FindMySolution() {
  const [choice, setChoice] = useState('');
  const router = useRouter();
  return (
    <div className="mt-12 p-6 border rounded-2xl max-w-md mx-auto">
      <h3 className="font-bold mb-3">Find My Solution</h3>
      <div className="space-y-2">
        {options.map(o => (
          <label key={o.id} className="block">
            <input name="solution" type="radio" value={o.id} checked={choice===o.id} onChange={()=>setChoice(o.id)} />{' '}
            <span className="ml-2">{o.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button disabled={!choice} onClick={()=>{
          const opt = options.find(o=>o.id===choice);
          if (opt) router.push(`${opt.path}?recommended=1`);
        }} className="px-4 py-2 bg-brand text-white rounded-2xl" aria-disabled={!choice}>See recommended</button>
      </div>
    </div>
  );
}
