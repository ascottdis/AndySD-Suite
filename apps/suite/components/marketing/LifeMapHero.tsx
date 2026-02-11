"use client";
import { motion } from "framer-motion";
import { projects, pillars } from "@/lib/projects";
import Link from "next/link";

const MANIFESTO = [
  "These apps are my survival tools.",
  "Forged in the gig economy trenches.",
  "From DoorDash runs to mystery shops.",
  "Each one a scar turned into a compass.",
  "I was lost in the wilderness.",
  "Now I build maps for everyone else.",
  "Tools for the hustlers, creators, resellers.",
  "From my struggle to your strategy."
];

const pillarThemes = {
  flip: { color: "#3B82F6", glow: "rgba(59,130,246,.3)" },
  gig: { color: "#10B981", glow: "rgba(16,185,129,.3)" },
  art: { color: "#8B5CF6", glow: "rgba(139,92,246,.3)" },
  aperture: { color: "#EC4899", glow: "rgba(236,72,153,.3)" },
  studio: { color: "#F59E0B", glow: "rgba(245,158,11,.3)" },
  transit: { color: "#14B8A6", glow: "rgba(20,184,166,.3)" },
  ariadne: { color: "#F472B6", glow: "rgba(244,114,182,.3)" }
};

export function LifeMapHero() {
  const [activeLine, setActiveLine] = useState(0);

  return (
    <section className="relative min-h-[140vh] overflow-hidden bg-gradient-to-b from-black via-black/90 to-slate-950">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900/20 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,.08)_0,rgba(34,211,238,.04)_50,rgba(59,130,246,.06)_100)] animate-pulse" />
        </div>
      </div>

      {/* Manifesto typewriter */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-[clamp(3rem,8vw,10rem)] font-black leading-[0.85] tracking-[-0.05em] mb-12"
            style={{ background: "linear-gradient(135deg,#22d3ee 0%,#3b82f6 50%,#8b5cf6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            My Life in Code
          </motion.h1>

          <div className="space-y-3 max-w-3xl mx-auto">
            {MANIFESTO.map((line, i) => (
              <motion.div
                key={i}
                className="text-xl md:text-2xl leading-relaxed opacity-80"
                style={{ color: "hsl(210,20%,85%)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 0.8, duration: 0.6 }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <Link href="#apps" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
              Explore My Tools →
            </Link>
            <Link href="#hire" className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10 rounded-xl font-bold transition-all duration-300">
              Hire the Architect
            </Link>
          </motion.div>
        </div>
      </div>

      {/* App Constellation */}
      <section id="apps" className="relative z-10 py-32 pb-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.h2
              className="text-5xl md:text-7xl font-black mb-6"
              style={{ background: "linear-gradient(135deg,#22d3ee,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Seven Pillars
            </motion.h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Each app is a chapter from my struggle. Tools I wish I had when I was grinding DoorDash runs and mystery shopping.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.slice(0, 7).map((project, idx) => {
              const pillar = pillars[project.pillar];
              const theme = pillarThemes[project.pillar];

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Link href={`/work/${project.slug}`} className="block group">
                    <div className="relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Theme accent */}
                      <div 
                        className="absolute top-6 right-6 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100"
                        style={{ backgroundColor: theme.color, boxShadow: `0 0 20px ${theme.glow}` }}
                      />

                      <div className="relative z-10 p-8 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.color }} />
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                            {pillar.name}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-black mb-4 group-hover:text-cyan-400 transition-colors">
                          {project.name}
                        </h3>

                        <p className="text-lg text-zinc-400 mb-8 flex-1">
                          {project.oneLiner}
                        </p>

                        <div className="flex items-center gap-3 text-sm">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-zinc-400 font-mono">
                            {project.phase?.toUpperCase()}
                          </span>
                          <span className="text-zinc-500 ml-auto group-hover:text-cyan-400 transition-colors">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}