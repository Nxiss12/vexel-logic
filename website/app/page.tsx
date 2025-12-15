import Link from 'next/link';
import dynamic from 'next/dynamic';
import TrustStrip from '../components/TrustStrip';
import TestimonialGrid from '../components/TestimonialGrid';

export default function Home() {
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vexel Logic",
    "applicationCategory": "BusinessApplication",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "127" },
    "offers": { "@type": "AggregateOffer", "lowPrice": "249", "highPrice": "697", "priceCurrency": "GBP" },
    "description": "Recover lost revenue from missed calls (64% recovery rate), automate reviews, and eliminate 20+ hours/week of manual admin. 48-hour setup.",
    "featureList": ["Missed Call Recovery (64% conversion rate)", "Automated Review Collection", "Unified Inbox Management", "AI Receptionist", "150+ Automation Tools", "24/7 UK-Based Support", "GDPR Compliant", "30-Day Money-Back Guarantee"]
  };
  return (
    <div className="container mx-auto py-24 px-6">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4">Business automation that stops money leaking</h1>
        <p className="text-lg text-slate-600 mb-6">Recover lost revenue from missed calls, automate reviews, and take back 20+ hours/week. 48-hour setup.</p>
        <div className="flex items-center justify-center gap-4">
          <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo'} className="px-6 py-3 bg-brand rounded-2xl text-white font-semibold">Book Demo</a>
          <Link href="/pricing" className="px-6 py-3 border rounded-2xl">View Pricing</Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Toolkits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products/growth-engine" className="block p-6 border rounded-2xl hover:shadow-lg transition">Growth Engine</Link>
          <Link href="/products/admin-assassin" className="block p-6 border rounded-2xl hover:shadow-lg transition">Admin Assassin</Link>
          <Link href="/products/reputation-defender" className="block p-6 border rounded-2xl hover:shadow-lg transition">Reputation Defender</Link>
        </div>
      </section>
      <FindMySolution />

      <TrustStrip items={[
        { title: '64% Recovery Rate', subtitle: 'Typical missed-call recovery' },
        { title: '48-hour Setup', subtitle: 'Most clients are live within 48 hours' },
        { title: '30-day Guarantee', subtitle: 'Money-back guarantee' }
      ]} />

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Proof</h2>
        <script type="application/ld+json">{JSON.stringify(softwareLd)}</script>
        <TestimonialGrid items={[
          { quote: 'We booked 64% of missed calls into paying jobs and recovered £3,200/month.', author: 'David Davies, Davies Plumbing' },
          { quote: 'The Admin Assassin saved me 12 hours per week.', author: 'Sarah, Sarah\'s HVAC' },
          { quote: 'We went from 3.8 to 4.9 stars—new patients choose us because of the reviews.', author: 'Dr. Sarah Campbell, Bright Smile Dental' }
        ]} />
      </section>
    </div>
  );
}
const FindMySolution = dynamic(() => import('../components/FindMySolution'), { ssr: false });

export const metadata = {
  title: 'Vexel Logic — Business automation for UK SMEs',
  description: 'Recover lost revenue from missed calls, automate reviews, and eliminate admin. 48-hour setup.'
};
