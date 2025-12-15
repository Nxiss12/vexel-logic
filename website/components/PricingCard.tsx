export default function PricingCard({ title, price, note }: { title: string; price: string; note?: string }) {
  return (
    <div className="p-6 border rounded-2xl text-center">
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="text-3xl font-extrabold my-2">{price}</div>
      {note && <div className="text-sm text-slate-500">{note}</div>}
      <div className="mt-4"> <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL} className="inline-block px-4 py-2 bg-brand text-white rounded-2xl">Book Demo</a></div>
    </div>
  );
}
