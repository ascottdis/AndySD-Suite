export default async function FlippinPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl font-black mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          FLIPPIN
        </h1>
        <p className="text-2xl text-zinc-400 mb-8 font-mono">
          Arbitrage Operating System
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-lg">
          <div className="bg-black/30 border border-emerald-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">Status</h2>
            <div className="space-y-2 text-zinc-400">
              <div>✓ Terapeak Scanner: Active</div>
              <div>✓ eBay Auto-Poster: Ready</div>
              <div>✓ Mercari Monitor: Live</div>
            </div>
          </div>
          <div className="bg-black/30 border border-cyan-500/30 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Stats</h2>
            <div className="space-y-2 text-zinc-400">
              <div>📊 Products Tracked: 47,892</div>
              <div>💰 Profit Margin: 28.4%</div>
              <div>⚡ Last Flip: 2h ago</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}