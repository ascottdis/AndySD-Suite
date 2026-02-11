export type ScenarioTemplate = {
  id: string;
  title: string;
  defaultCondition?: string;
  variantPrompts?: string[];
  categoryHint?: string;
};

export const SCENARIOS: ScenarioTemplate[] = [
  { id: "1", title: "AirPods Pro (unknown gen) + case", defaultCondition: "Used", variantPrompts: ["Gen (1/2)?", "Lightning vs USB-C?", "Any issues?"], categoryHint: "Electronics" },
  { id: "2", title: "Nintendo Switch OLED complete", defaultCondition: "Used", variantPrompts: ["Model", "Joy-Con drift?", "Dock included?"], categoryHint: "Gaming" },
  { id: "3", title: "MacBook Air M1 8/256", defaultCondition: "Used", variantPrompts: ["RAM/SSD", "Cycle count", "Charger included?"], categoryHint: "Computers" },
];

// Add the rest of your 50 here over time.
// This file is intentionally simple so you can iterate fast.
