function getGlyph(glyphs: any, slug: string) { switch(slug) { case "flippin": return glyphs.flippin; case "gigos": return glyphs.gigos; case "artperiod": return glyphs.artperiod; case "aperture": return glyphs.aperture; case "studio": return glyphs.studio; case "transit": return glyphs.transit; case "ariadne": return glyphs.ariadne; default: return glyphs.studio; } }`n"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { projects } from "@/lib/projects";
import Link from "next/link";

const baseLayout = {
  center: "studio",
  ring1: ["flippin", "gigos", "artperiod"],
  ring2: ["aperture", "transit", "ariadne"]
};

const terminalGlyphs = {
  flippin: { symbol: "FLIP", color: "#00FF88", priority: 1, subtitle: "Arbitrage OS" },
  gigos: { symbol: "GIG", color: "#00D4AA", priority: 2, subtitle: "Gig Command" },
  artperiod: { symbol: "ART", color: "#AA77FF", priority: 3, subtitle: "Context Engine" },
  aperture: { symbol: "ÃƒÂ¢Ã¢â‚¬â€Ã¢â‚¬Â°", color: "#FF66AA", priority: 4, subtitle: "Presence Realms" },
  studio: { symbol: "STUDIO", color: "#FFAA00", priority: 0, subtitle: "Mission Control" },
  transit: { symbol: "TRANSIT", color: "#00CCFF", priority: 5, subtitle: "Quantum Routes" },
  ariadne: { symbol: "ÃƒÂ¢Ã‹â€ Ã…Â¾", color: "#FF88CC", priority: 6, subtitle: "Life Mapper" }
};

function MatrixRain() {
  const chars = "01ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¢ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¤ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¦ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¨ÃƒÂ£Ã¢â‚¬Å¡Ã‚ÂªÃƒÂ£Ã¢â‚¬Å¡Ã‚Â«ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â­ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¯ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â±ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â³ÃƒÂ£Ã¢â‚¬Å¡Ã‚ÂµÃƒÂ£Ã¢â‚¬Å¡Ã‚Â·ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â¹ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â»ÃƒÂ£Ã¢â‚¬Å¡Ã‚Â½$@#%&";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono"
          style={{ 
            left: `${i * 2.5}%`,
            color: "#00FF88",
            textShadow: "0 0 8px #00FF88"
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {chars.split('').map((c, j) => (
            <div key={j}>{chars[Math.floor(Math.random() * chars.length)]}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function BaseTerminalHero() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative min-h-[160vh] overflow-hidden bg-black">
      {/* Advanced terminal layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-black to-slate-950/80" />
        <MatrixRain />
        
        {/* Animated grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }} />
        
        {/* Scanlines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,255,136,0.03) 0px, transparent 2px, transparent 4px)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Premium title section */}
      <header className="relative z-20 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center relative">
            {/* Holographic glow layers */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, rgba(0,255,136,0.4) 0%, transparent 60%)",
                  "radial-gradient(circle at 50% 50%, rgba(0,212,170,0.4) 0%, transparent 60%)",
                  "radial-gradient(circle at 50% 50%, rgba(170,119,255,0.4) 0%, transparent 60%)"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Floating particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: `rgba(0,255,136,${0.3 + Math.random() * 0.5})`,
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  boxShadow: "0 0 10px rgba(0,255,136,0.8)"
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Main title with multiple layers */}
            <div className="relative">
              {/* Background glow */}
              <motion.h1
                className="text-[clamp(5rem,12vw,13rem)] font-black leading-none mb-2 opacity-30 blur-md absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #00FF88 0%, #00D4AA 50%, #AA77FF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ANDYSD
              </motion.h1>

              {/* Main title */}
              <motion.h1
                className="text-[clamp(5rem,12vw,13rem)] font-black leading-none mb-2 relative"
                style={{
                  background: "linear-gradient(135deg, #00FF88 0%, #00D4AA 30%, #00CCFF 60%, #AA77FF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 40px rgba(0,255,136,0.6)) drop-shadow(0 0 80px rgba(0,212,170,0.4))"
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                ANDYSD
              </motion.h1>

              {/* Animated underline */}
              <motion.div
                className="h-1 mx-auto rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #00FF88 20%, #00D4AA 50%, #AA77FF 80%, transparent 100%)",
                  boxShadow: "0 0 20px rgba(0,255,136,0.8)"
                }}
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>

            {/* Subtitle with glitch effect */}
            <motion.div
              className="mt-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.p
                className="text-2xl md:text-3xl font-mono tracking-widest text-cyan-300"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(0,255,136,0.8), 0 0 40px rgba(0,212,170,0.5)",
                    "0 0 30px rgba(0,212,170,0.9), 0 0 60px rgba(170,119,255,0.6)",
                    "0 0 20px rgba(0,255,136,0.8), 0 0 40px rgba(0,212,170,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                [ SYSTEMS ONLINE ]
              </motion.p>
              
              <motion.p
                className="text-lg mt-3 text-zinc-400 font-mono"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Mission Control for the Gig Economy
              </motion.p>
            </motion.div>

            {/* Holographic corners */}
            {[
              { top: "10%", left: "5%", rotate: 0 },
              { top: "10%", right: "5%", rotate: 90 },
              { bottom: "10%", left: "5%", rotate: 270 },
              { bottom: "10%", right: "5%", rotate: 180 }
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16 border-2 border-cyan-400/40"
                style={{
                  ...pos,
                  borderTopWidth: "2px",
                  borderLeftWidth: "2px",
                  borderBottomWidth: "0",
                  borderRightWidth: "0",
                  transform: `rotate(${pos.rotate}deg)`,
                  boxShadow: "0 0 15px rgba(0,255,136,0.4)"
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.a
                href="#systems"
                className="group relative px-12 py-5 rounded-xl font-bold text-xl text-black overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #00FF88, #00D4AA)",
                  boxShadow: "0 0 40px rgba(0,255,136,0.6)"
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0,255,136,0.9)" }}
              >
                <span className="relative z-10">Initialize Systems</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.a>

              <motion.a
                href="#hire"
                className="px-12 py-5 rounded-xl border-2 border-cyan-400/40 bg-black/40 backdrop-blur font-bold text-xl text-cyan-300 hover:bg-cyan-400/10 transition-all"
                whileHover={{ scale: 1.05, borderColor: "rgba(0,255,136,0.8)" }}
              >
                Hire Architect
              </motion.a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Base terminal (rest of code same) */}
      <main id="systems" className="relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Studio center */}
          <div className="flex justify-center mb-20">
            <motion.div
              layoutId="studio"
              className="w-36 h-36 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
              style={{
                background: "rgba(255,170,0,0.15)",
                border: "2px solid rgba(255,170,0,0.4)",
                boxShadow: "0 0 60px rgba(255,170,0,0.5)"
              }}
              onClick={() => setExpanded("studio")}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-3xl font-black text-yellow-400 mb-1">STUDIO</div>
              <div className="text-xs font-mono uppercase tracking-wider text-yellow-300">Mission Control</div>
            </motion.div>
          </div>

          {/* Ring 1 */}
          <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto mb-20">
            {["flippin", "gigos", "artperiod"].map(slug => {
              const p = projects.find(x => x.slug === slug);
              const g = slug === "flippin" ? terminalGlyphs.flippin : slug === "gigos" ? terminalGlyphs.gigos : slug === "artperiod" ? terminalGlyphs.artperiod : terminalGlyphs.studio;
              if (!p || !g) return null;

              return (
                <motion.div
                  key={slug}
                  layoutId={slug}
                  className="group relative cursor-pointer"
                  onClick={() => setExpanded(slug)}
                  whileHover={{ y: -12 }}
                >
                  <div className="w-32 h-32 rounded-xl flex flex-col items-center justify-center p-4 backdrop-blur transition-all group-hover:shadow-2xl"
                    style={{
                      background: `rgba(${parseInt(g.color.slice(1),16) >> 0}, 0.12)`,
                      border: `2px solid ${g.color}40`,
                      boxShadow: `0 0 40px ${g.color}55`
                    }}
                  >
                    <div className="text-2xl font-black mb-1" style={{ color: g.color }}>
                      {g.symbol}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      {g.subtitle}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Ring 2 */}
          <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
            {["aperture", "transit", "ariadne"].map(slug => {
              const p = projects.find(x => x.slug === slug);
              const g = slug === "flippin" ? terminalGlyphs.flippin : slug === "gigos" ? terminalGlyphs.gigos : slug === "artperiod" ? terminalGlyphs.artperiod : terminalGlyphs.studio;
              if (!p || !g) return null;

              return (
                <motion.div
                  key={slug}
                  layoutId={slug}
                  className="group relative cursor-pointer"
                  onClick={() => setExpanded(slug)}
                  whileHover={{ y: -8 }}
                >
                  <div className="w-28 h-28 rounded-xl flex flex-col items-center justify-center p-3 backdrop-blur transition-all group-hover:shadow-xl"
                    style={{
                      background: `rgba(${parseInt(g.color.slice(1),16) >> 0}, 0.10)`,
                      border: `2px solid ${g.color}30`,
                      boxShadow: `0 0 30px ${g.color}40`
                    }}
                  >
                    <div className="text-xl font-black mb-1" style={{ color: g.color }}>
                      {g.symbol}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      {g.subtitle}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Expanded view (same as before) */}
      <AnimatePresence>
        {expanded && (() => {
          const p = projects.find(x => x.slug === expanded);
          if (!p) return null;
          const g = getGlyph(terminalGlyphs, "p.slug") || terminalGlyphs.studio;

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(null)}
            >
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

              <motion.div
                layoutId={expanded}
                className="relative w-full max-w-4xl rounded-2xl overflow-hidden border-2"
                style={{
                  borderColor: `${g.color}44`,
                  background: "rgba(10,10,10,0.98)",
                  backdropFilter: "blur(40px)",
                  boxShadow: `0 0 100px ${g.color}66`
                }}
              >
                <div className="p-8 border-b border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black"
                      style={{
                        background: `linear-gradient(135deg, ${g.color}, ${g.color.replace('FF','CC')})`,
                        boxShadow: `0 0 30px ${g.color}66`
                      }}
                    >
                      {g.symbol}
                    </div>
                    <div>
                      <h1 className="text-4xl font-black" style={{ color: g.color }}>
                        {p.name}
                      </h1>
                      <p className="text-xl text-zinc-400 mt-1">{g.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="text-center">
                    <Link
                      href={`/work/${p.slug}`}
                      className="inline-block px-12 py-5 rounded-xl font-bold text-lg text-black shadow-2xl hover:shadow-3xl transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${g.color}, ${g.color.replace('FF','CC')})`,
                        boxShadow: `0 0 40px ${g.color}66`
                      }}
                    >
                      System Briefing ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢
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