1:"$Sreact.fragment"
2:I[8423,["/_next/static/chunks/54a52b3b63aabb5b.js"],""]
7:I[67623,["/_next/static/chunks/c6b9ef2ae5c3f6aa.js","/_next/static/chunks/b0cebcf4577a6dff.js"],"OutletBoundary"]
8:"$Sreact.suspense"
3:Te00,# FlipOS — Master Spec

## 0. Overview

**Pillar:** Flip (Resale / Arbitrage OS)  
**Aliases:** Flip, FlipOS, Flippin’, Flip‑N‑Find, FlipOS Studio.[conversation_history:10]  

**Elevator pitch**  
FlipOS turns casual resellers into AI‑powered retailers by automating sourcing, research, content creation, and cross‑listing in one full‑stack studio.[memory:5][conversation_history:10][conversation_history:26]  

**Core promise**  
- Show me profitable items worth buying today.  
- Tell me where to buy, what price to pay, and how much I should list for.  
- Create elite product content automatically.  
- Cross‑list everywhere and track true profit, not just revenue.[memory:5][conversation_history:26]  

**Primary users**  
- Solo resellers (thrift, retail arbitrage, RA/OA).  
- Side‑hustlers doing part‑time flipping.  
- Power users who already touch multiple marketplaces and want “Bloomberg Terminal for resale.”[conversation_history:10][conversation_history:26]  

**Non‑goals for v1**  
- Full inventory/warehouse management with complex locations.  
- Deep accounting/tax tooling.  
- Marketplace‑specific automation that requires gray‑area TOS violations (botting, auto‑purchasing, etc.).  

---

## 1. Problem & Outcomes

### 1.1 Problem

Retail arbitrage and flipping today is:  
- Fragmented across tools (Keepa, spreadsheets, random notes).  
- Time‑heavy: manual research, manual comps, manual listing content.  
- Error‑prone: fees miscalculated, shipping underestimated, stale comps.  
- Hard to scale: no single view of where your time and capital should go.[memory:5][conversation_history:26]  

### 1.2 Desired outcomes

For a FlipOS user:  
- **Outcome 1 — Clear pipeline:** Always know “what to buy next” with ranked opportunities and confidence.  
- **Outcome 2 — Faster listing:** Go from photos to elite listings in minutes instead of hours.  
- **Outcome 3 — Real profit:** Understand true profit after fees, shipping, and time, not just sales total.  
- **Outcome 4 — Cross‑channel leverage:** Use the same high‑quality data/content everywhere (eBay, Poshmark, etc.).[conversation_history:26]  

---

## 2. Core Workflows (v1)

### 2.1 Sourcing — “What should I buy?”

**Goal:** Turn raw leads (store scans, website URLs, seller lists) into a ranked list of candidates with expected profit.[memory:5][conversation_history:26]  

**Inputs**  
- Manual item entry (title, barcode, URL, or photo).  
- Bulk import (CSV of URLs/ASINs/SKUs).  
- Future: integrated scrapes and partner feeds.[conversation_history:26]  

**System steps (high‑level)**  
1. Normalize product identity (e.g., map barcode/URL to canonical product record).  
2. Pull comps (price history, current listings, solds).  
3. Estimate fees per marketplace and shipping cost bands.  
4. Compute projected profit and ROI given adjustable buy cost.  
5. Output a Sourcing Run with ranked items.[conversation_history:26]  

**User‑visible flow**  
- “New Sourcing Run” → paste URLs/scan items → see a ranked table with:  
  - Item, category, main image.  
  - Buy cost, target list price, expected profit, % ROI.  
  - Confidence score and notes (e.g., “low volume,” “seasonal”).  

### 2.2 Research — “Is this actually good?”

**Goal:** Turn each candidate item into a decision: buy or skip.[memory:5][conversation_history:26]  

