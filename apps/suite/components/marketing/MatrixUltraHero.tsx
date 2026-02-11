"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects } from "@/lib/projects";
import Link from "next/link";

const glyphs = {
  flippin: { symbol: "FLIP", color: "#00FF88", subtitle: "Arbitrage OS" },
  gigos: { symbol: "GIG", color: "#00D4AA", subtitle: "Gig Command" },
  artperiod: { symbol: "ART", color: "#AA77FF", subtitle: "Context Engine" },
  aperture: { symbol: "◉", color: "#FF66AA", subtitle: "Presence Realms" },
  studio: { symbol: "STUDIO", color: "#FFAA00", subtitle: "Mission Control" },
  transit: { symbol: "TRANSIT", color: "#00CCFF", subtitle: "Quantum Routes" },
  ariadne: { symbol: "∞", color: "#FF88CC", subtitle: "Life Mapper" }
};

export function MatrixUltraHero() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative min-h-[160vh] bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />

      <header className="relative z-20 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-8xl md:text-[12rem] font-black mb-8"
            style={{
              background: "linear-gradient(135deg, #00FF88, #00D4AA, #AA77FF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(0,255,136,0.5))"
            }}
          >
            ANDYSD
          </motion.h1>

          <h2 className="text-3xl font-mono text-cyan-400 tracking-widest mb-2">
            [ SYSTEMS ONLINE ]
          </h2>
          <p className="text-zinc-500 font-mono">Mission Control for the Gig Economy</p>

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4 bg-black/40 border border-cyan-400/20 px-6 py-3 rounded-lg">
              <span className="text-cyan-400 font-mono">$</span>
              <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-400" 
                  animate={{ x: ["-100%", "100%"] }} 
                  transition={{ duration: 2, repeat: Infinity }} 
                />
              </div>
              <span className="text-zinc-600 font-mono text-xs">andysd-suite@matrix</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-20 max-w-7xl mx-auto px-6 pb-48">
        <div className="flex items-center justify-between mb-16 p-4 bg-black/40 border border-cyan-400/10 rounded-xl">
          <div className="flex gap-6 text-xs font-mono text-cyan-400/60">
            <span>Systems: 7/7</span>
            <span>Status: ONLINE</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="flex justify-center mb-20">
          <motion.div
            className="w-44 h-44 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-6"
            style={{
              background: "rgba(255,170,0,0.1)",
              border: "2px solid rgba(255,170,0,0.3)",
              boxShadow: "0 0 60px rgba(255,170,0,0.3)"
            }}
            onClick={() => setExpanded("studio")}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-3xl font-black text-yellow-400 mb-2">STUDIO</div>
            <div className="text-xs font-mono text-yellow-500/80">Master Node</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto mb-20">
          {["flippin", "gigos", "artperiod"].map(slug => {
            const g = glyphs[slug];
            return (
              <motion.div
                key={slug}
                className="cursor-pointer"
                onClick={() => setExpanded(slug)}
                whileHover={{ y: -12 }}
              >
                <div 
                  className="h-36 rounded-xl flex flex-col items-center justify-center p-6"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: `2px solid ${g.color}30`,
                    boxShadow: `0 0 40px ${g.color}30`
                  }}
                >
                  <div className="text-3xl font-black mb-2" style={{ color: g.color }}>
                    {g.symbol}
                  </div>
                  <div className="text-xs font-mono text-zinc-500">{g.subtitle}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
          {["aperture", "transit", "ariadne"].map(slug => {
            const g = glyphs[slug];
            return (
              <motion.div
                key={slug}
                className="cursor-pointer"
                onClick={() => setExpanded(slug)}
                whileHover={{ y: -8 }}
              >
                <div 
                  className="h-32 rounded-xl flex flex-col items-center justify-center p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div className="text-xl font-black mb-1" style={{ color: g.color }}>
                    {g.symbol}
                  </div>
                  <div className="text-xs font-mono text-zinc-600">{g.subtitle}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <AnimatePresence>
        {expanded && (() => {
          const p = projects.find(x => x.slug === expanded);
          if (!p) return null;
          const g = glyphs[p.slug] || glyphs.studio;

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
            >
              <div className="absolute inset-0 bg-black/98" />

              <div
                className="relative max-w-4xl w-full rounded-2xl border-2 overflow-hidden"
                style={{
                  borderColor: `${g.color}44`,
                  background: "rgba(10,10,10,0.98)",
                  boxShadow: `0 0 100px ${g.color}66`
                }}
              >
                <div className="p-10 border-b border-white/10">
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-black"
                      style={{ background: g.color, color: "black" }}
                    >
                      {g.symbol}
                    </div>
                    <div>
                      <h1 className="text-5xl font-black" style={{ color: g.color }}>
                        {p.name}
                      </h1>
                      <p className="text-xl text-zinc-500 mt-2">{p.oneLiner}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 text-center">
                  <Link
                    href={`/work/${p.slug}`}
                    className="px-12 py-5 rounded-xl font-bold text-xl text-black"
                    style={{ background: g.color }}
                  >
                    System Briefing →
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}