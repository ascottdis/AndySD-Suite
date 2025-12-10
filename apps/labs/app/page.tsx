"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Stage = "entrance" | "hub" | "main";

type AppCard = {
  id: string;
  title: string;
  subtitle: string;
  bg: string;
  gradient: string;
  border: string;
  titleClass?: string;
  subClass?: string;
  features: string[];
  longDescription: string;
  demoContent: string; // HTML snippet
  cta: { text: string; href: string };
  htmlTitle?: string; // optional HTML title for card
  logoHTML?: string;  // optional HTML logo
};

const ENTRANCE_TEXT = "ANDYSD";

const NAV_SECTIONS = [
  { id: "home", title: "Home", icon: "🏠" },
  { id: "vision", title: "Vision", icon: "✨" },
  { id: "portfolio", title: "Portfolio", icon: "💻" },
  { id: "mission", title: "Core Directive", icon: "🎯" },
  { id: "services", title: "Partnerships", icon: "🤝" },
  { id: "story", title: "My Story", icon: "👤" },
  { id: "contact", title: "Contact", icon: "📧" },
] as const;

const APPS: AppCard[] = [
  {
    id: "giggin",
    title: "GiGGiN’",
    subtitle: "Side-hustle & gig planner",
    bg: "gigit-bg",
    gradient: "from-slate-900 to-cyan-800",
    border: "border-cyan-500/30",
    titleClass: "font-orbitron text-cyan-200",
    subClass: "text-cyan-100",
    features: ["Track gigs, pay, and deadlines", "Route planner + maps integration", "Export to JSON for sharing"],
    longDescription:
      "The definitive tool for the modern side-hustler. GiGGiN' combines smart scheduling, dynamic pay tracking, and real-time route optimization. Stop managing gigs in spreadsheets and start seeing real profit growth.",
    demoContent:
      `<p class="text-sm text-gray-400 mb-2">Simulated Gig Dashboard:</p>
       <div class="space-y-2 text-xs font-mono">
         <div class="flex justify-between p-2 bg-cyan-900/40 rounded"><span>Uber (4h)</span><span class="text-green-300">$125.00</span></div>
         <div class="flex justify-between p-2 bg-cyan-900/40 rounded"><span>Freelance (2h)</span><span class="text-green-300">$80.00</span></div>
         <p class="text-center mt-3"><a href="#" class="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-lg transition text-sm">Add New Gig</a></p>
       </div>`,
    cta: { text: "Organize Your Hustle", href: "#" },
  },
  {
    id: "artperiod",
    title: "ART(period)",
    subtitle: "AI art scanner & provenance engine",
    bg: "artperiod-bg",
    gradient: "from-slate-900 to-fuchsia-800",
    border: "border-fuchsia-500/30",
    titleClass: "font-serif text-fuchsia-200",
    subClass: "text-fuchsia-100",
    features: ["Scan & identify artworks", "Trace ownership & provenance", "Detect fraud & overpainting"],
    longDescription:
      "The future of art authentication. ART(period) uses AI and blockchain principles to create an immutable ledger of artwork provenance. Scan a piece to instantly check its history, identify suspicious alterations, and ensure you're dealing with the real deal.",
    demoContent:
      `<p class="text-sm text-gray-400 mb-2">Scan Result Mockup:</p>
       <div class="bg-fuchsia-900/40 p-3 rounded text-sm space-y-1">
         <p><span class="text-fuchsia-300">ID:</span> #78B2-X-A49F</p>
         <p><span class="text-fuchsia-300">Artist:</span> Unknown (Late 19th C.)</p>
         <p><span class="text-fuchsia-300">Status:</span> Provenance Chain <span class="text-green-400 font-bold">SOLID</span></p>
         <p><span class="text-fuchsia-300">Integrity:</span> Pigment Analysis <span class="text-yellow-400 font-bold">CAUTION (Minor Overpainting)</span></p>
       </div>`,
    cta: { text: "Start Art Scanning", href: "#" },
  },
  {
    id: "flippinout",
    title: "FlippiN’ Out",
    subtitle: "Gamified resale radar",
    bg: "flippin-bg",
    gradient: "from-emerald-900 to-lime-700",
    border: "border-lime-500/30",
    titleClass: "text-lime-100",
    subClass: "text-emerald-100",
    htmlTitle:
      `<span class="flippinout-anim">
        <span class="part-flippi font-comic"><span>F</span><span>l</span><span>i</span><span>p</span><span>p</span><span>i</span></span>
        <span class="part-n font-comic">N’</span>
        <span class="part-out font-comic"><span>O</span><span>U</span><span>T</span></span>
      </span>`,
    features: ["Marketplace aggregator", "Heatmaps & pickup routes", "ROI scanner + leaderboard"],
    longDescription:
      "A game for profit seekers. FlippiN’ Out aggregates listing data across major resale platforms, flagging items with maximum markup potential. The gamified ROI scanner challenges you to find the best deals and climb the global flipper leaderboard.",
    demoContent:
      `<p class="text-sm text-gray-400 mb-2">ROI Scanner:</p>
       <div class="space-y-2 text-sm">
         <input type="number" placeholder="Cost Price ($)" class="w-full p-2 rounded bg-gray-700 text-white border-0">
         <input type="number" placeholder="Est. Sell Price ($)" class="w-full p-2 rounded bg-gray-700 text-white border-0">
         <div class="text-center font-orbitron text-2xl p-2 rounded bg-lime-600/70 mt-3">Est. ROI: <span class="text-lime-200">240%</span></div>
       </div>`,
    cta: { text: "Start FlippiN’", href: "#" },
  },
  // Keep adding the rest of your APPS here (copy/paste from your HTML list)
];

