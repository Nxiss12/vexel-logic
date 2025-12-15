export default function Footer() {
  return (
    <footer className="border-t mt-16 py-8 bg-white">
      <div className="container mx-auto px-6 text-sm text-slate-500">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>© {new Date().getFullYear()} Vexel Logic. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="/legal/privacy">Privacy</a>
            <a href="/legal/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
