import Link from 'next/link';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-6 px-6 flex gap-6">
        <aside className="w-64 sticky top-6 p-4 bg-white rounded-2xl shadow"> 
          <nav className="space-y-2">
            <Link href="/portal/dashboard" className="block">Dashboard</Link>
            <Link href="/portal/account" className="block">Account</Link>
            <Link href="/portal/billing" className="block">Billing</Link>
            <Link href="/portal/support" className="block">Support</Link>
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
