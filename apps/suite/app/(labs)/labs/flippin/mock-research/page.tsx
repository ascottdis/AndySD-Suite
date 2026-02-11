export default function MockResearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Mock Research Lab
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Simulate product research → Band analysis → Auto-flip decisions
          </p>
        </div>

        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-black/30 border border-zinc-700/50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-emerald-400">New Research Run</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-zinc-400 mb-2">Product Title</label>
                <input name="title" placeholder="AirPods Pro 2 USB-C" className="w-full p-4 bg-zinc-900 border border-zinc-600 rounded-xl text-white focus:border-emerald-400" required />
              </div>
              <div>
                <label className="block text-sm font-mono text-zinc-400 mb-2">Condition</label>
                <input name="condition" placeholder="Used / New" className="w-full p-4 bg-zinc-900 border border-zinc-600 rounded-xl text-white focus:border-emerald-400" />
              </div>
              <button type="button" className="w-full p-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all">
                Start Research Run
              </button>
            </form>
          </div>

          <div className="bg-black/30 border border-zinc-700/50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">Recent Runs</h3>
            <div className="space-y-3">
              <div className="p-4 bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
                <div className="font-mono text-sm text-zinc-400">AirPods Pro → Band C+ → $42 profit</div>
              </div>
              <div className="p-4 bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
                <div className="font-mono text-sm text-zinc-400">iPhone 14 → Band A → $128 profit</div>
              </div>
              <div className="p-4 bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
                <div className="font-mono text-sm text-zinc-400">MacBook Air → Band B → $85 profit</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl">
            <div className="text-4xl font-black text-emerald-400 mb-2">47</div>
            <div className="text-sm text-zinc-400 font-mono">Total Runs</div>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-xl">
            <div className="text-4xl font-black text-cyan-400 mb-2">$2,847</div>
            <div className="text-sm text-zinc-400 font-mono">Total Profit</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-xl">
            <div className="text-4xl font-black text-purple-400 mb-2">83%</div>
            <div className="text-sm text-zinc-400 font-mono">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}