function strongify(text: string) {
  // Optional: super light markdown-ish bold for **...**
  const parts = text.split("**");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-white">
            {p}
          </strong>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        )
      )}
    </>
  );
}

export default function Page() {
  const [stage, setStage] = useState<Stage>("entrance");
  const [entranceHidden, setEntranceHidden] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppCard | null>(null);

  const [signatureVisible, setSignatureVisible] = useState(false);
  const [shattered, setShattered] = useState(false);

  const signatureRef = useRef<HTMLHeadingElement | null>(null);

  // deterministic "random-ish" delays to avoid hydration mismatch
  const charDelays = useMemo(
    () => ENTRANCE_TEXT.split("").map((_, i) => ((i * 73) % 500) / 1000),
    []
  );

  // scroll lock
  useEffect(() => {
    const locked = stage !== "main" || !!selectedApp;
    document.documentElement.classList.toggle("scroll-locked", locked);
    document.body.classList.toggle("scroll-locked", locked);
  }, [stage, selectedApp]);

  // entrance fall-in
  useEffect(() => {
    const t = setTimeout(() => setSignatureVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // ESC closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedApp(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleSignatureClick() {
    setShattered(true);
    // Let shatter start, then open hub
    setTimeout(() => {
      setStage("hub");
      // fade out entrance container
      setTimeout(() => setEntranceHidden(true), 800);
    }, 300);
  }

  function closeHub(targetId?: string) {
    // play close animation via class toggle; we’ll just time the stage switch
    const hub = document.getElementById("nav-hub");
    hub?.classList.remove("visible");
    hub?.classList.add("closing");

    setTimeout(() => {
      setStage("main");
      if (targetId) {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 420);
  }

  function onCardMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
    el.style.setProperty("--x", `${mx}%`);
    el.style.setProperty("--y", `${my}%`);
  }

  return (
    <div className="min-h-screen">
      {/* 1) Entrance */}
      {!entranceHidden && (
        <div
          id="entrance-container"
          className="fixed inset-0 flex flex-col items-center justify-center z-[10000]"
          style={{ opacity: stage === "entrance" ? 1 : 0, backgroundColor: "#050507" }}
        >
          <h1
            ref={signatureRef}
            id="signature-title"
            className="signature-title font-thin tracking-widest text-center select-none"
            onClick={handleSignatureClick}
            aria-label="Enter AndySD"
          >
            {ENTRANCE_TEXT.split("").map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className={[
                  "char",
                  signatureVisible ? "visible" : "",
                  shattered ? "shattered" : "",
                ].join(" ")}
                style={
                  shattered
                    ? ({
                        // shatter vectors are set on click by CSS vars; these defaults are overwritten in CSS for variety
                        transitionDelay: "0ms",
                      } as React.CSSProperties)
                    : ({
                        transitionDelay: `${charDelays[i]}s`,
                      } as React.CSSProperties)
                }
              >
                {ch}
              </span>
            ))}
          </h1>
        </div>
      )}

      {/* 2) Nav hub */}
      <div
        id="nav-hub"
        className={[
          "fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-[#050507]",
          stage === "hub" ? "visible" : "",
        ].join(" ")}
      >
        <div
          id="hub-frame-content"
          className="flex flex-col items-center"
          style={{ display: stage === "hub" ? "flex" : "none" }}
        >
          <p className="text-xs font-mono text-cyan-400 mb-6">/NAV-PROTOCOL-INIT/</p>

          <div id="hub-links-container" className="flex flex-col">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="hub-link block no-underline transition transform hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  closeHub(s.id);
                }}
              >
                {s.icon} {s.title}
              </a>
            ))}
          </div>

          <p className="text-xs font-mono text-gray-600 mt-6">STATUS: ONLINE</p>
        </div>
      </div>

      {/* 3) Main */}
      <div id="main-content-wrapper" className={stage === "main" ? "visible" : ""}>
        {/* HOME */}
        <section id="home" className="section flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4 font-orbitron brand-accent">
              The Cinematic Portfolio
            </h2>
            <p className="text-xl md:text-3xl font-semibold mb-4 text-cyan-200">
              Cinematic, intelligent tools for clarity, wellness, creativity, and mastery.
            </p>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
              Empowering people to change their lives and communities through beautiful, bold, and transformative
              technology.
            </p>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" className="section glass">
          <div className="section-content text-center">
            <h2 className="section-title brand-accent">Blueprint for Better Living</h2>
            <p className="text-xl max-w-3xl mx-auto mt-2">
              {strongify(
                "We build more than software—we architect **digital instruments** designed for personal transformation. AndySD's vision is to fuse **cinematic aesthetics** with **practical AI**, creating tools that don't just solve problems, but **elevate your entire experience**."
              )}
              <br />
              <br />
              {strongify(
                "We aim for **real-world impact**: providing clarity, unlocking creative income, enhancing wellness, and guiding you toward personal and professional mastery, regardless of your starting point."
              )}
            </p>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="section bg-[#090b13]">
          <div className="section-content">
            <h2 className="section-title brand-accent text-center mb-8">Featured Apps (Click to Expand)</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {APPS.map((app) => (
                <div
                  key={app.id}
                  className={`app-card bg-gradient-to-br ${app.gradient} ${app.bg} p-6 border-2 ${app.border} shadow-lg`}
                  onMouseMove={onCardMouseMove}
                  onClick={() => setSelectedApp(app)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="z-10 relative">
                    <div
                      className={`${app.titleClass ?? "text-white"} text-3xl font-bold mb-1 leading-tight`}
                      dangerouslySetInnerHTML={{ __html: app.htmlTitle ?? app.title }}
                    />
                    <p className={`${app.subClass ?? "text-gray-300"} text-base font-medium uppercase tracking-wider`}>
                      {app.subtitle}
                    </p>
                  </div>

                  <ul className="list-none mt-4 text-sm space-y-1 text-gray-300 z-10 relative">
                    {app.features.map((f) => (
                      <li key={f} className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-cyan-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M10 16h.01"
                          />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section id="mission" className="section glass">
          <div className="section-content text-center">
            <h2 className="section-title brand-accent">Our Core Directive: The Fusion of Form &amp; Function</h2>
            <p className="text-xl max-w-2xl mx-auto mt-2">
              We reject &apos;app bloat.&apos; Our mission is to engineer intelligent digital companions that actively
              drive your success.
            </p>
          </div>
        </section>

        {/* CONTACT (keep your other sections the same style if you want) */}
        <section id="contact" className="section glass">
          <div className="section-content text-center">
            <h2 className="section-title brand-accent">Get In Touch</h2>
            <p className="text-lg mb-6">
              Interested in working together, launching your own app, or collaborating?
              <br />
              Let&apos;s build something legendary.
            </p>
          </div>
        </section>

        <footer className="w-full text-center py-4 text-gray-400 text-sm bg-black/60">
          Crafted with <span className="text-cyan-300 font-bold">AndySD</span> energy —{" "}
          <span className="font-mono">2025</span>
        </footer>
      </div>

      {/* Modal */}
      {selectedApp && (
        <div
          id="appPreviewModal"
          className="fixed inset-0 z-[10000] grid place-items-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            id="previewPanel"
            className="preview-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
              aria-label="Close Modal"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <h3 className={`text-4xl font-orbitron font-bold ${selectedApp.titleClass ?? "text-white"}`}>
                {selectedApp.title}
              </h3>
              <p className={`text-xl ${selectedApp.subClass ?? "text-gray-300"}`}>{selectedApp.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-2xl font-orbitron text-cyan-400 mb-2">Concept Summary</h4>
                <p className="text-base text-gray-300">{selectedApp.longDescription}</p>

                <h4 className="text-2xl font-orbitron text-cyan-400 mt-4 mb-2">Key Features</h4>
                <ul className="list-disc list-inside text-base text-gray-300 space-y-1">
                  {selectedApp.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-black/50 border border-cyan-800/50">
                <h4 className="text-2xl font-orbitron text-cyan-400 mb-2 text-center">Live Demo Mockup</h4>
                <div
                  className="p-4 bg-gray-900 rounded-xl"
                  dangerouslySetInnerHTML={{ __html: selectedApp.demoContent }}
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href={selectedApp.cta.href}
                className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full shadow-lg transition text-lg mt-4"
              >
                {selectedApp.cta.text}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
