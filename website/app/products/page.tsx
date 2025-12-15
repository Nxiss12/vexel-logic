import Link from 'next/link';

export default function Products() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Products & Toolkits</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/products/growth-engine" className="block p-6 border rounded-2xl hover:shadow">Growth Engine</Link>
        <Link href="/products/admin-assassin" className="block p-6 border rounded-2xl hover:shadow">Admin Assassin</Link>
        <Link href="/products/reputation-defender" className="block p-6 border rounded-2xl hover:shadow">Reputation Defender</Link>
      </div>
    </div>
  );
}
