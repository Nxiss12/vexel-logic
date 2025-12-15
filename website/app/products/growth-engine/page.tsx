import Link from 'next/link';
import RecommendedBanner from '../../../components/RecommendedBanner';
import Hero from '../../../components/Hero';
import FeatureGrid from '../../../components/FeatureGrid';
import HowItWorks from '../../../components/HowItWorks';
import CaseStudy from '../../../components/CaseStudy';

export const metadata = {
  title: 'Growth Engine — Vexel Logic',
  description: 'Capture 50% more leads with automated missed call recovery, web chat, and Google Business integration.'
};

export default function Growth() {
  const features = [
    { title: 'Missed Call Text-Back Bot', body: 'Instantly text every missed caller within 60 seconds. 64% convert to bookings.' },
    { title: 'Web Chat Widget', body: 'Catch website visitors before they leave. Live chat turns browsers into bookers.', bullets: ['Pre-qualify leads automatically','Collect contact info','Works 24/7'] },
    { title: 'Google Business Chat', body: 'Reach mobile searchers directly from Google Maps.' },
    { title: 'Lead Scoring & CRM', body: 'Automatically prioritize hot leads.' }
  ];

  const steps = [
    { title: "Someone Can't Reach You", body: "You're on a job, driving, or just busy. A potential customer calls and gets voicemail." },
    { title: 'They Get An Instant Text Back', body: 'Within 60 seconds, our bot texts a helpful message and keeps them engaged.' },
    { title: 'They Book With You', body: 'They reply with their needs and are more likely to book with you.' }
  ];

  const caseStudy = {
    title: 'Davies Plumbing - London',
    subtitle: '£3,200 Recovered In First Month',
    quote: 'We booked 64% of missed calls into paying jobs and recovered £3,200/month.',
    author: 'David Davies, Owner',
    stats: [{ value: '64%', label: 'Recovery Rate' }, { value: '£3.2k', label: 'Extra Revenue/Mo' }, { value: 'Week 1', label: 'Payback' }]
  };

  return (
    <div>
      <RecommendedBanner />
      <Hero eyebrow="Sales & Lead Generation" title={"Turn Strangers Into Paying Customers"} subtitle={"Capture 50% more leads from your existing traffic with automated call recovery, web chat, and Google Business integration."} ctas={[{ label: 'Book Demo', href: process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo' }, { label: 'Contact Sales', variant: 'outline', href: '/contact' }]} />
      <section className="container mx-auto py-6 px-6">
        <h2 className="text-2xl font-bold mb-4">What's included</h2>
        <FeatureGrid items={features} />
      </section>
      <HowItWorks steps={steps} />
      <CaseStudy {...caseStudy} />
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-xl font-bold mb-4">Pricing Preview</h2>
        <div className="flex gap-4">
          <div className="p-6 border rounded">Growth Engine Only — <strong>£149</strong></div>
          <div className="p-6 border rounded">Full Kit — <strong>£249</strong></div>
        </div>
      </section>
    </div>
  );
}
