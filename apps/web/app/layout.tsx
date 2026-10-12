import type { Metadata } from 'next';
import { fontJakarta, fontInter, fontSpace } from '@/lib/fonts';
import { GlobalShell } from '@/components/shell/GlobalShell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mirage Pharma — Values-Led, Performance-Driven Life Sciences',
  description:
    'Advancing the frontiers of human health through precision biotechnology, cold-chain assurance, and clinical excellence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased scroll-smooth overflow-x-hidden ${fontJakarta.variable} ${fontInter.variable} ${fontSpace.variable}`}
    >
      <body className="min-h-full bg-[#F8FAFC] text-brand-navy font-sans selection:bg-brand-primary/20 overflow-x-hidden">
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
