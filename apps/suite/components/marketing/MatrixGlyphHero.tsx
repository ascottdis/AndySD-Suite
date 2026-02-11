"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "@/lib/projects";
import Link from "next/link";

const glyphs: Record<string, {
  symbol: string; color: string; gradient: string;
  vision: string; tagline: string;
  features: string[]; ux: string[];
  matrixEffect: string;
}> = {
  flippin: {
    symbol: "[$]", color: "#00FF41", gradient: "from-emerald-600 via-green-400 to-lime-500",
    vision: "AI arbitrage machine", tagline: "Source → Comp → List → Profit",
    features: ["Real-time Terapeak comps", "Multi-platform posting", "Inventory optimizer"],
    ux: ["Warehouse dashboard", "Keyboard-driven", "Batch actions"],
    matrixEffect: "dollar-rain"
  },
  gigos: {
    symbol: "[→]", color: "#10B981", gradient: "from-emerald-600 via-teal-400 to-cyan-500",
    vision: "Gig command center", tagline: "Jobs → Routes → Earnings",
    features: ["Multi-app feed", "Live route optimizer", "Earnings tracker"],
    ux: ["Map-first", "Swipe accept", "Dark mode native"],
    matrixEffect: "route-matrix"
  },
  artperiod: {
    symbol: "[♦]", color: "#8B5CF6", gradient: "from-violet-600 via-purple-400 to-indigo-500",
    vision: "Art context engine", tagline: "Scan → Context → Share",
    features: ["Visual recognition", "Layered annotations", "Gallery export"],
    ux: ["Gesture zoom", "Minimal chrome", "Curated grid"],
    matrixEffect: "gem-shards"
  },
  aperture: {
    symbol: "[◉]", color: "#EC4899", gradient: "from-rose-600 via-pink-400 to-fuchsia-500",
    vision: "Presence realms", tagline: "Realm → Vibe → Visibility",
    features: ["Multi-realm presence", "Mood curation", "Privacy portals"],
    ux: ["Portal navigation", "Contextual moods", "Zero-config"],
    matrixEffect: "iris-pulse"
  },
  studio: {
    symbol: "[⚡]", color: "#F59E0B", gradient: "from-amber-600 via-yellow-400 to-orange-500",
    vision: "Mission control", tagline: "View → Track → Deploy",
    features: ["Pillar dashboard", "Progress tracking", "Feature deployment"],
    ux: ["HUD command center", "Real-time metrics", "God mode"],
    matrixEffect: "energy-grid"
  },
  transit: {
    symbol: "[➤]", color: "#14B8A6", gradient: "from-teal-600 via-cyan-400 to-sky-500",
    vision: "Quantum routes", tagline: "Multi-modal → Optimal path",
    features: ["Live transit", "Route optimizer", "Offline capable"],
    ux: ["Timeline view", "Mode swipe", "Pinch zoom"],
    matrixEffect: "flow-lines"
  },
  ariadne: {
    symbol: "[∞]", color: "#F472B6", gradient: "from-pink-600 via-rose-400 to-purple-500",
    vision: "Life thread mapper", tagline: "Goals → Threads → Shortcuts",
    features: ["Mind map interface", "Branch tracking", "Pattern detection"],
    ux: ["Drag-to-connect", "Timeline branching", "Goal radar"],
    matrixEffect: "thread-web"
  }
};

const fallback = {
  symbol: "[◆]", color: "#F59E0B", gradient: "from-amber-600 via-yellow-400 to-orange-500",
  vision: "System module", tagline: "Active",
  features: ["Feature A", "Feature B", "Feature C"],
  ux: ["Clean UI", "Fast UX", "Responsive"],
  matrixEffect: "grid"
};

export function MatrixGlyphHero() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const positions = [
    { left: "12%", top: "20%" }, { left: "82%", top: "18%" }, { left: "8%", top: "68%" },
    { left: "86%", top: "72%" }, { left: "50%", top: "10%" }, { left: "28%", top: "85%" },
    { left: "70%", top: "58%" }
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-black to-black" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6">
        <motion.h1
          className="text-9xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          AndySD
        </motion.h1>
        <p className="text-xl text-cyan-400/80 font-mono mb-16">
          [ Choose your system ]
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto h-[600px] px-6">
        {projects.slice(0, 7).map((p, i) => {
          const pos = positions[i];
          const g = glyphs[p.slug] || fallback;

          return (
            <motion.button
              key={p.slug}
              className="absolute group"
              style={{ left: pos.left, top: pos.top }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.3 }}
              onClick={() => setExpanded(p.slug)}
            >
              <div
                className="w-24 h-24 rounded-xl flex items-center justify-center text-4xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${g.gradient})`,
                  boxShadow: `0 0 50px ${g.color}77`,
                  border: "1px solid rgba(255,255,255,.2)"
                }}
              >
                <span className="text-black">{g.symbol}</span>
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-sm font-bold whitespace-nowrap" style={{ color: g.color }}>
                  {p.name}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {expanded && (() => {
          const p = projects.find(x => x.slug === expanded);
          if (!p) return null;
          const g = glyphs[p.slug] || fallback;

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
            >
              <div className="absolute inset-0" style={{ 
                background: `radial-gradient(circle, ${g.color}33, rgba(0,0,0,.98))`
              }} />

              <motion.div
                className="relative max-w-6xl w-full rounded-3xl border-2 overflow-hidden"
                style={{
                  borderColor: `${g.color}44`,
                  background: "rgba(15,15,15,0.95)",
                  backdropFilter: "blur(50px)",
                  boxShadow: `0 0 120px ${g.color}88`
                }}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
              >
                <div className="p-10 border-b border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl font-black" style={{ color: g.color }}>
                      {g.symbol}
                    </div>
                    <div>
                      <h1 className="text-5xl font-black mb-2" style={{ color: g.color }}>
                        {p.name}
                      </h1>
                      <p className="text-xl text-zinc-400">{g.vision}</p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 p-10">
                  <div>
                    <h3 className="text-cyan-400 font-mono text-sm uppercase mb-4">Vision</h3>
                    <p className="text-lg text-zinc-300">{g.tagline}</p>
                  </div>

                  <div>
                    <h3 className="text-emerald-400 font-mono text-sm uppercase mb-4">Features</h3>
                    <ul className="space-y-2">
                      {g.features.map((f, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex gap-2">
                          <span className="text-emerald-400">▸</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-purple-400 font-mono text-sm uppercase mb-4">UX DNA</h3>
                    <ul className="space-y-2">
                      {g.ux.map((u, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex gap-2">
                          <span className="text-purple-400">◆</span>{u}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-10 border-t border-white/5">
                  <Link
                    href={`/work/${p.slug}`}
                    className="px-8 py-4 rounded-xl font-bold text-black hover:scale-105 transition-all inline-block"
                    style={{
                      background: `linear-gradient(135deg, ${g.color}, ${g.color}CC)`,
                      boxShadow: `0 0 40px ${g.color}66`
                    }}
                  >
                    Enter Portal →
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}