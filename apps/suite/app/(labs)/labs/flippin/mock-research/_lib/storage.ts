import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { EvidenceObservation } from "./banding";

export type RunRecord = {
  id: string;
  scenarioId?: string;
  title: string;
  condition?: string;
  variantNotes?: string;
  createdAt: string;
  updatedAt: string;
  observations: EvidenceObservation[];
  band?: {
    low: number; median: number; high: number;
    confidence: "A" | "B" | "C";
    rationale: string[];
    computedAt: string;
  };
};

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, ".labs-data", "flippin", "mock-research");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function runPath(id: string) {
  return path.join(DATA_DIR, `${id}.json`);
}

export async function createRun(input: { title: string; scenarioId?: string; condition?: string; variantNotes?: string; }) {
  await ensureDir();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const run: RunRecord = {
    id,
    scenarioId: input.scenarioId,
    title: input.title,
    condition: input.condition,
    variantNotes: input.variantNotes,
    createdAt: now,
    updatedAt: now,
    observations: [],
  };

  await fs.writeFile(runPath(id), JSON.stringify(run, null, 2), "utf8");
  return run;
}

export async function getRun(id: string): Promise<RunRecord | null> {
  try {
    const raw = await fs.readFile(runPath(id), "utf8");
    return JSON.parse(raw) as RunRecord;
  } catch {
    return null;
  }
}

export async function listRuns(): Promise<RunRecord[]> {
  await ensureDir();
  const files = await fs.readdir(DATA_DIR);
  const runs: RunRecord[] = [];

  for (const f of files) {
    if (!f.endsWith(".json")) continue;
    const raw = await fs.readFile(path.join(DATA_DIR, f), "utf8");
    runs.push(JSON.parse(raw));
  }

  runs.sort((a,b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return runs;
}

export async function saveRun(run: RunRecord) {
  run.updatedAt = new Date().toISOString();
  await fs.writeFile(runPath(run.id), JSON.stringify(run, null, 2), "utf8");
  return run;
}

export async function addObservation(runId: string, obs: Omit<EvidenceObservation,"id"|"capturedAt">) {
  const run = await getRun(runId);
  if (!run) throw new Error("Run not found");

  const full: EvidenceObservation = {
    id: crypto.randomUUID(),
    capturedAt: new Date().toISOString(),
    ...obs,
  };

  run.observations.push(full);
  await saveRun(run);
  return run;
}
