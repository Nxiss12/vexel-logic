export default function HowItWorks({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">How it works (3 steps)</h2>
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold">{i+1}</div>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-slate-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
