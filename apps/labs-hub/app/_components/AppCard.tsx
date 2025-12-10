import type { PortfolioApp } from "../data/apps";

export default function AppCard({
  app,
  onOpen,
}: {
  app: PortfolioApp;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(app.id)}
      className={[
        "app-card w-full text-left p-6 border-2 shadow-lg bg-gradient-to-br",
        app.gradient,
        app.fxClass,
        app.borderClass,
      ].join(" ")}
    >
      <div className="relative z-10">
        <div className={[app.titleClass, "text-3xl font-extrabold mb-1 leading-tight"].join(" ")}>
          {app.title}
        </div>
        <p className={[app.subClass, "text-sm font-semibold uppercase tracking-wider"].join(" ")}>
          {app.subtitle}
        </p>

        {app.aliases?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {app.aliases.map((a) => (
              <span
                key={a}
                className="text-[11px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200"
              >
                {a}
              </span>
            ))}
          </div>
        ) : null}

        <ul className="mt-4 space-y-2 text-sm text-gray-200/90">
          {app.features.slice(0, 3).map((f) => (
            <li key={f} className="flex gap-2 items-start">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300/80" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] font-mono text-gray-400">{app.status ?? "Concept"}</span>
          <span className="text-xs font-mono px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10">
            Open →
          </span>
        </div>
      </div>
    </button>
  );
}
