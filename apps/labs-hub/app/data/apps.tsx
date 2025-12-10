import type { ReactNode } from "react";

export type PortfolioApp = {
  id: string;
  title: string;
  subtitle: string;
  aliases?: string[];
  gradient: string;
  fxClass: string;
  borderClass: string;
  titleClass: string;
  subClass: string;
  features: string[];
  description: ReactNode;
  demo: ReactNode;
  cta: { text: string; href: string; disabled?: boolean };
  status?: string;
};

export const NAV_SECTIONS = [
  { id: "home", title: "Home", icon: "🏠" },
  { id: "vision", title: "Vision", icon: "✨" },
  { id: "portfolio", title: "Portfolio", icon: "💻" },
  { id: "mission", title: "Core Directive", icon: "🎯" },
  { id: "services", title: "Partnerships", icon: "🤝" },
  { id: "story", title: "My Story", icon: "👤" },
  { id: "contact", title: "Contact", icon: "📧" },
];

export const PORTFOLIO_APPS: PortfolioApp[] = [
  // ✅ LABS (THIS SITE) — now shows as the “hub” card
  {
    id: "labs",
    title: "AndySD Labs Hub",
    subtitle: "Portfolio HQ • launchpad for every product • demos per app",
    aliases: ["AndySD Suite"],
    gradient: "from-black to-slate-900",
    fxClass: "mirror-bg",
    borderClass: "border-cyan-500/20",
    titleClass: "font-orbitron text-cyan-200",
    subClass: "text-gray-200",
    status: "Live (this hub)",
    features: ["Cinematic portfolio system", "Per-app demos + proof-of-build", "Roadmap + status tracking"],
    description: (
      <>
        The public home for AndySD Labs — every product gets a story, a demo, a purpose, and a build status.
        This hub stays clean, fast, and cinematic while the suite expands.
      </>
    ),
    demo: (
      <div className="text-xs font-mono text-gray-200 space-y-2">
        <div className="flex justify-between"><span>Suite Apps</span><span className="text-cyan-200">6</span></div>
        <div className="flex justify-between"><span>Training Games</span><span className="text-cyan-200">2</span></div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 w-[72%]" />
        </div>
        <div className="text-[11px] text-gray-300">Build status: moving toward v1.</div>
      </div>
    ),
    cta: { text: "Contact", href: "#contact" },
  },

  // ✅ FLIPPIN + FLIPPIN OUT (combined prominently)
  {
    id: "flippin",
    title: "Flippin’ × FlippiN’ Out",
    subtitle: "AI resale command center + gamified deal-hunt mode",
    aliases: ["FlipFindr (alt branding)"],
    gradient: "from-emerald-900 to-lime-700",
    fxClass: "flippin-bg",
    borderClass: "border-lime-500/30",
    titleClass: "font-orbitron text-lime-100",
    subClass: "text-emerald-100",
    status: "In build",
    features: ["Photo → Identify → Price → List", "Cross-listing workflow", "Missions + ROI streaks + heatmaps"],
    description: (
      <>
        <strong>Flippin’</strong> is the serious resale cockpit: intake, comps, fee math, listing pipelines.
        <br /><br />
        <strong>FlippiN’ Out</strong> is the adrenaline layer: missions, heatmaps, leaderboards, and “deal radar”.
      </>
    ),
    demo: (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input className="w-full p-2 rounded bg-gray-800 text-white border border-white/10" placeholder="Buy ($)" />
          <input className="w-full p-2 rounded bg-gray-800 text-white border border-white/10" placeholder="Sell ($)" />
        </div>
        <div className="text-center font-orbitron text-xl p-2 rounded bg-lime-600/70 mt-1">
          Est. ROI: <span className="text-lime-200">240%</span>
        </div>
        <div className="text-[11px] text-gray-300 text-center">(Demo mock) comps + fees + missions hook in next.</div>
      </div>
    ),
    cta: { text: "Open Flippin", href: "#", disabled: true },
  },

  // ✅ GIGGIN + GIG-EZ (combined)
  {
    id: "giggin",
    title: "GiGGiN’ × Gig-EZ",
    subtitle: "Side-hustle command center + 10-second job capture",
    aliases: ["Gig-EZ (fast mode)"],
    gradient: "from-slate-900 to-cyan-800",
    fxClass: "gigit-bg",
    borderClass: "border-cyan-500/30",
    titleClass: "font-orbitron text-cyan-200",
    subClass: "text-cyan-100",
    status: "MVP forming",
    features: ["Track gigs, pay, deadlines", "Route batching + optimization (next)", "Templates + instant entry"],
    description: (
      <>
        <strong>GiGGiN’</strong> is your gig cockpit: earnings, time, deadlines, and routes.
        <br /><br />
        <strong>Gig-EZ</strong> is the quick-capture layer so you can add jobs without breaking flow.
      </>
    ),
    demo: (
      <div className="space-y-2 text-xs font-mono">
        <div className="flex justify-between p-2 rounded bg-cyan-900/40"><span>Audit Route (2h)</span><span className="text-green-300">$84.00</span></div>
        <div className="flex justify-between p-2 rounded bg-cyan-900/40"><span>Delivery (3h)</span><span className="text-green-300">$105.00</span></div>
        <div className="text-center pt-2 text-gray-300">Total (today): <span className="text-cyan-200">$189.00</span></div>
      </div>
    ),
    cta: { text: "Open GiGGiN", href: "#", disabled: true },
  },

  // ✅ CRUIZR + CRUIZN + VALID8 (combined)
  {
    id: "cruizr",
    title: "Cruizr × CruizN × Valid8",
    subtitle: "Realms-based GPS social + trust/verification layer",
    aliases: ["Valid8 (safety layer)"],
    gradient: "from-slate-950 to-fuchsia-800",
    fxClass: "mirror-bg",
    borderClass: "border-fuchsia-500/30",
    titleClass: "font-orbitron text-fuchsia-200",
    subClass: "text-fuchsia-100",
    status: "Design locked",
    features: ["Realms (intent + expectations)", "Map + privacy controls", "Verification + consent-first controls"],
    description: (
      <>
        <strong>Cruizr</strong> is GPS social with “Realms” that set intent and expectations up front.
        <br /><br />
        <strong>CruizN</strong> = the broad “hangout + explore” vibe.
        <br />
        <strong>Valid8</strong> = the trust/safety layer: verification, consent-first controls, anti-catfish tooling.
      </>
    ),
    demo: (
      <div className="space-y-2 text-sm">
        <div className="flex gap-2 flex-wrap justify-center">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Social</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Dating</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Networking</span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Anon Party</span>
        </div>
        <div className="text-xs text-gray-300 text-center">Realm defines profile fields + visibility + chat rules.</div>
      </div>
    ),
    cta: { text: "Open Cruizr", href: "#", disabled: true },
  },

  // ✅ ARIADNE + ENSIGHT + MIRROR (combined)
  {
    id: "ariadne",
    title: "Ariadne × ENSIGHT × Mirror",
    subtitle: "Relationship intelligence + evidence-based coaching loops",
    aliases: ["ENSIGHT (engine)", "Mirror (reflection layer)"],
    gradient: "from-slate-800 to-indigo-800",
    fxClass: "ensight-bg",
    borderClass: "border-indigo-500/30",
    titleClass: "font-orbitron text-indigo-300",
    subClass: "text-gray-100",
    status: "Spec complete",
    features: ["Pattern + trigger insights", "Repair tools + conflict mapping", "Evidence-based growth loops"],
    description: (
      <>
        <strong>Ariadne</strong> is relationship intelligence — not dating, not therapy.
        <br /><br />
        <strong>ENSIGHT</strong> is the intelligence core; <strong>Mirror</strong> turns insight into private growth loops.
      </>
    ),
    demo: (
      <div className="bg-indigo-900/40 p-3 rounded text-sm space-y-2">
        <div className="text-indigo-200 font-semibold">Insight Snapshot</div>
        <ul className="list-disc list-inside text-gray-200 text-xs space-y-1">
          <li>Pattern: escalation after “tone mismatch”</li>
          <li>Repair: reflect + ask a concrete need</li>
          <li>Trigger: uncertainty + time pressure</li>
        </ul>
      </div>
    ),
    cta: { text: "Open Ariadne", href: "#", disabled: true },
  },

  // ✅ ARTPERIOD + ART(period) (combined)
  {
    id: "artperiod",
    title: "ArtPeriod™ × ART(period)",
    subtitle: "AI art scanner + provenance signals + anomaly detection",
    aliases: ["ART(period) (alt styling)"],
    gradient: "from-slate-900 to-rose-800",
    fxClass: "artperiod-bg",
    borderClass: "border-rose-400/30",
    titleClass: "font-serif text-rose-200",
    subClass: "text-rose-100",
    status: "In build",
    features: ["Scan & identify art", "Provenance chain signals", "Fraud/anomaly detection"],
    description: <>Scan artwork, confirm authenticity, and surface anomaly warnings fast.</>,
    demo: (
      <div className="bg-rose-900/40 p-3 rounded text-sm space-y-1">
        <p><span className="text-rose-300">ID:</span> #78B2-X-A49F</p>
        <p><span className="text-rose-300">Status:</span> Provenance <span className="text-green-300 font-bold">SOLID</span></p>
        <p><span className="text-rose-300">Integrity:</span> Pigment <span className="text-yellow-300 font-bold">CAUTION</span></p>
      </div>
    ),
    cta: { text: "Open ArtPeriod", href: "#", disabled: true },
  },

  // 🎮 Keep games
  {
    id: "cryptoacademy",
    title: "Crypto Academy",
    subtitle: "Neon-grid learning game",
    gradient: "from-slate-950 to-cyan-900",
    fxClass: "cryptoacademy-bg",
    borderClass: "border-cyan-400/30",
    titleClass: "font-orbitron text-cyan-200",
    subClass: "text-cyan-100",
    status: "Concept",
    features: ["Foundations → advanced", "Hands-on quests", "Review flashcards"],
    description: <>Quest-based crypto learning with clean progression and game mechanics that make retention automatic.</>,
    demo: (
      <div className="text-center py-6">
        <p className="text-lg text-cyan-300 mb-2">Quest Log (Module 1)</p>
        <div className="text-xs text-gray-200">Complete “What is a Block?” (✅)<br />Start “Gas Fees & Wallets” (⏳)</div>
      </div>
    ),
    cta: { text: "Start a Quest", href: "#", disabled: true },
  },
  {
    id: "cyberacademy",
    title: "Cyber Academy",
    subtitle: "Scanlines + defense training game",
    gradient: "from-slate-900 to-rose-900",
    fxClass: "cyberacademy-bg",
    borderClass: "border-rose-400/30",
    titleClass: "font-orbitron text-rose-200",
    subClass: "text-rose-100",
    status: "Concept",
    features: ["Blue/Purple team labs", "Ethical training", "Progress tracking"],
    description: <>A gamified, ethical cyber training environment: labs, scenarios, progress stats, clean path from fundamentals → advanced defense.</>,
    demo: (
      <div className="text-center py-6">
        <p className="text-lg text-rose-300 mb-2">Defense Status</p>
        <p className="text-sm text-gray-200">Threat Level: <span className="text-red-400 font-bold">HIGH</span></p>
        <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden"><div className="h-full bg-rose-500 w-[85%]" /></div>
        <p className="text-xs text-center mt-1 text-gray-200">Firewall Integrity: 85%</p>
      </div>
    ),
    cta: { text: "Enter the Lab", href: "#", disabled: true },
  },
];
