import "./globals.css";
import CosmicMatrixShell from "./_ui/CosmicMatrixShell";
import type { ReactNode } from "react";

export const metadata = {
  title: "AndySD Studio Suite",
  description: "A portfolio of intelligent, purpose-built tools.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-black text-slate-100">
      <body className="min-h-screen antialiased">
        <CosmicMatrixShell>{children}</CosmicMatrixShell>
      </body>
    </html>
  );
}


