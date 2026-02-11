'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import type { AppProject, PillarId } from '@/lib/projects';

interface PillarsBentoGridProps {
  projects: AppProject[];
  pillars: Record<PillarId, { name: string; color: string; oneLiner: string }>;
}

export default function PillarsBentoGrid({ projects, pillars }: PillarsBentoGridProps) {
  const ids = Object.keys(pillars) as PillarId[];

  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
    >
      {ids.map((id) => {
        const pillar = pillars[id];
        const pillarApps = projects.filter((p) => p.pillar === id).sort((a, b) => a.priorityRank - b.priorityRank);
        const primaryApp = pillarApps[0];

        return (
          <Link key={id} href={`/work?pillar=${id}`} className="block">
            <m.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              className={`pillar-card h-64 rounded-3xl p-8 flex flex-col justify-between pillar-${pillar.color}`}
            >
              <div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  {pillar.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {pillar.oneLiner}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs font-medium border border-slate-700/50">
                    {primaryApp?.phase?.toUpperCase() ?? '—'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {pillarApps.length} apps
                  </span>
                </div>
              </div>

              <div className="text-[hsl(var(--accent))] font-medium text-sm flex items-center gap-2">
                See pillar apps →
              </div>
            </m.div>
          </Link>
        );
      })}
    </m.div>
  );
}
