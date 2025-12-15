export default function TestimonialGrid({ items }: { items: { quote: string; author: string; role?: string }[] }) {
  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="p-6 border rounded bg-white">
            <blockquote className="italic text-slate-700">"{t.quote}"</blockquote>
            <div className="mt-4 font-semibold">— {t.author}{t.role ? `, ${t.role}` : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
