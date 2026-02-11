import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import { projects, pillars, type AppProject, type PillarId } from "@/lib/projects";

type PageProps = {
  params: { slug: string };
};

function getProject(slug: string): AppProject | undefined {
  return projects.find((p) => p.slug === slug);
}

async function readSpecSafe(specPath: string): Promise<string | null> {
  const repoRoot = path.resolve(process.cwd(), "..", "..");
  const abs = path.resolve(repoRoot, specPath);

  if (!abs.startsWith(repoRoot)) return null;

  try {
    const raw = await fs.readFile(abs, "utf8");
    return raw.slice(0, 3500);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function WorkBriefingPage({ params }: PageProps) {
const { slug } = await params;
const project = getProject(slug);
  if (!project) notFound();

  const pillarMeta = pillars[project.pillar as PillarId];
  const specPreview = await readSpecSafe(project.specPath);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className={`inline-flex flex-col gap-3 pillar-${pillarMeta.color}`}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950/40">
                {pillarMeta.name}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950/40">
                {project.phase.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950/40">
                Priority #{project.priorityRank}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-100">
              {project.name}
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl">
              {project.oneLiner}
            </p>

            <p className="text-slate-500 italic">
              "{project.vibe}"
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/work"
              className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/40 hover:border-slate-700 transition-colors text-slate-200"
            >
              ← Work
            </Link>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/40 hover:border-slate-700 transition-colors text-slate-200"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10">
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/25 p-7">
              <h2 className="text-xl font-bold text-slate-100">Blueprint</h2>
              <p className="text-slate-400 mt-2">
                This page is the briefing view for the full master spec.
              </p>
              <div className="mt-4 text-sm text-slate-400">
                Spec file: <code className="text-slate-200">{project.specPath}</code>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/60 bg-slate-950/25 p-7">
              <h2 className="text-xl font-bold text-slate-100">Spec preview</h2>

              {specPreview ? (
                <pre className="mt-4 max-h-[520px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-200 whitespace-pre-wrap">
{specPreview}
                </pre>
              ) : (
                <p className="mt-4 text-slate-400">
                  Spec file not found yet (or not readable). Create it under the repo root and refresh.
                </p>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className={`rounded-2xl border border-slate-800/60 bg-slate-950/25 p-7 pillar-${pillarMeta.color}`}>
              <h2 className="text-xl font-bold text-slate-100">Operating notes</h2>
              <p className="text-slate-400 mt-2">
                Keep this page tight. The full detail lives in the spec; the briefing stays scannable.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                  <div className="text-xs text-slate-500">Pillar focus</div>
                  <div className="text-sm text-slate-200 mt-1">{pillarMeta.oneLiner}</div>
                </div>

                <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                  <div className="text-xs text-slate-500">Phase</div>
                  <div className="text-sm text-slate-200 mt-1">{project.phase.toUpperCase()}</div>
                </div>

                <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                  <div className="text-xs text-slate-500">Next move</div>
                  <div className="text-sm text-slate-200 mt-1">
                    Open the spec and fill the roadmap + monetization sections.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}