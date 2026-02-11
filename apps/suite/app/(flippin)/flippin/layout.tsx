import type { ReactNode } from "react";

export default function FlippinLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.2),_transparent_55%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,1))]" />

      <header className="flex items-center justify-between px-6 py-4 border-b border-cyan-400/25 backdrop-blur">
        <div>
          <div className="text-xs font-semibold tracking-[0.28em] uppercase text-cyan-300/80">
            Flippin
          </div>
          <p className="text-[11px] text-slate-400">
            Photo → comps → net → listing kit.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 px-2 py-1 bg-slate-900/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Pricing engine online
          </span>
        </div>
      </header>

      <main className="px-6 py-6">
        {children}
      </main>
    </div>
  );
}
