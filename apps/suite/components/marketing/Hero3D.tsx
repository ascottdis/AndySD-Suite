"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, pillars } from "@/lib/projects";
import Link from "next/link";

export function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  
  const mouseX = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Calculate 3D orbital positions for 7 apps
  const appPositions = projects.slice(0, 7).map((_, idx) => {
    const angle = (idx / 7) * Math.PI * 2;
    const radius = 35; // percentage
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: Math.sin(angle * 2) * 10, // depth variation
    };
  });

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, cyan 0.5px, transparent 0.5px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Center Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-8xl md:text-9xl font-black tracking-tighter"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            ANDYSD
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-zinc-500 text-lg mt-4 font-mono uppercase tracking-widest"
        >
          Seven Pillars • One Ecosystem
        </motion.p>
      </div>

      {/* 3D Orbital App Cards */}
      <div className="relative w-full h-full flex items-center justify-center">
        {projects.slice(0, 7).map((project, idx) => {
          const pos = appPositions[idx];
          const pillar = pillars[project.pillar];
          
          const cardX = useTransform(mouseX, [-1, 1], [pos.x - 5, pos.x + 5]);
          const cardY = useTransform(mouseY, [-1, 1], [pos.y - 5, pos.y + 5]);
          const scale = useTransform(mouseY, [-1, 1], [0.9 + pos.z / 100, 1.1 + pos.z / 100]);

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 + 0.8, type: "spring", stiffness: 100 }}
              style={{
                x: cardX,
                y: cardY,
                scale,
              }}
              className="absolute group"
            >
              <Link href={`/work/${project.slug}`}>
                <div className="relative w-48 h-48 perspective-1000">
                  {/* Holographic Card */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 15, rotateX: 10 }}
                    className="relative w-full h-full rounded-2xl p-6 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: `0 8px 32px rgba(0,255,255,0.1), 
                                  inset 0 0 20px rgba(0,255,255,0.05)`,
                    }}
                  >
                    {/* Animated Gradient Border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, 
                          transparent 0%, 
                          rgba(0,255,255,0.3) 50%, 
                          transparent 100%)`,
                        backgroundSize: "200% 200%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                          {pillar.name}
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                          {project.phase.toUpperCase()}
                        </span>
                        <motion.div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                        >
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500 blur-xl -z-10" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-cyan-500 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-cyan-500 rounded-full"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}