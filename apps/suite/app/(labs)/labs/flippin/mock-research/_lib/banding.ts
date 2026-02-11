export type EvidenceSource = "TERAPEAK" | "COMPLETED" | "ACTIVE";

export type EvidenceObservation = {
  id: string;
  source: EvidenceSource;
  query?: string;
  sampleSize?: number;
  soldPrice?: number;    // number only
  shipping?: number;     // number only
  url?: string;
  notes?: string;
  capturedAt: string;
};

export type BandResult = {
  low: number;
  median: number;
  high: number;
  confidence: "A" | "B" | "C";
  rationale: string[];
};

function median(nums: number[]) {
  const a = [...nums].sort((x,y)=>x-y);
  const mid = Math.floor(a.length / 2);
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
}

export function computeBand(observations: EvidenceObservation[]): BandResult | null {
  const sold = observations
    .map(o => (typeof o.soldPrice === "number" ? o.soldPrice + (o.shipping ?? 0) : null))
    .filter((v): v is number => v !== null);

  if (sold.length < 3) {
    return {
      low: 0, median: 0, high: 0,
      confidence: "C",
      rationale: ["Not enough comps yet (need at least 3 sold-price observations)."],
    };
  }

  const a = [...sold].sort((x,y)=>x-y);
  const med = median(a);
  const low = a[Math.floor(a.length * 0.25)];
  const high = a[Math.floor(a.length * 0.75)];

  const spread = (high - low) / Math.max(1, med);
  let confidence: "A" | "B" | "C" = "B";
  if (sold.length >= 8 && spread < 0.25) confidence = "A";
  if (sold.length < 5 || spread > 0.5) confidence = "C";

  const rationale: string[] = [
    `Comps used: ${sold.length}`,
    `Spread proxy: ${(spread * 100).toFixed(0)}%`,
  ];

  return { low, median: med, high, confidence, rationale };
}
