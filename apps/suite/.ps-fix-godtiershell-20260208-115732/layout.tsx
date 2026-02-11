import "./globals.css";

import type { ReactNode } from "react";

export const metadata = {
  title: "AndySD Studio Suite",
  description: "A portfolio of intelligent, purpose-built tools.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black text-slate-100">
      <body className="min-h-screen antialiased" className="gt-body antialiased">
        <GodTierShell>{children}</GodTierShell>
      </body>
    </html>
  );
}



