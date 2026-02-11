import type { ReactNode } from "react";

export default function GodTierShell({ children }: { children: ReactNode }) {
  return (
    <div className="gt-root">
      <a className="gt-skip" href="#main">Skip to content</a>

      <div className="gt-bg" aria-hidden="true" />

      <div className="gt-app">
        <header className="gt-top">
          <div className="gt-brand">
            <div className="gt-mark" aria-hidden="true" />
            <div className="gt-brandText">
              <div className="gt-title">ANDYSD SUITE</div>
              <div className="gt-sub">INDUSTRIAL CYBERNETICS • FUTURE OPS CONSOLE</div>
            </div>
          </div>

          <div className="gt-actions" aria-label="Global status">
            <div className="gt-pill"><span className="gt-led" /> ONLINE</div>
            <div className="gt-pill gt-pillDim">vNext</div>
          </div>
        </header>

        <div className="gt-grid">
          <nav className="gt-nav" aria-label="Primary">
            <a className="gt-link" href="/">HOME</a>
            <a className="gt-link" href="/work">WORK</a>
            <a className="gt-link" href="/labs">LABS</a>
            <a className="gt-link" href="/portal">PORTAL</a>

            <div className="gt-navMeta">
              <div className="gt-metaRow"><span>NODE</span><span>LOCAL</span></div>
              <div className="gt-metaRow"><span>MODE</span><span>DEV</span></div>
              <div className="gt-metaRow"><span>SEC</span><span>NOMINAL</span></div>
            </div>
          </nav>

          <main id="main" className="gt-main">
            {children}
          </main>

          <aside className="gt-side" aria-label="System panel">
            <div className="gt-panelTitle">SYSTEM</div>
            <div className="gt-panelLine" />
            <div className="gt-panelText">
              Keep pages flat & readable—this shell provides the “wow” so content stays professional.
            </div>
          </aside>
        </div>

        <footer className="gt-foot">
          <span className="gt-footText">© AndySD • Ops Shell</span>
        </footer>
      </div>
    </div>
  );
}
