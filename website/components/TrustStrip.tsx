export default function TrustStrip({ items }: { items: { title: string; subtitle?: string }[] }) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {items.map((it, idx) => (
          <div key={idx} className="text-center p-4">
            <div className="text-lg font-bold">{it.title}</div>
            {it.subtitle && <div className="text-sm text-slate-500">{it.subtitle}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
