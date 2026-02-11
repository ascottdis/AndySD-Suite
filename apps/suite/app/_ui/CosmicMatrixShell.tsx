import type { ReactNode } from "react";

export default function CosmicMatrixShell({ children }: { children: ReactNode }) {
  return (
    <div className="cmx-root" data-theme="matrix-industrial">
      <a className="cmx-skip" href="#main">Skip to content</a>

      {/* Background FX */}
      <div className="cmx-fx" aria-hidden="true">
        <div className="cmx-nebula" />
        <div className="cmx-grid" />
        <div className="cmx-particles" />
        <div className="cmx-scanlines" />
        <div className="cmx-vignette" />
        <div className="cmx-noise" />
      </div>

      {/* Full-bleed HUD frame */}
      <div className="cmx-frame">
        <header className="cmx-topbar">
          <div className="cmx-brand">
            <div className="cmx-logo" aria-hidden="true" />
            <div className="cmx-brandText">
              <div className="cmx-title">ANDYSD SUITE</div>
              <div className="cmx-sub">ELITE INDUSTRIAL CYBERNETICS • MATRIX COSMOS</div>
            </div>
          </div>

          <div className="cmx-status">
            <span className="cmx-led" />
            <span className="cmx-statusText">ONLINE</span>
            <span className="cmx-divider" />
            <span className="cmx-chip">TURBOPACK</span>
          </div>
        </header>

        <div className="cmx-body">
          <aside className="cmx-rail" aria-label="System rail">
            <div className="cmx-railCap">
              <div className="cmx-railLabel">SYS</div>
              <div className="cmx-railLine" />
            </div>

            <div className="cmx-railStack">
              <div className="cmx-pip" title="Core" />
              <div className="cmx-pip" title="Ops" />
              <div className="cmx-pip" title="Logs" />
              <div className="cmx-pip" title="Net" />
            </div>

            <div className="cmx-railFooter">
              <div className="cmx-railLabel">SEC</div>
              <div className="cmx-railLine" />
            </div>
          </aside>

          <main id="main" className="cmx-main">
            <div className="cmx-content">
              {children}
            </div>
          </main>
        </div>

        <footer className="cmx-foot">
          <span className="cmx-footText">Tip: keep content components “flat” (no extra rounded cards) for a tighter industrial look.</span>
        </footer>
      </div>
    </div>
  );
}
