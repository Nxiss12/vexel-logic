import fs from 'fs';
import path from 'path';
import { rewriteHtmlLinks } from '../../lib/rewriteHtmlLinks';

export default function ToolsIndex() {
  const file = path.join(process.cwd(), 'PRODUCT', 'tools', 'index.html');
  let html = '<h1>Tools</h1><p>No tool index found.</p>';
  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8');
    html = rewriteHtmlLinks(raw);
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
