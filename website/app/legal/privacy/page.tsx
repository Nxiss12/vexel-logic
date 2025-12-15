import fs from 'fs';
import path from 'path';

const privacyHtml = fs.readFileSync(path.join(process.cwd(), '..', '..', 'privacy-policy.html'), 'utf8');

export default function Privacy() {
  return (
    <div className="container mx-auto py-16 px-6">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: privacyHtml }} />
    </div>
  );
}
