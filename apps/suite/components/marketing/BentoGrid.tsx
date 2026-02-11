"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import Link from "next/link";

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project, idx) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 p-4 hover:border-andysd-primary-soft hover:bg-slate-900/80"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-[0.7rem] text-slate-400">
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em]">
                  {project.pillar}
                </span>
                <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[0.6rem] text-slate-300">
                  {project.status}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-slate-50">{project.title}</h2>
              <p className="text-xs text-slate-300 line-clamp-2">{project.description}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-andysd-primary/30 to-andysd-accent-hot/40 text-andysd-primary-soft shadow-lg shadow-cyan-500/40">
              <project.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.65rem] text-slate-400">
            <div className="flex flex-wrap gap-1">
              {project.roadmap.slice(0, 2).map((item) => (
                <span
                  key={item.phase}
                  className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.6rem] text-slate-400"
                >
                  {item.phase}: {item.task}
                </span>
              ))}
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="rounded-full border border-slate-700 bg-slate-950/80 px-2 py-0.5 text-[0.65rem] text-andysd-primary-soft hover:border-andysd-primary hover:text-andysd-primary"
            >
              Open brief
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
