"use client";

import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";

type ProjectVaultProps = {
  slug: string;
};

export function ProjectVault({ slug }: ProjectVaultProps) {
  const project = getProject(slug);
  if (!project) return notFound();

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[0.7rem] text-slate-400">
            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em]">
              {project.pillar}
            </span>
            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[0.6rem] text-slate-300">
              {project.status}
            </span>
          </div>
          <h1 className="text-lg font-semibold text-slate-50">{project.title}</h1>
          <p className="text-xs text-slate-300">{project.description}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-andysd-primary/40 to-andysd-accent-hot/50 text-andysd-primary-soft shadow-lg shadow-cyan-500/50">
          <project.icon className="h-5 w-5" />
        </div>
      </header>
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Vision
        </h2>
        <p className="text-xs text-slate-300">{project.vision}</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Roadmap
        </h2>
        <ul className="space-y-1 text-xs text-slate-300">
          {project.roadmap.map((item) => (
            <li key={item.phase} className="flex items-center gap-2">
              <span
                className={
                  "inline-flex h-4 w-4 items-center justify-center rounded-full border text-[0.55rem] " +
                  (item.done
                    ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-600 bg-slate-900/80 text-slate-400")
                }
              >
                {item.done ? "âœ“" : "â€¢"}
              </span>
              <span className="text-slate-400">{item.phase}</span>
              <span className="text-slate-300">{item.task}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Blueprint
        </h2>
        <p className="text-[0.7rem] text-slate-400">
          Master spec: <span className="text-andysd-primary-soft">{project.blueprintPath}</span>
        </p>
      </section>
    </div>
  );
}
