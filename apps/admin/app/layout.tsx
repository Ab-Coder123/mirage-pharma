import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mirage Admin Portal',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
