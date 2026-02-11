"use client";
import { useEffect, useState } from "react";

export function Hero() {
  const [stats, setStats] = useState({ apps: 0, lines: 0, uptime: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        apps: prev.apps < 7 ? prev.apps + 1 : 7,
        lines: prev.lines < 52000 ? prev.lines + 2600 : 52000,
        uptime: prev.uptime < 99 ? prev.uptime + 1 : 99
      }));
    }, 55);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center galactic-bg starfield overflow-hidden">
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-10 py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-950/80 border border-cyan-400/40 rounded-full mb-8">
            <span className="inline-flex w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[0.65rem] font-mono text-cyan-300 uppercase tracking-[0.25em]">
              ANDYSD // GALACTIC OPS NODE
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[4.4rem] md:text-[5.4rem] leading-[0.9] font-black tracking-tight mb-4">
            <span className="block text-slate-50">AndySD</span>
            <span className="block text-transparent bg-clip-text nebula-text">
              Suite Studio
            </span>
          </h1>

          <p className="text-[1.25rem] text-slate-300/95 font-light mb-10 max-w-3xl leading-relaxed">
            A constellation of AI‑native systems for gig operations, resale markets,
            art intelligence, and social realms — orchestrated from one mission console.
          </p>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-5 mb-14 max-w-2xl">
            <div className="p-5 bg-slate-950/90 border border-cyan-400/40 rounded-xl">
              <div className="text-3xl font-bold text-cyan-300 mb-1">{stats.apps}</div>
              <div className="text-[0.7rem] text-slate-500 uppercase tracking-wide font-mono">
                Active Modules
              </div>
            </div>
            <div className="p-5 bg-slate-950/90 border border-violet-400/40 rounded-xl">
              <div className="text-3xl font-bold text-violet-300 mb-1">
                {stats.lines.toLocaleString()}
              </div>
              <div className="text-[0.7rem] text-slate-500 uppercase tracking-wide font-mono">
                Lines of Code
              </div>
            </div>
            <div className="p-5 bg-slate-950/90 border border-emerald-400/40 rounded-xl">
              <div className="text-3xl font-bold text-emerald-300 mb-1">
                {stats.uptime}%
              </div>
              <div className="text-[0.7rem] text-slate-500 uppercase tracking-wide font-mono">
                System Uptime
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-cyan-400 text-slate-950 font-semibold rounded-md hover:bg-cyan-300 transition-all duration-200 shadow-lg hover:shadow-cyan-400/40 text-sm">
              Open Star Map (Products)
            </button>
            <button className="px-8 py-3 bg-slate-950/90 text-cyan-100 font-semibold rounded-md border border-slate-700 hover:border-cyan-400 transition-all duration-200 text-sm">
              View Mission Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
