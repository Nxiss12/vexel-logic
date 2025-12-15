import Button from './Button';

export default function Hero({ eyebrow, title, subtitle, ctas }: any) {
  return (
    <section className="py-24">
      <div className="container mx-auto text-center">
        {eyebrow && <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-sm font-bold mb-4">{eyebrow}</div>}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
        <p className="text-lg text-slate-600 mb-6">{subtitle}</p>
        <div className="flex items-center justify-center gap-4">
          {ctas?.map((c: any, i: number) => {
            const { onClick, ...rest } = c;
            return <Button key={i} {...rest} className={c.className}>{c.label}</Button>;
          })}
        </div>
      </div>
    </section>
  );
}
