import Link from 'next/link';
import Hero from '../../../components/Hero';
import FeatureGrid from '../../../components/FeatureGrid';
import CaseStudy from '../../../components/CaseStudy';

export const metadata = {
  title: 'Tradesmen & Services — Vexel Logic',
  description: "Barry, stop losing jobs when you're on the tools. Automated missed call recovery, text-to-pay invoicing, and review collection for UK tradesmen."
};

export default function Tradesmen() {
  const features = [
    { title: 'Missing Calls = Lost Jobs', body: "You're on site. Phone rings. Can't answer. Customer moves on to the next plumber.", stat: '64% never call back' },
    { title: "Chasing Invoices on Fridays", body: "It's Friday night. You're calling customers: 'Did you get my invoice?' They say they'll pay 'next week.'", stat: 'Average: 28 days to get paid' },
    { title: 'Competitor Has Better Reviews', body: "You do great work. But your competitor has 4.8 stars. You have 3.6 stars. Guess who gets the call?", stat: "You're losing jobs to ratings" }
  ];

  const caseStudy = {
    title: 'Davies Plumbing',
    subtitle: '£3,200 Recovered In First Month',
    quote: 'We booked 64% of missed calls into paying jobs and recovered £3,200/month.',
    author: 'David Davies, Owner',
    stats: [{ value: '64%', label: 'Recovery Rate' }, { value: '£3.2k', label: 'Extra Revenue/Mo' }, { value: 'Week 1', label: 'Payback' }]
  };

  return (
    <div>
      <Hero
        eyebrow="Built For Tradesmen"
        title={"Barry, Stop Losing £500 Jobs When You're On The Tools"}
        subtitle={"You're up a ladder fixing a boiler. Your phone rings. You miss it. That customer calls the next plumber. You just lost £500."}
        ctas={[{ label: 'Show Me How It Works (Free Demo)', href: process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo' }]}
      />

      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">The 3 Problems Every Tradesman Faces</h2>
        <FeatureGrid items={features} />
      </section>

      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">The Solution: 3 Toolkits Built for Tradesmen</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">The Jobber Kit</h3>
            <p className="mb-2">Never lose another job to a missed call — texts every missed caller in 60 seconds, captures website visitors with live chat, reaches customers on Google Maps.</p>
            <div className="mb-2 font-bold">Real Result: £3,200/mo (Davies Plumbing)</div>
            <Link href="/products/growth-engine" className="text-brand-accent font-bold">Learn More →</Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">The Tradesman's Toolkit</h3>
            <p className="mb-2">Get paid in 2 days, not 2 weeks — send invoices via text (Apple Pay), automated bookings and digital contracts.</p>
            <div className="mb-2 font-bold">Real Result: 12 hours/week saved (Sarah's HVAC)</div>
            <Link href="/products/admin-assassin" className="text-purple-400 font-bold">Learn More →</Link>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-bold mb-2">The Review Booster</h3>
            <p className="mb-2">Automatically asks for reviews after every job, posts to social, and alerts you to bad reviews so you can respond fast.</p>
            <div className="mb-2 font-bold">Real Result: 3.8 → 4.9★ in 8 weeks</div>
            <Link href="/products/reputation-defender" className="text-brand-accent font-bold">Learn More →</Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-6 bg-slate-50/5">
        <h2 className="text-3xl font-bold text-center mb-6">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg">
            <h4 className="font-bold text-xl mb-2">Single Toolkit</h4>
            <div className="text-4xl font-bold">£149<span className="text-sm font-normal">/mo</span></div>
            <div className="text-sm text-muted mt-2">+ £697 setup (we install it for you)</div>
            <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo'} target="_blank" rel="noreferrer" className="inline-block mt-4 py-3 px-6 bg-white/5 rounded-lg">Book Demo →</a>
          </div>

          <div className="p-6 border rounded-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-brand-accent text-brand-dark px-4 py-1 rounded-full text-sm font-bold uppercase">What 80% Choose</span>
            </div>
            <h4 className="font-bold text-xl mb-2">The Full Kit (All 3)</h4>
            <div className="text-5xl font-bold text-brand-accent">£249<span className="text-sm font-normal">/mo</span></div>
            <div className="text-sm text-muted mt-2">+ £697 setup</div>
            <div className="text-sm text-green-400 mt-2 font-bold">SAVE £198/mo (vs buying separately)</div>
            <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo'} target="_blank" rel="noreferrer" className="inline-block mt-4 py-3 px-6 bg-brand-accent rounded-lg text-brand-dark font-bold">Get The Full Kit (Save £198/mo)</a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-lg bg-green-900/20">
            <div className="font-bold">30-Day Money-Back Guarantee</div>
            <div className="text-sm">If you don't recover at least £1,250 in value, full refund. You keep any leads we captured.</div>
          </div>
        </div>
      </section>

      <CaseStudy {...caseStudy} />

      <section className="container mx-auto py-12 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Listen, Barry...</h2>
        <p className="text-xl mb-6">You didn't start a plumbing business to spend Friday nights chasing invoices or Saturday mornings replying to Facebook messages. You started it to fix boilers, make money, and have your weekends back.</p>
        <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-10 py-4 bg-brand-accent text-brand-dark font-bold rounded-lg">Show Me How (Free Demo)</a>
        <p className="text-sm text-muted mt-3">30 minutes. No BS. Just results.</p>
      </section>
    </div>
  );
}
