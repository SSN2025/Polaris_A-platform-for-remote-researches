import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Polaris — NCPOR Polar Research Outreach Portal',
    template: '%s | Polaris',
  },
  description: 'India\'s polar research archive — searchable, evidence-backed records from Antarctic and Arctic expeditions. Browse, verify, and create outreach content from NCPOR research.',
  keywords: ['NCPOR', 'polar research', 'Antarctic', 'Arctic', 'India', 'science', 'outreach', 'expedition'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
