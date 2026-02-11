"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pillars, projects } from "@/lib/projects";

type PillarId = keyof typeof pillars;

const themeByPillar: Record<string, { a: string; b: string; glow: string }> = {
  flip: { a: "#22D3EE", b: "#3B82F6", glow: "rgba(34,211,238,.45)" },
  gig: { a: "#34D399", b: "#10B981", glow: "rgba(52,211,153,.45)" },
  art: { a: "#A78BFA", b: "#8B5CF6", glow: "rgba(167,139,250,.45)" },
  aperture: { a: "#FB7185", b: "#EC4899", glow: "rgba(251,113,133,.45)" },
  studio: { a: "#FBBF24", b: "#F59E0B", glow: "rgba(251,191,36,.45)" },
  transit: { a: "#2DD4BF", b: "#14B8A6", glow: "rgba(45,212,191,.45)" },
};

function getTheme(pillar: string) {
  return themeByPillar[pillar] ?? themeByPillar.studio;
}

export function SignatureHero() {
  const [stage, setStage] = useState<"signing" | "ready">("signing");
  const [expanded, setExpanded] = useState<string | null>(null);

  const list = useMemo(() => projects.slice(0, 7), []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Matrix/HUD backdrop */}
      <div className="absolute inset-0 matrix-bg" />
      <div className="absolute inset-0 hud-scanlines" />
      <div className="absolute inset-0 vignette" />

      {/* Signature overlay (click-through) */}
      <AnimatePresence>
        {stage === "signing" && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-[min(900px,92vw)]">
              <div className="absolute -inset-10 signature-glow" />
              <svg viewBox="0 0 900 260" className="w-full">
                <defs>
                  <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="55%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                  <filter id="sigBlur">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* “glow” stroke behind */}
                <motion.path
                  d="M75,170 C110,70 175,60 205,140 C230,205 185,220 165,160
                     C150,115 225,75 285,140 C325,195 275,220 250,160
                     C235,120 305,70 360,125 C430,195 395,220 365,170
                     C340,130 420,85 470,130 C510,165 490,205 450,185
                     C400,155 500,95 560,140 C615,185 600,220 555,190
                     C515,165 585,105 645,130 C710,155 725,220 660,205
                     C610,195 675,105 745,120 C815,135 825,210 765,210"
                  stroke="url(#sigGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#sigBlur)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.55 }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                />

                {/* crisp stroke on top */}
                <motion.path
                  d="M75,170 C110,70 175,60 205,140 C230,205 185,220 165,160
                     C150,115 225,75 285,140 C325,195 275,220 250,160
                     C235,120 305,70 360,125 C430,195 395,220 365,170
                     C340,130 420,85 470,130 C510,165 490,205 450,185
                     C400,155 500,95 560,140 C615,185 600,220 555,190
                     C515,165 585,105 645,130 C710,155 725,220 660,205
                     C610,195 675,105 745,120 C815,135 825,210 765,210"
                  stroke="url(#sigGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                  onAnimationComplete={() => setStage("ready")}
                />
              </svg>

              <motion.div
                className="mt-4 text-center font-mono uppercase tracking-[0.45em] text-[11px] text-cyan-200/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                Suite online • select a module
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb field */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="relative w-[min(1100px,96vw)] h-[min(720px,86vh)]">
          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-center select-none">
            <div className="text-[56px] md:text-[86px] font-black tracking-tight">
              <span className="hud-title">AndySD</span>
            </div>
            <div className="text-zinc-400/80 text-sm md:text-base mt-2">
              Click a module to expand into its theme.
            </div>
          </div>

          {list.map((p, i) => {
            const pillar = pillars[p.pillar as PillarId];
            const t = getTheme(p.pillar);

            // Spread small nodes around center in a deliberate “constellation”
            const positions = [
              { l: "12%", t: "18%" },
              { l: "78%", t: "16%" },
              { l: "10%", t: "70%" },
              { l: "82%", t: "74%" },
              { l: "52%", t: "10%" },
              { l: "26%", t: "84%" },
              { l: "66%", t: "58%" },
            ];

            const pos = positions[i] ?? { l: "50%", t: "50%" };

            return (
              <motion.button
                key={p.slug}
                layoutId={`orb-${p.slug}`}
                onClick={() => setExpanded(p.slug)}
                className="absolute group"
                style={{
                  left: pos.l,
                  top: pos.t,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: stage === "ready" ? 1 : 0, scale: stage === "ready" ? 1 : 0.6 }}
                transition={{ delay: 0.08 * i, type: "spring", stiffness: 240, damping: 24 }}
              >
                <div
                  className="relative w-[62px] h-[62px] rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${t.a} 0%, ${t.b} 55%, rgba(0,0,0,.85) 100%)`,
                    boxShadow: `0 0 28px ${t.glow}, inset 0 0 18px rgba(255,255,255,.22)`,
                    border: "1px solid rgba(255,255,255,.18)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="absolute inset-0 rounded-full orb-noise" />
                  <div className="absolute inset-0 rounded-full orb-ring" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[18px] font-black">
                      {p.name.slice(0, 1)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                  <div className="text-xs font-mono uppercase tracking-wider" style={{ color: t.a }}>
                    {pillar?.name ?? p.pillar}
                  </div>
                  <div className="text-sm font-semibold text-white">{p.name}</div>
                </div>
              </motion.button>
            );
          })}

          {/* Expanded view */}
          <AnimatePresence>
            {expanded && (() => {
              const p = list.find(x => x.slug === expanded);
              if (!p) return null;
              const pillar = pillars[p.pillar as PillarId];
              const t = getTheme(p.pillar);

              return (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-5 md:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(1200px 700px at 50% 35%, ${t.glow} 0%, rgba(0,0,0,.92) 60%, rgba(0,0,0,1) 100%)`,
                    }}
                    onClick={() => setExpanded(null)}
                  />

                  <motion.div
                    layoutId={`orb-${p.slug}`}
                    className="relative w-[min(980px,94vw)] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden"
                    style={{ boxShadow: `0 0 80px ${t.glow}` }}
                  >
                    <div className="absolute inset-0 panel-grid" />
                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full"
                      style={{ background: `radial-gradient(circle, ${t.a}55, transparent 65%)` }}
                    />

                    <div className="relative p-7 md:p-10">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <div className="text-xs font-mono uppercase tracking-[0.35em]" style={{ color: t.a }}>
                            {pillar?.name ?? p.pillar} • {p.phase.toUpperCase()}
                          </div>
                          <h1 className="mt-2 text-4xl md:text-6xl font-black">
                            <span style={{ color: t.a }}>{p.name}</span>
                          </h1>
                          <p className="mt-4 text-zinc-300/90 text-lg md:text-xl">
                            {p.oneLiner}
                          </p>
                          <p className="mt-3 text-zinc-400">
                            {p.vibe}
                          </p>
                        </div>

                        <button
                          onClick={() => setExpanded(null)}
                          className="h-11 w-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                          aria-label="Close"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                          href={`/work/${p.slug}`}
                          className="px-5 py-3 rounded-xl font-bold text-black"
                          style={{ background: t.a, boxShadow: `0 0 26px ${t.glow}` }}
                        >
                          Open briefing →
                        </Link>
                        <div className="px-5 py-3 rounded-xl border border-white/10 bg-black/30 text-zinc-200">
                          Priority #{p.priorityRank}
                        </div>
                        <div className="px-5 py-3 rounded-xl border border-white/10 bg-black/30 text-zinc-200">
                          Theme: {pillar?.oneLiner ?? "Module"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}