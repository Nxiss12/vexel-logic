import fs from 'fs';
import path from 'path';
import { rewriteHtmlLinks, getAllToolSlugs } from '../../../lib/rewriteHtmlLinks';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllToolSlugs();
  return slugs.map((s) => ({ slug: s }));
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const underscored = slug.replace(/-/g, '_');

  const candidates = [
    path.join(process.cwd(), 'PRODUCT', 'tools', `${underscored}.html`),
    path.join(process.cwd(), 'PRODUCT', 'tools', 'marketing_tools', `${underscored}.html`)
  ];

  let file: string | undefined;
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      file = c;
      break;
    }
  }

  if (!file) return notFound();

  const raw = fs.readFileSync(file, 'utf8');
  const html = rewriteHtmlLinks(raw);

  return (
    <div className="container mx-auto py-12 px-6">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
