"use client";

import { useEffect, useMemo, useState } from "react";
import AppCard from "./AppCard";
import AppModal from "./AppModal";
import { NAV_SECTIONS, PORTFOLIO_APPS } from "../data/apps";

export default function PortfolioHome() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => PORTFOLIO_APPS.find((a) => a.id === activeId) ?? null, [activeId]);
  const [hubOpen, setHubOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveId(null);
        setHubOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const suite = PORTFOLIO_APPS.filter((a) => a.id !== "cryptoacademy" && a.id !== "cyberacademy");
  const games = PORTFOLIO_APPS.filter((a) => a.id === "cryptoacademy" || a.id === "cyberacademy");

  const go = (id: string) => {
    setHubOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="relative z-10">
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <a href="#home" className="font-orbitron tracking-wider text-white">
            <span className="text-cyan-300">AndySD</span> Labs
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHubOpen(true)}
              className="text-xs font-mono px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
            >
              Nav
            </button>
            <a
              href="#contact"
              className="text-xs font-mono px-3 py-2 rounded-full bg-cyan-400 text-black hover:bg-cyan-300"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* NAV OVERLAY */}
      {hubOpen && (
        <div
          className="fixed inset-0 z-[900] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          onClick={() => setHubOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-cyan-400/30 bg-[#0b0d14]/90 shadow-[0_0_40px_rgba(0,255,249,0.18)] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-mono text-cyan-300/80 mb-6">/NAV-PROTOCOL/</div>
            <div className="flex flex-col gap-1">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className="text-left font-orbitron text-xl md:text-2xl text-gray-300 hover:text-white transition"
                >
                  <span className="mr-2">{s.icon}</span>
                  {s.title}
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>STATUS: ONLINE</span>
              <button
                onClick={() => setHubOpen(false)}
                className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main id="home">
        <section className="section">
          <div className="section-content text-center max-w-4xl">
            <h1 className="font-orbitron text-4xl md:text-6xl font-extrabold mb-4">
              <span className="brand-accent">The Cinematic Portfolio</span>
            </h1>
            <p className="text-lg md:text-2xl text-cyan-200 font-semibold">
              Apps, demos, and build proof — from AndySD Labs.
            </p>
            <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
              Explore the suite, open each app, and see the demo mockups.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#portfolio"
                className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition"
              >
                Enter Portfolio
              </a>
              <button
                onClick={() => setHubOpen(true)}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition font-mono text-sm"
              >
                Open Nav
              </button>
            </div>
          </div>
        </section>

        <section id="vision" className="section glass">
          <div className="section-content text-center">
            <h2 className="section-title brand-accent">Blueprint for Better Living</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-gray-200">
              Cinematic UX powered by practical intelligence — products that create clarity, motion, and real leverage.
            </p>
          </div>
        </section>

        <section id="portfolio" className="section bg-[#090b13]">
          <div className="section-content">
            <h2 className="section-title brand-accent text-center mb-10">
              Featured Apps (Click to Expand)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suite.map((app) => (
                <AppCard key={app.id} app={app} onOpen={setActiveId} />
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-orbitron text-2xl text-cyan-200 mb-4 text-center">Training Games</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {games.map((app) => (
                  <AppCard key={app.id} app={app} onOpen={setActiveId} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="mission" className="section glass">
          <div className="section-content text-center">
            <h2 className="section-title brand-accent">Core Directive: Form × Function</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-gray-200">
              No bloat. Fast. Cinematic. Every product earns its place and proves results.
            </p>
          </div>
        </section>

        <section id="contact" className="section glass">
          <div className="section-content text-center">
            <h2 className="section-title brand-accent">Get In Touch</h2>
            <p className="text-lg text-gray-200 mt-4 mb-8">
              Collaborations, builds, launches — let’s make something legendary.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
              <div>
                <div className="font-bold text-lg">Email</div>
                <a
                  className="text-cyan-300 underline"
                  href="mailto:andysdis.dev@gmail.com"
                >
                  andysdis.dev@gmail.com
                </a>
              </div>
              <div>
                <div className="font-bold text-lg">GitHub</div>
                <a
                  className="text-cyan-300 underline"
                  href="https://github.com/andysd-com"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/andysd-com
                </a>
              </div>
            </div>
            <div className="mt-10 text-sm text-gray-500">© 2025 AndySD Labs</div>
          </div>
        </section>
      </main>

      <AppModal app={active} open={!!active} onClose={() => setActiveId(null)} />
    </div>
  );
}
