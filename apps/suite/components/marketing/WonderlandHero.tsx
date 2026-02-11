"use client";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { projects, pillars } from "@/lib/projects";
import Link from "next/link";

type PillarId = keyof typeof pillars;

// Matrix + Wonderland theme per app
const appIdentities = {
  flippin: {
    color: "#00FF41", // Matrix green
    gradient: "from-emerald-500 via-green-400 to-lime-300",
    matrixChar: "$", // Dollar signs rain
    wonderland: "Down the resale rabbit hole...",
    coreLoop: ["Snap product photo", "AI comps pricing in 3sec", "Push to 5 marketplaces"],
    uxDNA: ["Inventory-first dashboard", "Zero modalsâ€”all inline", "Keyboard shortcuts (Cmd+K)"],
    visual: "Matrix warehouse scanner + falling price tags",
    bgEffect: "price-rain",
    cursor: "scanner-crosshair"
  },
  gig: {
    color: "#10B981",
    gradient: "from-green-500 via-emerald-400 to-teal-300",
    matrixChar: "â†’",
    wonderland: "Follow the white van to gig paradise...",
    coreLoop: ["Real-time job feed", "Auto-route optimization", "Multi-app earnings tracker"],
    uxDNA: ["Map-first view", "Swipe to accept", "Dark mode default"],
    visual: "Neon route lines + glowing waypoints",
    bgEffect: "route-particles",
    cursor: "location-pin"
  },
  art: {
    color: "#A78BFA",
    gradient: "from-purple-500 via-violet-400 to-fuchsia-300",
    matrixChar: "â™¦",
    wonderland: "Through the looking glass of art context...",
    coreLoop: ["Scan artwork", "Context layers reveal", "Share annotated view"],
    uxDNA: ["Gallery grid", "Gesture-driven zoom", "Minimalist chrome"],
    visual: "Kaleidoscope shards + floating frames",
    bgEffect: "art-shards",
    cursor: "magnifying-glass"
  },
  aperture: {
    color: "#EC4899",
    gradient: "from-pink-500 via-rose-400 to-red-300",
    matrixChar: "â—‰",
    wonderland: "Step into the realm where you control your presence...",
    coreLoop: ["Choose your realm", "Curate your vibe", "Control visibility"],
    uxDNA: ["Portal-style navigation", "Mood-based UI", "Privacy-first"],
    visual: "Portal rings + dimensional rifts",
    bgEffect: "portal-ripples",
    cursor: "eye-iris"
  },
  studio: {
    color: "#F59E0B",
    gradient: "from-amber-500 via-yellow-400 to-orange-300",
    matrixChar: "âš¡",
    wonderland: "Mission control for your empire...",
    coreLoop: ["View all pillars", "Track progress", "Deploy features"],
    uxDNA: ["Command center HUD", "Real-time metrics", "God mode toggles"],
    visual: "Holographic displays + command panels",
    bgEffect: "hud-grid",
    cursor: "command-arrow"
  },
  transit: {
    color: "#14B8A6",
    gradient: "from-teal-500 via-cyan-400 to-sky-300",
    matrixChar: "âž¤",
    wonderland: "Ride the quantum transit network...",
    coreLoop: ["Multi-modal planner", "Live transit overlay", "Time-optimal routes"],
    uxDNA: ["Timeline view", "Swipe between modes", "Offline maps"],
    visual: "Neon transit lines + flowing nodes",
    bgEffect: "transit-flow",
    cursor: "train-icon"
  },
  ariadne: {
    color: "#F472B6",
    gradient: "from-pink-400 via-purple-300 to-indigo-300",
    matrixChar: "âˆž",
    wonderland: "Unravel the thread through your labyrinth...",
    coreLoop: ["Map your goals", "Track threads", "Find shortcuts"],
    uxDNA: ["Mind-map interface", "Drag-to-connect", "Branching timelines"],
    visual: "Golden thread maze + glowing nodes",
    bgEffect: "thread-web",
    cursor: "thread-needle"
  }
};

function MatrixRain({ char, color }: { char: string; color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl font-mono"
          style={{ 
            left: `${(i * 3.33)}%`,
            color,
            textShadow: `0 0 10px ${color}`
          }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {char.repeat(10)}
        </motion.div>
      ))}
    </div>
  );
}

