"use server";

import { revalidatePath } from "next/cache";
import { createRun, addObservation, getRun, listRuns, saveRun } from "./_lib/storage";
import { computeBand } from "./_lib/banding";

export async function actionCreateRun(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const condition = String(formData.get("condition") ?? "").trim();
  const scenarioId = String(formData.get("scenarioId") ?? "").trim() || undefined;

  if (!title) return { ok: false, message: "Title is required." };

  const run = await createRun({ title, condition: condition || undefined, scenarioId });
  revalidatePath("/labs/flippin/mock-research");
  return { ok: true, runId: run.id };
}

export async function actionAddObservation(runId: string, formData: FormData) {
  const source = String(formData.get("source") ?? "COMPLETED") as any;
  const soldPrice = formData.get("soldPrice");
  const shipping = formData.get("shipping");

  await addObservation(runId, {
    source,
    query: String(formData.get("query") ?? "") || undefined,
    url: String(formData.get("url") ?? "") || undefined,
    notes: String(formData.get("notes") ?? "") || undefined,
    sampleSize: Number(formData.get("sampleSize") ?? "") || undefined,
    soldPrice: soldPrice === null || soldPrice === "" ? undefined : Number(soldPrice),
    shipping: shipping === null || shipping === "" ? undefined : Number(shipping),
  });

  revalidatePath(`/labs/flippin/mock-research/${runId}`);
  return { ok: true };
}

export async function actionComputeBand(runId: string) {
  const run = await getRun(runId);
  if (!run) return { ok: false, message: "Run not found." };

  const band = computeBand(run.observations);
  if (!band) return { ok: false, message: "No band computed." };

  run.band = { ...band, computedAt: new Date().toISOString() };
  await saveRun(run);

  revalidatePath(`/labs/flippin/mock-research/${runId}`);
  return { ok: true };
}

export async function getRunsForPage() {
  return listRuns();
}

export async function getRunForPage(runId: string) {
  return getRun(runId);
}
