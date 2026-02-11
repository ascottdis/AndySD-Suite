import type { ReactNode } from "react";

export default function FlippinLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
        <div>
          <h1 className="text-xs font-semibold tracking-[0.35em] text-emerald-300">
            FLIPPIN // INVENTORY OPS
          </h1>
          <p className="mt-1 text-xs text-emerald-100/80">
            Command center for deals, inventory, and listings.
          </p>
        </div>
        <div className="rounded-md border border-emerald-400/40 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-emerald-100/80">
          V1 • SQLITE
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
