"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "@/lib/projects";
import Link from "next/link";

const matrixGlyphs = {
  flippin: { symbol: "⟨$⟩", color: "#00FF88", title: "FLIPOS", subtitle: "AI Arbitrage" },
  gigos: { symbol: "⟨→⟩", color: "#00D4AA", title: "GIGOS", subtitle: "Gig Command" },
  artperiod: { symbol: "⟨♦⟩", color: "#AA77FF", title: "ARTPERIOD", subtitle: "Context Engine" },
  aperture: { symbol: "⟨◉⟩", color: "#FF66AA", title: "APERTURE", subtitle: "Presence Realms" },
  studio: { symbol: "⟨⚡⟩", color: "#FFAA00", title: "STUDIO", subtitle: "Mission Control" },
  transit: { symbol: "⟨➤⟩", color: "#00CCFF", title: "TRANSIT", subtitle: "Quantum Routes" },
  ariadne: { symbol: "⟨∞⟩", color: "#FF88CC", title: "ARIADNE", subtitle: "Life Mapper" }
};

export function MatrixProHero() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const positions = [
    { left: 12, top: 22 }, { left: 84, top: 18 }, { left: 8, top: 68 },
    { left: 88, top: 72 }, { left: 48, top: 12 }, { left: 26, top: 86 },
    { left: 74, top: 56 }
  ];

  return (
    <section className="relative min-h-[140vh] overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900">
      {/* Professional Matrix backdrop */}
      <div className="absolute inset-0">
        <div className="matrix-terminal" />
        <div className="matrix-grid" />
        <div className="matrix-vignette" />
      </div>

      {/* Header */}
      <div className="relative z-20 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            className="text-[clamp(4.5rem,10vw,12rem)] font-black mb-6 leading-none"
            style={{
              background: "linear-gradient(135deg, #00FF88 0%, #00D4AA 50%, #AA77FF 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ANDYSD
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-cyan-300/90 font-mono tracking-wide mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Systems Architecture for the Gig Economy
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="#systems"
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 text-lg"
            >
              View Systems →
            </Link>
            <Link
              href="#hire"
              className="px-10 py-4 border-2 border-white/20 bg-white/5 backdrop-blur hover:bg-white/10 rounded-xl font-bold transition-all duration-300 text-lg"
            >
              Hire Architect
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Glyph constellation */}
      <section id="systems" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 h-[500px] relative">
            {projects.slice(0, 7).map((p, i) => {
              const glyph = matrixGlyphs[p.slug] || matrixGlyphs.flippin;
              const pos = positions[i];

              return (
                <motion.div
                  key={p.slug}
                  className="absolute flex flex-col items-center group cursor-pointer"
                  style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.2 }}
                  layoutId={`glyph-${p.slug}`}
                  onClick={() => setExpanded(p.slug)}
                >
                  {/* Glyph terminal */}
                  <motion.div
                    className="w-20 h-20 rounded-xl flex items-center justify-center mb-3 p-2 backdrop-blur-sm"
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: `0 0 30px ${glyph.color}44`
                    }}
                  >
                    <div
                      className="text-2xl font-mono font-black"
                      style={{ color: glyph.color }}
                    >
                      {glyph.symbol}
                    </div>
                  </motion.div>

                  {/* Label */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    <div className="font-bold text-white text-sm leading-tight" style={{ color: glyph.color }}>
                      {glyph.title}
                    </div>
                    <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
                      {glyph.subtitle}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded system view */}
      <AnimatePresence>
        {expanded && (() => {
          const p = projects.find(x => x.slug === expanded);
          if (!p) return null;
          const glyph = matrixGlyphs[p.slug] || matrixGlyphs.flippin;

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
            >
              {/* System backdrop */}
              <div className="absolute inset-0" style={{ 
                background: `radial-gradient(circle at 50% 30%, ${glyph.color}22 0%, rgba(0,0,0,0.98) 50%)`
              }} />

              <motion.div
                className="relative max-w-5xl w-full rounded-3xl overflow-hidden border-2"
                style={{
                  borderColor: `${glyph.color}55`,
                  background: "rgba(10,10,10,0.95)",
                  backdropFilter: "blur(60px)",
                  boxShadow: `0 0 100px ${glyph.color}77`
                }}
                layoutId={`glyph-${p.slug}`}
                initial={{ scale: 0.3 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.3 }}
              >
                {/* Header bar */}
                <div className="p-8 border-b border-white/10 bg-gradient-to-r from-black/50">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-black" style={{ color: glyph.color }}>
                      {glyph.symbol}
                    </div>
                    <div>
                      <h1 className="text-4xl font-black mb-1" style={{ color: glyph.color }}>
                        {p.name}
                      </h1>
                      <p className="text-lg text-zinc-400">{glyph.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  {/* Left: Vision + Loop */}
                  <div>
                    <h3 className="text-cyan-400 font-mono uppercase text-xs tracking-wider mb-4">
                      Vision
                    </h3>
                    <p className="text-xl mb-6 leading-relaxed text-zinc-200">
                      {p.oneLiner}
                    </p>

                    <h3 className="text-emerald-400 font-mono uppercase text-xs tracking-wider mb-4">
                      Core Loop
                    </h3>
                    <ol className="space-y-2 text-zinc-400 mb-8">
                      <li className="flex gap-2"><span className="text-emerald-400">01.</span> Source inventory</li>
                      <li className="flex gap-2"><span className="text-emerald-400">02.</span> AI optimization</li>
                      <li className="flex gap-2"><span className="text-emerald-400">03.</span> Multi-platform deploy</li>
                    </ol>
                  </div>

                  {/* Right: UX + Features */}
                  <div>
                    <h3 className="text-purple-400 font-mono uppercase text-xs tracking-wider mb-4">
                      UX DNA
                    </h3>
                    <ul className="space-y-2 mb-6 text-zinc-400">
                      <li>• Dashboard-first interface</li>
                      <li>• Keyboard shortcuts everywhere</li>
                      <li>• Zero-modal batch actions</li>
                    </ul>

                    <h3 className="text-orange-400 font-mono uppercase text-xs tracking-wider mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-zinc-400">
                      <li>• Real-time Terapeak integration</li>
                      <li>• 5x marketplace posting</li>
                      <li>• Inventory forecasting</li>
                    </ul>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-8 border-t border-white/5 bg-gradient-to-r from-black/30">
                  <div className="flex gap-4">
                    <Link
                      href={`/work/${p.slug}`}
                      className="px-10 py-4 rounded-xl font-bold text-black shadow-xl hover:shadow-2xl transition-all flex-1 justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${glyph.color}, ${glyph.color.replace('FF', 'CC')})`
                      }}
                    >
                      System Briefing
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}