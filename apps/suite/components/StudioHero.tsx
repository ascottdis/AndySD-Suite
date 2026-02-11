'use client';

import { useMemo, useState } from 'react';
import { m } from 'framer-motion';
import type { AppProject, PillarId } from '@/lib/projects';

interface StudioHeroProps {
  projects: AppProject[];
  pillars: Record<PillarId, { name: string; color: string; oneLiner: string }>;
}

export default function StudioHero({ projects, pillars }: StudioHeroProps) {
  const [activePillar, setActivePillar] = useState<PillarId>('studio');

  const activeMeta = pillars[activePillar];

  const pillarProjects = useMemo(() => {
    return projects
      .filter((p) => p.pillar === activePillar)
      .sort((a, b) => a.priorityRank - b.priorityRank)
      .slice(0, 3);
  }, [projects, activePillar]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
      {/* Left */}
      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
            AndySD Studio
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
            Mission control for the AndySD universe: GigOS, FlipOS, ArtPeriod, Aperture, Transit Hub.
          </p>
        </div>

        <div className="flex gap-3">
          <m.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/work"
            className="inline-flex items-center px-7 py-4 bg-slate-900/60 border border-slate-700 hover:border-slate-600 rounded-xl text-base md:text-lg font-medium backdrop-blur-sm hover:bg-slate-800/60 transition-colors"
          >
            View Work →
          </m.a>

          <m.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/work/suite"
            className="inline-flex items-center px-7 py-4 bg-slate-950/40 border border-slate-800 hover:border-slate-700 rounded-xl text-base md:text-lg font-medium backdrop-blur-sm hover:bg-slate-900/40 transition-colors"
          >
            Studio Brief →
          </m.a>
        </div>

        <div className="text-sm text-slate-500">
          Tip: click a pillar to shift the “operating mode” of the suite.
        </div>
      </m.div>

      {/* Right */}
      <m.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className={`bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-800/60 p-8 flex flex-col pillar-${activeMeta.color}`}
      >
        {/* Pillar pills */}
        <div className="flex flex-wrap gap-2 mb-7">
          {(Object.keys(pillars) as PillarId[]).map((id) => {
            const pillar = pillars[id];
            const active = activePillar === id;

            return (
              <m.button
                key={id}
                onClick={() => setActivePillar(id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium border transition-colors
                  pillar-${pillar.color}
                  ${active
                    ? 'border-[hsl(var(--accent)/0.85)] bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))]'
                    : 'border-slate-700/70 hover:border-slate-600 text-slate-400 hover:text-slate-200'
                  }
                `}
              >
                {pillar.name}
              </m.button>
            );
          })}
        </div>

        {/* Active pillar info */}
        <m.div
          key={activePillar}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 space-y-5"
        >
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-slate-100">{activeMeta.name}</h3>
            <p className="text-lg text-slate-300 leading-relaxed">{activeMeta.oneLiner}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs font-semibold border border-slate-700/60">
              Mode: {activePillar.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs font-semibold border border-slate-700/60">
              Top apps: {pillarProjects.length}
            </span>
          </div>

          <div className="space-y-2">
            {pillarProjects.map((p) => (
              <a
                key={p.slug}
                href={`/work/${p.slug}`}
                className="block rounded-xl border border-slate-800/60 bg-slate-950/30 hover:bg-slate-900/40 hover:border-slate-700/70 transition-colors px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-100">{p.name}</div>
                  <div className="text-xs text-slate-400">{p.phase.toUpperCase()}</div>
                </div>
                <div className="text-sm text-slate-400 mt-1">{p.oneLiner}</div>
              </a>
            ))}
          </div>
        </m.div>
      </m.div>
    </div>
  );
}
