import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur z-40 border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Vexel Logic" className="w-8 h-8" />
          <span className="font-bold">Vexel Logic</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/products">Products</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQ</Link>
          <a href={process.env.NEXT_PUBLIC_BOOK_DEMO_URL || '#'} className="px-4 py-2 bg-brand text-white rounded-2xl">Book Demo</a>
        </nav>
      </div>
    </header>
  );
}
