import type { ReactNode } from "react";

export default function GigosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="flex items-center justify-between px-6 py-4 border-b border-lime-400/25 bg-gradient-to-r from-zinc-950 via-zinc-950 to-zinc-900/80 backdrop-blur">
        <div>
          <div className="text-xs font-semibold tracking-[0.24em] uppercase text-lime-300/80">
            GigOS
          </div>
          <p className="text-[11px] text-zinc-400">
            One run: worth-it score, route, proof, payouts.
          </p>
        </div>
        <div className="flex gap-2 text-[11px] text-zinc-400">
          <span className="rounded-full border border-zinc-700 px-2 py-1">
            Today · <span className="font-mono">0 gigs</span>
          </span>
        </div>
      </header>
      <main className="px-6 py-6">
        {children}
      </main>
    </div>
  );
}

