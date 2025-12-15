import Link from 'next/link';
import Hero from '../../../components/Hero';
import FeatureGrid from '../../../components/FeatureGrid';
import HowItWorks from '../../../components/HowItWorks';
import CaseStudy from '../../../components/CaseStudy';

export const metadata = { title: 'Admin Assassin — Vexel Logic', description: 'Save 10+ hours per week with automated invoicing, booking, and admin work.' };

export default function AdminAssassin() {
  const features = [
    { title: 'Text-to-Pay Invoicing', body: 'Send invoices via SMS with a payment link. Get paid in minutes.' , bullets: ['Create invoice in 30 seconds','Text it to customer','They pay with card/Apple Pay'] },
    { title: 'Automated Booking & Calendar', body: 'Let customers book themselves. Syncs with Google Calendar.' },
    { title: 'Digital Contracts & E-Signatures', body: 'Send contracts via text/email. They sign on their phone.' },
    { title: 'Time & Expense Tracking', body: 'Track job time and receipts from your phone.' }
  ];

  const steps = [
    { title: 'Finish The Job', body: 'Customer is happy. You finish up and head to the next job.' },
    { title: 'Send Invoice Via Text', body: 'Tap send. Customer gets a Pay Now link.' },
    { title: 'Get Paid Before You Leave', body: 'They tap the link. You get notified. No chasing.' }
  ];

  const caseStudy = { title: "Sarah's HVAC - Reading", subtitle: 'Reclaimed 12 Hours Per Week', quote: "The Admin Assassin saved me 12 hours per week—this isn't software, it's getting my life back.", author: 'Sarah, Owner', stats: [{ value: '12h', label: 'Hours/Week' }, { value: 'Faster', label: 'Payments' }, { value: 'Better', label: 'Work-life balance' }] };

  return (
    <div>
      <Hero eyebrow="Operations & Time Management" title={'Get Your Evenings Back'} subtitle={'Save 10+ hours per week by automating invoicing, booking, contracts, and admin.'} ctas={[{ label: 'Book Demo', href: process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo' }, { label: 'Contact Sales', variant: 'outline', href: '/contact' }]} />
      <section className="container mx-auto py-6 px-6">
        <h2 className="text-2xl font-bold mb-4">What's included</h2>
        <FeatureGrid items={features} />
      </section>
      <HowItWorks steps={steps} />
      <CaseStudy {...caseStudy} />
    </div>
  );
}
