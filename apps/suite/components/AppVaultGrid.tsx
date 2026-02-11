'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import type { AppProject } from '@/lib/projects';

interface AppVaultGridProps {
  projects: AppProject[];
}

export default function AppVaultGrid({ projects }: AppVaultGridProps) {
  const sorted = [...projects].sort((a, b) => a.priorityRank - b.priorityRank);

  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {sorted.map((project) => (
        <m.div
          key={project.slug}
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <Link
            href={`/work/${project.slug}`}
            className="block group bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 hover:border-slate-700 hover:bg-slate-900/70 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-100">{project.name}</h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  project.phase === 'mvp'
                    ? 'bg-emerald-900/40 border-emerald-800/60 text-emerald-300'
                    : project.phase === 'spec'
                      ? 'bg-amber-900/40 border-amber-800/60 text-amber-300'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                }`}
              >
                {project.phase.toUpperCase()}
              </span>
            </div>

            <p className="text-slate-400 mb-6 leading-relaxed">{project.oneLiner}</p>
            <p className="text-sm text-slate-500 italic mb-6">"{project.vibe}"</p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-black opacity-20">#{project.priorityRank}</span>
              <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                Briefing →
              </span>
            </div>
          </Link>
        </m.div>
      ))}
    </m.div>
  );
}
