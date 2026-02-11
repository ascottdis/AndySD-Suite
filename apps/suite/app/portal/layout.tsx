export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ padding: 16, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none" }}>← Studio</a>
          <a href="/portal" style={{ textDecoration: "none", fontWeight: 700 }}>Portal</a>
          <span style={{ opacity: 0.6 }}>Private App Vault</span>
        </nav>
      </header>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}