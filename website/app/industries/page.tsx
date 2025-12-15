import Link from 'next/link';

export default function Industries() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Industries</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/industries/tradesmen-services" className="block p-6 border rounded-2xl hover:shadow">Tradesmen & Services</Link>
        <Link href="/industries/medical-dental" className="block p-6 border rounded-2xl hover:shadow">Medical & Dental</Link>
        <Link href="/industries/legal-services" className="block p-6 border rounded-2xl hover:shadow">Legal Services</Link>
      </div>
    </div>
  );
}
