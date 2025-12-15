import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email) return NextResponse.json({ ok: false }, { status: 400 });
    const res = NextResponse.json({ ok: true });
    res.headers.append('Set-Cookie', `vexel_session=${encodeURIComponent(body.email)}; Path=/; HttpOnly; SameSite=Lax`);
    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
