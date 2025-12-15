import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://vexellogic.com';
  const pages = ['/', '/products/growth-engine', '/products/admin-assassin', '/products/reputation-defender', '/pricing', '/faq', '/contact', '/legal/privacy', '/legal/terms'];
  const urls = pages.map(p => `<url><loc>${base}${p}</loc></url>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