**Key actions**  
- View item detail: price history, sold comps, volume, condition notes.  
- Adju0:{"buildId":"LFrRy9C-C-teXRNWcCjx1","rsc":["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen","children":["$","div",null,{"className":"max-w-5xl mx-auto px-6 md:px-12 py-14","children":[["$","div",null,{"className":"flex items-start justify-between gap-6 flex-wrap","children":[["$","div",null,{"className":"inline-flex flex-col gap-3 pillar-flip-blue","children":[["$","div",null,{"className":"flex items-center gap-2 flex-wrap","children":[["$","span",null,{"className":"px-3 py-1 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950/40","children":"Flip"}],["$","span",null,{"className":"px-3 py-1 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950/40","children":"MVP"}],["$","span",null,{"className":"px-3 py-1 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950/40","children":["Priority #",1]}]]}],["$","h1",null,{"className":"text-5xl md:text-6xl font-black tracking-tight text-slate-100","children":"FlipOS"}],["$","p",null,{"className":"text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl","children":"AI sourcing → listings → profit"}],["$","p",null,{"className":"text-slate-500 italic","children":["\"","Bloomberg for resellers","\""]}]]}],["$","div",null,{"className":"flex gap-2","children":[["$","$L2",null,{"href":"/work","className":"px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/40 hover:border-slate-700 transition-colors text-slate-200","children":"← Work"}],["$","$L2",null,{"href":"/","className":"px-4 py-2 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/40 hover:border-slate-700 transition-colors text-slate-200","children":"Home"}]]}]]}],["$","div",null,{"className":"mt-12 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10","children":[["$","section",null,{"className":"space-y-6","children":[["$","div",null,{"className":"rounded-2xl border border-slate-800/60 bg-slate-950/25 p-7","children":[["$","h2",null,{"className":"text-xl font-bold text-slate-100","children":"Blueprint"}],["$","p",null,{"className":"text-slate-400 mt-2","children":"This page is the briefing view for the full master spec."}],["$","div",null,{"className":"mt-4 text-sm text-slate-400","children":["Spec file: ",["$","code",null,{"className":"text-slate-200","children":"docs/FLIPOS_MASTER_SPEC.md"}]]}]]}],["$","div",null,{"className":"rounded-2xl border border-slate-800/60 bg-slate-950/25 p-7","children":[["$","h2",null,{"className":"text-xl font-bold text-slate-100","children":"Spec preview"}],["$","pre",null,{"className":"mt-4 max-h-[520px] overflow-auto rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-200 whitespace-pre-wrap","children":"$3"}]]}]]}],"$L4"]}]]}]}],["$L5"],"$L6"]}],"loading":null,"isPartial":false}
4:["$","aside",null,{"className":"space-y-6","children":["$","div",null,{"className":"rounded-2xl border border-slate-800/60 bg-slate-950/25 p-7 pillar-flip-blue","children":[["$","h2",null,{"className":"text-xl font-bold text-slate-100","children":"Operating notes"}],["$","p",null,{"className":"text-slate-400 mt-2","children":"Keep this page tight. The full detail lives in the spec; the briefing stays scannable."}],["$","div",null,{"className":"mt-5 grid grid-cols-1 gap-3","children":[["$","div",null,{"className":"rounded-xl border border-slate-800/60 bg-slate-950/40 p-4","children":[["$","div",null,{"className":"text-xs text-slate-500","children":"Pillar focus"}],["$","div",null,{"className":"text-sm text-slate-200 mt-1","children":"AI resale OS"}]]}],["$","div",null,{"className":"rounded-xl border border-slate-800/60 bg-slate-950/40 p-4","children":[["$","div",null,{"className":"text-xs text-slate-500","children":"Phase"}],["$","div",null,{"className":"text-sm text-slate-200 mt-1","children":"MVP"}]]}],["$","div",null,{"className":"rounded-xl border border-slate-800/60 bg-slate-950/40 p-4","children":[["$","div",null,{"className":"text-xs text-slate-500","children":"Next move"}],["$","div",null,{"className":"text-sm text-slate-200 mt-1","children":"Open the spec and fill the roadmap + monetization sections."}]]}]]}]]}]}]
5:["$","script","script-0",{"src":"/_next/static/chunks/54a52b3b63aabb5b.js","async":true}]
6:["$","$L7",null,{"children":["$","$8",null,{"name":"Next.MetadataOutlet","children":"$@9"}]}]
9:null
