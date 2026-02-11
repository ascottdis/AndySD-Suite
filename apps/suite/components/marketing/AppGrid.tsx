import { projects } from "@/lib/projects";

const statusColors = {
  "LIVE": "bg-emerald-500/20 border-emerald-500/50 text-emerald-400",
  "BETA": "bg-cyan-500/20 border-cyan-500/50 text-cyan-400",
  "ALPHA": "bg-purple-500/20 border-purple-500/50 text-purple-400"
};

export function AppGrid() {
  return (
    <div className="py-24 bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((app) => (
            <div
              key={app.name}
              className="group relative p-8 bg-slate-950/90 border border-slate-900/50 rounded-3xl hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl shadow-2xl shrink-0">
                  {app.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl font-black text-slate-50 mb-2 group-hover:text-emerald-300 transition-all duration-300 leading-tight">
                    {app.name}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    LIVE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1 text-xs font-mono rounded-full border bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                  LIVE
                </span>
                <span className="px-3 py-1 text-xs font-mono bg-slate-800/50 border border-slate-700/50 text-slate-400 rounded-full">
                  Gig Economy
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 rounded-full font-mono">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 rounded-full font-mono">
                  Prisma
                </span>
                <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400 rounded-full font-mono">
                  Tailwind
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}