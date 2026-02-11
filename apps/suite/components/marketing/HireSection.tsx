"use client";

export function HireSection() {
  return (
    <section className="py-28 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/8 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-8 text-center">
        <div className="inline-block px-4 py-1 bg-slate-950 border border-slate-800 rounded-full mb-5">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Collaboration
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-slate-50 mb-5">
          Design & Build Elite Systems
        </h2>

        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Full‑stack engineer and product thinker. I build AI‑native, cyber‑grade applications that
          run real operations, not just demos.
        </p>

        <div className="flex flex-wrap gap-3 justify-center text-xs text-slate-300 mb-10">
          <span className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg font-mono">
            Next.js · React 18
          </span>
          <span className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg font-mono">
            PostgreSQL · Prisma
          </span>
          <span className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg font-mono">
            Supabase · Edge Functions
          </span>
          <span className="px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-lg font-mono">
            AI · Gemini · OpenAI
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@andysd.com"
            className="px-10 py-4 bg-emerald-400 text-slate-950 font-semibold rounded-lg hover:bg-emerald-300 transition-all duration-200 shadow-lg hover:shadow-emerald-400/40"
          >
            Schedule a Call
          </a>
          <a
            href="https://github.com/yourusername"
            className="px-10 py-4 bg-slate-950/80 backdrop-blur-xl text-slate-100 font-semibold rounded-lg border border-slate-700 hover:border-emerald-400 transition-all duration-200"
          >
            View Codebase
          </a>
        </div>
      </div>
    </section>
  );
}
