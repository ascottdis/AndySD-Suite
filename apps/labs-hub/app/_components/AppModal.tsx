import { useEffect } from "react";
import type { PortfolioApp } from "../data/apps";

export default function AppModal({
  app,
  open,
  onClose,
}: {
  app: PortfolioApp | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open || !app) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-auto rounded-3xl border border-cyan-400/30 bg-[#0b0d14]/95 shadow-[0_0_60px_rgba(0,255,249,0.14)] p-6 md:p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xs font-mono px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200"
        >
          Close ✕
        </button>

        <div className="mb-6">
          <div className={["text-4xl md:text-5xl font-extrabold", app.titleClass].join(" ")}>
            {app.title}
          </div>
          <div className={["mt-2 text-lg md:text-xl", app.subClass].join(" ")}>
            {app.subtitle}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {app.status ? (
              <span className="text-[11px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200">
                {app.status}
              </span>
            ) : null}
            {app.aliases?.map((a) => (
              <span
                key={a}
                className="text-[11px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-orbitron text-cyan-300 text-2xl">Concept Summary</h3>
            <div className="text-gray-200/90 leading-relaxed">{app.description}</div>

            <h3 className="font-orbitron text-cyan-300 text-2xl pt-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-200/90 space-y-1">
              {app.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <h3 className="font-orbitron text-cyan-300 text-2xl text-center mb-3">Live Demo Mockup</h3>
            <div className="rounded-xl bg-black/40 border border-white/10 p-4">{app.demo}</div>

            <div className="text-center mt-6">
              <a
                href={app.cta.href}
                className={[
                  "inline-block font-bold py-3 px-8 rounded-full shadow-lg transition text-lg",
                  app.cta.disabled
                    ? "bg-white/10 text-gray-400 border border-white/10 pointer-events-none"
                    : "bg-cyan-400 hover:bg-cyan-300 text-black",
                ].join(" ")}
              >
                {app.cta.text}
              </a>
              {app.cta.disabled ? (
                <div className="text-[11px] font-mono text-gray-500 mt-2">
                  Link disabled (hook to real app later)
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
