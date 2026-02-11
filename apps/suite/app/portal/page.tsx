type PortalApp = { slug: string; name: string; status: string; notes?: string };

export default function PortalHome() {
  const apps: PortalApp[] = [
    { slug: "gigos", name: "GigOS", status: "Active build", notes: "Command center + ledger + routing" },
    { slug: "outflip", name: "outFLIP", status: "Active build", notes: "Sourcing → research → list → sell automation" },
    { slug: "studio", name: "Studio", status: "Portal + marketing", notes: "Public front door + private vault" },
  ];

  return (
    <main>
      <h1 style={{ margin: 0 }}>Studio Portal</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>Gated vault for demos, roadmaps, and internal notes.</p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Apps</h2>
        <ul style={{ paddingLeft: 18 }}>
          {apps.map((a) => (
            <li key={a.slug} style={{ marginBottom: 10 }}>
              <a href={`/portal/${a.slug}`} style={{ fontWeight: 700 }}>{a.name}</a>
              <span style={{ opacity: 0.7 }}> — {a.status}</span>
              {a.notes ? <div style={{ opacity: 0.65, marginTop: 4 }}>{a.notes}</div> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}