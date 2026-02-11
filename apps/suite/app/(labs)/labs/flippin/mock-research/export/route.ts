import { NextResponse } from "next/server";
import { listRuns } from "../_lib/storage";

function csvEscape(v: any) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const runs = await listRuns();

  const header = [
    "runId","title","scenarioId","condition","createdAt","updatedAt",
    "obsCount","confidence","low","median","high"
  ];

  const lines = [header.join(",")];

  for (const r of runs) {
    lines.push([
      r.id, r.title, r.scenarioId ?? "", r.condition ?? "", r.createdAt, r.updatedAt,
      r.observations.length,
      r.band?.confidence ?? "",
      r.band?.low ?? "",
      r.band?.median ?? "",
      r.band?.high ?? ""
    ].map(csvEscape).join(","));
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="flippin-mock-research.csv"',
    },
  });
}
