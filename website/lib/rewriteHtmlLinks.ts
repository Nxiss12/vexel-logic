import path from 'path';

const explicitMap: Record<string, string> = {
  'index': '/',
  'growth-engine': '/products/growth-engine',
  'admin-assassin': '/products/admin-assassin',
  'reputation-defender': '/products/reputation-defender',
  'tradesmen': '/industries/tradesmen-services',
  'privacy-policy': '/legal/privacy',
  'terms-of-service': '/legal/terms'
};

export function rewriteHtmlLinks(html: string) {
  return html.replace(/(href|src)=["']([^"']+?\.html)["']/g, (m, attr, url) => {
    const parts = url.split('/');
    const file = parts.pop() || url;
    const base = file.replace(/\.html$/, '');

    if (explicitMap[base]) return `${attr}="${explicitMap[base]}"`;

    // If link points to a product/industry, try to normalize a few known names
    if (base === 'growth-engine' || base === 'admin-assassin' || base === 'reputation-defender') {
      return `${attr}="/products/${base}"`;
    }

    if (base === 'tradesmen') return `${attr}="/industries/tradesmen-services"`;

    // Fallback: map any other HTML filename to /tools/<slug>
    const slug = base.replace(/_/g, '-');
    return `${attr}="/tools/${slug}"`;
  });
}

export function getAllToolSlugs(): string[] {
  // Returns slugs from PRODUCT/tools and PRODUCT/tools/marketing_tools
  // This is intentionally synchronous and simple because we only use it at build-time.
  try {
    // Import fs lazily to avoid bundling issues in the browser
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs');
    const base = path.join(process.cwd(), 'PRODUCT', 'tools');
    const files: string[] = [];
    if (fs.existsSync(base)) {
      fs.readdirSync(base).forEach((f: string) => {
        if (f.endsWith('.html')) files.push(f.replace(/\.html$/, '').replace(/_/g, '-'));
      });
    }
    const marketing = path.join(base, 'marketing_tools');
    if (fs.existsSync(marketing)) {
      fs.readdirSync(marketing).forEach((f: string) => {
        if (f.endsWith('.html')) files.push(f.replace(/\.html$/, '').replace(/_/g, '-'));
      });
    }
    return Array.from(new Set(files)).sort();
  } catch (err) {
    return [];
  }
}
