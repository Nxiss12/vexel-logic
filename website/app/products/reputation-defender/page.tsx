import Link from 'next/link';
import Hero from '../../../components/Hero';
import FeatureGrid from '../../../components/FeatureGrid';
import HowItWorks from '../../../components/HowItWorks';
import CaseStudy from '../../../components/CaseStudy';

export const metadata = { title: 'Reputation Defender — Vexel Logic', description: 'Double your 5-star reviews in 30 days with automated review collection and social media management.' };

export default function ReputationDefender() {
  const features = [
    { title: 'Automated Review Requests', body: 'After every job, automatically text/email customers asking for reviews.' },
    { title: 'Social Media Scheduler', body: 'Post to Facebook, Instagram, and LinkedIn from one place.' },
    { title: 'Google Business Profile Management', body: 'Keep your Google listing updated.' },
    { title: 'Brand Monitoring & Alerts', body: 'Get notified when someone mentions your business online.' }
  ];

  const steps = [
    { title: 'You Complete A Job', body: 'Customer is happy with your work.' },
    { title: 'We Auto-Request A Review', body: 'They get a quick text with a one-click link to leave a review.' },
    { title: 'Your Rating Climbs', body: 'New customers see your reviews and call you instead of competitors.' }
  ];

  const caseStudy = { title: 'Bright Smile Dental - Manchester', subtitle: 'From 3.8 to 4.9 Stars in 8 Weeks', quote: 'In 8 weeks we went from 3.8 to 4.9 stars with 152 reviews; customers choose us because of the reviews.', author: 'Dr. Sarah Campbell', stats: [{ value: '4.9★', label: 'New Rating' }, { value: '3x', label: 'More Reviews' }, { value: '8wks', label: 'Time To Transform' }] };

  return (
    <div>
      <Hero eyebrow="Reputation & Brand Management" title={'Dominate Your Local Search'} subtitle={'Double your 5-star Google reviews in 30 days. Automated review collection + social media management.'} ctas={[{ label: 'Book Demo', href: process.env.NEXT_PUBLIC_BOOK_DEMO_URL || 'https://calendly.com/ben-vexellogic/demo' }, { label: 'Contact Sales', variant: 'outline', href: '/contact' }]} />
      <section className="container mx-auto py-6 px-6">
        <h2 className="text-2xl font-bold mb-4">What's included</h2>
        <FeatureGrid items={features} />
      </section>
      <HowItWorks steps={steps} />
      <CaseStudy {...caseStudy} />
    </div>
  );
}
