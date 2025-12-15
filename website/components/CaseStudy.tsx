export default function CaseStudy({ title, subtitle, quote, author, stats }: any) {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto p-6 rounded-lg bg-white border">
        <div className="mb-4">
          <div className="text-sm text-slate-500">{subtitle}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <blockquote className="italic text-slate-700 mb-4">"{quote}"</blockquote>
        <div className="font-semibold">— {author}</div>
        {stats && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            {stats.map((s: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-brand">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
