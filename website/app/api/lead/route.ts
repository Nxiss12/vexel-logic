import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.hp) return NextResponse.json({ ok: false }, { status: 400 });
    const dataDir = path.join(process.cwd(), '..', '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const file = path.join(dataDir, 'leads.json');
    const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
    existing.push({ ...body, created_at: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(existing, null, 2));
    // TODO: send email via provider if configured
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
