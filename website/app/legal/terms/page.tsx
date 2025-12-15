import fs from 'fs';
import path from 'path';

const termsHtml = fs.readFileSync(path.join(process.cwd(), '..', '..', 'terms-of-service.html'), 'utf8');

export default function Terms() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: termsHtml }} />
    </div>
  );
}
