import Link from 'next/link';
import PricingCard from '../../components/PricingCard';

export default function Pricing() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard title="Starter" price="£149" note="+ £697 setup (we install it for you)" />
        <PricingCard title="Full Kit" price="£249" note="+ £697 setup" />
        <PricingCard title="Enterprise" price="£3,200/mo" note="Contact for bespoke pricing" />
      </div>
      <div className="mt-6">
        <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL} className="px-5 py-3 bg-brand text-white rounded-2xl">Book Demo</a>
        <Link href="/contact" className="ml-4 px-5 py-3 border rounded-2xl">Contact</Link>
      </div>
    </div>
  );
}
