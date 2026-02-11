import Link from "next/link";
import { projects, pillars, type PillarId } from "@/lib/projects";
import AppVaultGrid from "@/components/AppVaultGrid";

type WorkPageProps = {
  searchParams?: { pillar?: string };
};

export default function WorkPage({ searchParams }: WorkPageProps) {
  const pillarParam = (searchParams?.pillar ?? "").toLowerCase();
  const activePillar = (Object.keys(pillars) as PillarId[]).includes(pillarParam as PillarId)
    ? (pillarParam as PillarId)
    : null;

  const filtered = activePillar
    ? projects.filter((p) => p.pillar === activePillar).sort((a, b) => a.priorityRank - b.priorityRank)
    : [...projects].sort((a, b) => a.priorityRank - b.priorityRank);

  const pillarIds = Object.keys(pillars) as PillarId[];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-100">Work</h1>
            <p className="text-slate-400 text-lg">App Vault index. Filter by pillar, then open a briefing.</p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/40 hover:border-slate-700 transition-colors text-slate-200">← Home</Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <Link href="/work" className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${activePillar === null ? "border-slate-600 bg-slate-800/40 text-slate-100" : "border-slate-800 bg-slate-950/30 text-slate-300 hover:text-slate-100 hover:border-slate-700"}`}>All</Link>
          {pillarIds.map((id) => {
            const meta = pillars[id];
            const active = activePillar === id;
            return (<Link key={id} href={`/work?pillar=${id}`} className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors pillar-${meta.color} ${active ? "border-[hsl(var(--accent)/0.85)] bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))]" : "border-slate-800 bg-slate-950/30 text-slate-300 hover:text-slate-100 hover:border-slate-700"}`}>{meta.name}</Link>);
          })}
        </div>

        <div className="mt-10"><AppVaultGrid projects={filtered} /></div>
      </div>
    </div>
  );
}