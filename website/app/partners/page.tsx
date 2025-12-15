import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.join(process.cwd(), '..', '..', 'partners.html'), 'utf8');

export default function Partners() {
  return (
    <div className="container mx-auto py-16 px-6">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
