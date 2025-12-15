export default function FeatureGrid({ items }: { items: { title: string; body?: string; bullets?: string[] }[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((it, i) => (
        <div key={i} className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-bold mb-2">{it.title}</h3>
          {it.body && <p className="text-slate-600 mb-2">{it.body}</p>}
          {it.bullets && (
            <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">{it.bullets.map((b, idx) => <li key={idx}>{b}</li>)}</ul>
          )}
        </div>
      ))}
    </div>
  );
}
