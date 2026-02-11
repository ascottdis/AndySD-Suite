import type { ReactNode } from "react";
import Link from "next/link";

const MODES = [
  { slug: "flippin", label: "Flippin · Pricing Engine" },
  { slug: "gigos", label: "GigOS · Route Wizard" },
  { slug: "transit", label: "Transit · Corridor Tuner" },
];

export default function LabsLayout({ children }: { children: ReactNode }) {
  const enabled = process.env.LABS_ENABLED === "true";

  if (!enabled) {
    return (
      <div className="mx-auto mt-12 max-w-xl rounded-xl border border-zinc-800 bg-zinc-950/90 p-6 text-sm text-zinc-300">
        <h1 className="mb-2 text-xl font-semibold">Labs disabled</h1>
        <p>Set <code>LABS_ENABLED=true</code> to access internal tools.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <header className="border-b border-slate-800/70 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900/80 px-4 py-3 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-500">
              AndySD Labs
            </div>
            <p className="text-xs text-slate-400">
              Internal research + control room.
            </p>
          </div>
          <nav className="flex flex-wrap gap-2 text-[11px]">
            {MODES.map((m) => (
              <Link
                key={m.slug}
                href={`/labs/${m.slug}`}
                className="rounded-full border border-slate-700/80 px-2 py-1 text-slate-400 hover:border-cyan-400/70 hover:text-cyan-200"
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="px-4 py-6 sm:px-8">{children}</main>
    </div>
  );
}

