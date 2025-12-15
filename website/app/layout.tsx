import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Vexel Logic — Business automation for UK SMEs',
  description: 'Recover lost revenue from missed calls, automate reviews, and eliminate admin. 48-hour setup.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org",
          "@type":"Organization",
          "name":"Vexel Logic",
          "url":"https://vexellogic.com",
          "email":"ben@vexellogic.com",
          "address": { "@type":"PostalAddress", "addressCountry":"GB" },
          "sameAs": ["https://www.linkedin.com/in/benedict-anokye-davies/"]
        }`}</script>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