export function WonderlandHero() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const orbPositions = [
    { x: 15, y: 25 }, { x: 85, y: 20 }, { x: 10, y: 75 },
    { x: 88, y: 70 }, { x: 50, y: 12 }, { x: 25, y: 88 }, { x: 72, y: 55 }
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Wonderland backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-black to-black" />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
            left: `${cursorPos.x - 192}px`,
            top: `${cursorPos.y - 192}px`,
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Alice quote */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-cyan-300/60 text-sm font-serif italic tracking-wide">
          "Curiouser and curiouser..." â€” Alice
        </p>
      </motion.div>

      {/* Title */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.h1
          className="text-8xl md:text-[12rem] font-black mb-8 wonder-title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          AndySD
        </motion.h1>

        <motion.p
          className="text-xl text-cyan-400/80 font-mono mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          [ Choose your portal ]
        </motion.p>

        {/* Floating orbs */}
        <div className="relative w-full max-w-5xl h-[500px]">
          {projects.slice(0, 7).map((p, i) => {
            const pos = orbPositions[i];
            const identity = appIdentities[p.pillar as keyof typeof appIdentities] || appIdentities.studio;

            return (
              <motion.button
                key={p.slug}
                onClick={() => setExpanded(p.slug)}
                className="absolute group cursor-none"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 180 }}
                whileHover={{ scale: 1.25, rotate: 5 }}
              >
                <div
                  className="relative w-20 h-20 rounded-full wonder-orb"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${identity.color}CC, ${identity.color}66 60%, transparent)`,
                    boxShadow: `0 0 40px ${identity.color}88, inset 0 0 20px ${identity.color}44`,
                    border: `1px solid ${identity.color}44`
                  }}
                >
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: `${identity.color}66` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Inner symbol */}
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-black">
                    {identity.matrixChar}
                  </div>

                  {/* Hover label */}
                  <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-sm font-bold" style={{ color: identity.color }}>
                      {p.name}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expanded wonderland portal */}
      <AnimatePresence>
        {expanded && (() => {
          const p = projects.find(x => x.slug === expanded);
          if (!p) return null;
          const identity = appIdentities[p.pillar as keyof typeof appIdentities] || appIdentities.studio;

          return (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Matrix rain bg */}
              <MatrixRain char={identity.matrixChar} color={identity.color} />

              {/* Wonderland backdrop */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${identity.color}22 0%, black 60%)`,
                }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              />

              {/* Portal card */}
              <motion.div
                className="relative max-w-5xl w-[92vw] rounded-3xl overflow-hidden border"
                style={{
                  borderColor: `${identity.color}44`,
                  background: "rgba(0,0,0,0.85)",
                  backdropFilter: "blur(40px)",
                  boxShadow: `0 0 80px ${identity.color}66`
                }}
                initial={{ scale: 0.5, rotateX: -45 }}
                animate={{ scale: 1, rotateX: 0 }}
                exit={{ scale: 0.5, rotateX: 45 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {/* Close X */}
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-2xl transition-all"
                >
                  âœ•
                </button>

                <div className="p-10 md:p-14">
                  {/* Wonderland quote */}
                  <motion.p
                    className="text-cyan-300/70 text-sm italic mb-6 font-serif"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {identity.wonderland}
                  </motion.p>

                  {/* App header */}
                  <div className="flex items-start gap-6 mb-10">
                    <motion.div
                      className={`text-6xl md:text-8xl font-black bg-gradient-to-r ${identity.gradient} bg-clip-text text-transparent`}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {p.name}
                    </motion.div>
                  </div>

                  {/* Three columns */}
                  <div className="grid md:grid-cols-3 gap-8 mb-10">
                    {/* Core Loop */}
                    <div>
                      <h3 className="text-cyan-400 font-mono uppercase text-xs tracking-wider mb-4">
                        Core Loop
                      </h3>
                      <ul className="space-y-2">
                        {identity.coreLoop.map((step, i) => (
                          <motion.li
                            key={i}
                            className="text-zinc-300 text-sm flex items-start gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <span style={{ color: identity.color }}>â†’</span>
                            {step}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* UX DNA */}
                    <div>
                      <h3 className="text-purple-400 font-mono uppercase text-xs tracking-wider mb-4">
                        UX / UI DNA
                      </h3>
                      <ul className="space-y-2">
                        {identity.uxDNA.map((principle, i) => (
                          <motion.li
                            key={i}
                            className="text-zinc-300 text-sm flex items-start gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          >
                            <span className="text-purple-400">â—†</span>
                            {principle}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Identity */}
                    <div>
                      <h3 className="text-pink-400 font-mono uppercase text-xs tracking-wider mb-4">
                        Visual Identity
                      </h3>
                      <motion.p
                        className="text-zinc-400 text-sm leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {identity.visual}
                      </motion.p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="flex gap-4 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <Link
                      href={`/work/${p.slug}`}
                      className="px-8 py-4 rounded-xl font-bold text-black transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${identity.color}, ${identity.color}CC)`,
                        boxShadow: `0 0 30px ${identity.color}66`
                      }}
                    >
                      Enter {p.name} â†’
                    </Link>
                    <div className="px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-zinc-300">
                      Phase: {p.phase?.toUpperCase()}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}