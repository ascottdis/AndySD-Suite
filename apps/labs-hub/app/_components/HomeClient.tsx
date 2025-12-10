"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppCard } from "./AppCard";
import { AppModal } from "./AppModal";
import { NAV_SECTIONS, PORTFOLIO_APPS, type PortfolioApp } from "../data/apps";

type Stage = "intro" | "hub" | "main";

export function HomeClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [shatter, setShatter] = useState(false);
  const [active, setActive] = useState<PortfolioApp | null>(null);

  const letters = useMemo(() => "ANDYSD".split("), []);

  useEffect(() => {
    const locked = stage !== "main" || !!active;
    document.documentElement.classList.toggle("scroll-locked", locked);
    document.body.classList.toggle("scroll-locked", locked);
  }, [stage, active]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (active) setActive(null);
        else if (stage === "hub") setStage("main");
        else if (stage === "main") setStage("hub");
      }
      if ((e.key === "n" || e.key === "N") && stage === "main") setStage("hub");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, stage]);

  function goTo(id: string) {
    setStage("main");
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="relative z-10">
      {/* INTRO */}
      <AnimatePresence>
        {stage === "intro" ? (
          <motion.div
            className="fixed inset-0 z-[9999] grid place-items-center bg-[#050507]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => {
                setShatter(true);
                setTimeout(() => setStage("hub"), 320);
              }}
              className="select-none"
              aria-label="Enter AndySD Labs"
            >
              <div className="font-orbitron text-center uppercase">
                <div className="text-[12px] tracking-[0.35em] text-cyan-200/80 mb-5">
                  /SIGNATURE/ — click to open
                </div>

                <div className="text-6xl md:text-8xl font-black tracking-[-0.08em]">
                  {letters.map((ch, i) => {
                    // deterministic-ish scatter without RNG (SSR-safe)
                    const dx = ((i % 3) - 1) * 140;
                    const dy = ((i % 2) ? 1 : -1) * 110;
                    const rot = ((i % 4) - 2) * 25;

                    return (
                      <motion.span
                        key={`${ch}-${i}`}
                        className="inline-block bg-gradient-to-r from-emerald-200 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(0,255,255,0.25)]"
                        initial={{ opacity: 0, y: -44, rotateX: 90 }}
                        animate={
                          shatter
                            ? { opacity: 0, x: dx, y: dy, rotate: rot, scale: 0.7 }
                            : { opacity: 1, y: 0, rotateX: 0 }
                        }
                        transition={{
                          delay: shatter ? 0 : i * 0.05,
                          duration: shatter ? 0.25 : 0.8,
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                        }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </div>

                <div className="mt-6 text-sm text-gray-300 tracking-wide">
                  Cinematic portfolio • demos • build status
                </div>
              </div>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* NAV HUB */}
      <AnimatePresence>
        {stage === "hub" ? (
          <motion.div
            className="fixed inset-0 z-[9998] grid place-items-center bg-[#050507]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[min(860px,92vw)] rounded-2xl border-2 border-cyan-300/70 bg-[#0c0d14]/90 p-8 shadow-[0_0_80px_rgba(0,255,255,0.18)]"
              initial={{ clipPath: "inset(50% 50%)" }}
              animate={{ clipPath: "inset(0% 0%)" }}
              exit={{ clipPath: "inset(50% 50%)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="text-xs font-mono text-cyan-300 mb-6 text-center">
                /NAV-PROTOCOL-INIT/
              </div>

              <div className="flex flex-col items-center gap-2">
                {NAV_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(s.id)}
                    className="font-orbitron text-2xl md:text-4xl uppercase tracking-[0.12em] text-gray-400 hover:text-white hover:drop-shadow-[0_0_18px_rgba(0,255,255,0.55)] transition"
                  >
                    <span className="mr-3">{s.icon}</span>
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-gray-500 mt-6 text-center">
                STATUS: ONLINE • (Esc = close) • (N = reopen later)
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className={stage === "main" ? "opacity-100" : "opacity-0 pointer-events-none"}>
        <section id="home" className="min-h-[90vh] flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="font-orbitron text-4xl md:text-6xl text-cyan-200 drop-shadow-[0_8px_30px_rgba(0,255,255,0.2)]">
              The Cinematic Portfolio
            </h1>
            <p className="mt-5 text-xl md:text-2xl text-gray-200">
              Cinematic, intelligent tools for clarity, wellness, creativity, and mastery.
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              AndySD Labs builds digital instruments that turn real life into momentum — clean UX, practical AI, and bold design.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                className="rounded-full bg-cyan-400 text-black font-bold px-7 py-3 hover:bg-cyan-300 transition shadow-lg"
                onClick={() => goTo("portfolio")}
              >
                Enter Portfolio
              </button>
              <button
                className="rounded-full bg-white/10 text-white font-semibold px-7 py-3 hover:bg-white/15 transition"
                onClick={() => setStage("hub")}
              >
                Open Nav Hub
              </button>
            </div>
          </div>
        </section>

        <section id="vision" className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl md:text-5xl text-cyan-200">Blueprint for Better Living</h2>
            <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
              We build more than software — we architect <span className="text-cyan-200 font-semibold">digital instruments</span>.
              Cinematic aesthetics + practical intelligence, designed to produce real-world impact.
            </p>
          </div>
        </section>

        <section id="portfolio" className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-orbitron text-3xl md:text-5xl text-cyan-200 text-center mb-10">
              Featured Apps (Click to Expand)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PORTFOLIO_APPS.map((app) => (
                <AppCard key={app.id} app={app} onClick={() => setActive(app)} />
              ))}
            </div>
          </div>
        </section>

        <section id="mission" className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl md:text-5xl text-cyan-200">Core Directive</h2>
            <p className="mt-6 text-lg md:text-xl text-gray-200">
              We reject app bloat. Every product is built to feel like a personal superpower: momentum, clarity, mastery.
            </p>
          </div>
        </section>

        <section id="services" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-orbitron text-3xl md:text-5xl text-cyan-200 text-center">
              Creative Partnerships & Services
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-cyan-400/30 bg-white/5 p-6">
                <h3 className="font-orbitron text-xl text-cyan-200">Product Architecture & AI</h3>
                <ul className="mt-3 text-gray-200 space-y-2">
                  <li>Custom web & mobile development</li>
                  <li>AI-powered feature design</li>
                  <li>Rapid MVP & demo creation</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-fuchsia-400/30 bg-white/5 p-6">
                <h3 className="font-orbitron text-xl text-fuchsia-200">Brand Velocity & Strategy</h3>
                <ul className="mt-3 text-gray-200 space-y-2">
                  <li>Cinematic brand storytelling</li>
                  <li>Market positioning & naming</li>
                  <li>Roadmap & pitch deck refinement</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-yellow-400/30 bg-white/5 p-6">
                <h3 className="font-orbitron text-xl text-yellow-200">Design & UX Prototyping</h3>
                <ul className="mt-3 text-gray-200 space-y-2">
                  <li>Immersive UI/UX design</li>
                  <li>High-fidelity prototyping</li>
                  <li>User journey mapping</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-10">
              <button
                className="rounded-full bg-cyan-400 text-black font-bold px-8 py-3 hover:bg-cyan-300 transition shadow-lg"
                onClick={() => goTo("contact")}
              >
                Contact AndySD
              </button>
            </div>
          </div>
        </section>

        <section id="story" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl md:text-5xl text-cyan-200">My Story</h2>
            <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
              <span className="text-cyan-200 font-semibold">Hey, I’m Andrew (“AndySD”).</span>
              <br /><br />
              This portfolio is built from real life — and each app is meant to turn pain into power, and chaos into clarity.
              If I can build from zero, so can you — and I’m building the tools that help make it possible.
            </p>
          </div>
        </section>

        <section id="contact" className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-orbitron text-3xl md:text-5xl text-cyan-200">Get In Touch</h2>
            <p className="mt-4 text-gray-200">
              Interested in working together, launching your own app, or collaborating? Let’s build something legendary.
            </p>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-10">
              <div>
                <div className="font-bold text-lg">Email</div>
                <a className="text-cyan-300 underline" href="mailto:andysdis.dev@gmail.com">
                  andysdis.dev@gmail.com
                </a>
              </div>
              <div>
                <div className="font-bold text-lg">GitHub</div>
                <a className="text-cyan-300 underline" href="https://github.com/andysd-com" target="_blank" rel="noreferrer">
                  github.com/andysd-com
                </a>
              </div>
            </div>

            <footer className="mt-14 text-gray-500 text-sm">
              Crafted with <span className="text-cyan-300 font-bold">AndySD</span> energy — 2025
            </footer>
          </div>
        </section>
      </main>

      {/* MODAL */}
      <AppModal app={active} onClose={() => setActive(null)} />
    </div>
  );
}

