import Accordion from '../../components/Accordion';

const items = [
  { q: 'How quickly can I get set up?', a: "Most clients are live within 48 hours. Our Foundation Setup (£1,250) includes full configuration, data migration, team training, and testing." },
  { q: 'Can I try before I buy?', a: "Yes! We offer a 30-day money-back guarantee on all plans. You can also book a free demo to see the platform in action." }
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(i => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))
  };
  return (
    <div className="container mx-auto py-16 px-6 max-w-3xl">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion items={items} />
    </div>
  );
}
