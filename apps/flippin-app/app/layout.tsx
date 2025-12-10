import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FlippiN\' Out – Inventory OS for Resellers',
  description: 'Photo → Identify → Price → List → Sell. One clean pipeline for scaling your resale business.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <nav className="border-b border-slate-800 bg-slate-900 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-400">FlippiN' Out</div>
            <div className="flex gap-6 text-sm">
              <a href="/feed" className="hover:text-emerald-400 transition font-semibold">Feed</a>
              <a href="/inventory" className="hover:text-emerald-400 transition">Your Items</a>
              <a href="/intake" className="hover:text-emerald-400 transition">Upload Photo</a>
              <a href="/analytics" className="hover:text-emerald-400 transition">Analytics</a>
              <a href="/settings" className="hover:text-emerald-400 transition">Settings</a>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
