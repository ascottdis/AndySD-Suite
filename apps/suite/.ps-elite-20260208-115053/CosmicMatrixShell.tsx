import type { ReactNode } from "react";

export default function CosmicMatrixShell({ children }: { children: ReactNode }) {
  return (
    <div className="cm-root">
      <a href="#main" className="cm-skip">Skip to content</a>

      {/* FX layers (pure CSS, pointer-events none) */}
      <div className="cm-fx">
        <div className="cm-stars" />
        <div className="cm-nebula" />
        <div className="cm-grid" />
        <div className="cm-scanlines" />
        <div className="cm-vignette" />
      </div>

      <div className="cm-shell">
        <header className="cm-header">
          <div className="cm-brand">
            <span className="cm-mark">ANDYSD</span>
            <span className="cm-title">SUITE</span>
            <span className="cm-sub">Matrix • Cosmic • Clean</span>
          </div>

          <div className="cm-status">
            <span className="cm-dot" />
            <span className="cm-statusText">System online</span>
          </div>
        </header>

        <main id="main" className="cm-main">
          {children}
        </main>

        <footer className="cm-footer">
          <span>Tip: Add ?fx=off later if you want a no-effects mode.</span>
        </footer>
      </div>
    </div>
  );
}
