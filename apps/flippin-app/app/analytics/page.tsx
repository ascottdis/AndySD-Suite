'use client';

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-emerald-400 mb-2">Analytics & Insights</h1>
        <p className="text-slate-300">Track profit, ROI, sell-through, and optimize your flipping strategy.</p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Total Flips</div>
          <div className="text-3xl font-bold text-emerald-400">127</div>
          <div className="text-xs text-slate-400 mt-2">↑ 12 this week</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Avg ROI</div>
          <div className="text-3xl font-bold text-lime-600">152%</div>
          <div className="text-xs text-slate-400 mt-2">↑ +8% vs last month</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Profit/Hour</div>
          <div className="text-3xl font-bold text-emerald-400">$24.30</div>
          <div className="text-xs text-slate-400 mt-2">↑ Best on Sundays</div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Sell-Through</div>
          <div className="text-3xl font-bold text-emerald-400">68%</div>
          <div className="text-xs text-slate-400 mt-2">↑ +5% vs avg</div>
        </div>
      </div>

      {/* Best & Worst Flips */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-emerald-400 mb-4">Best Flips This Month</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded">
              <div>
                <div className="font-semibold">Vintage Film Camera</div>
                <div className="text-xs text-slate-400">Cost: $30 → Sale: $145</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-400">+$110</div>
                <div className="text-xs text-lime-400">367% ROI</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded">
              <div>
                <div className="font-semibold">Gaming Console (Bundle)</div>
                <div className="text-xs text-slate-400">Cost: $75 → Sale: $189</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-400">+$102</div>
                <div className="text-xs text-lime-400">136% ROI</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-400 mb-4">Items to Reprice</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded">
              <div>
                <div className="font-semibold">Bluetooth Speaker</div>
                <div className="text-xs text-slate-400">Listed 35 days ago</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-red-400 font-bold">STALE</div>
                <button className="text-xs text-emerald-400 hover:text-emerald-300 mt-1">Reprice</button>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-900 rounded">
              <div>
                <div className="font-semibold">Phone Case (Bulk)</div>
                <div className="text-xs text-slate-400">Listed 42 days ago</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-red-400 font-bold">STALE</div>
                <button className="text-xs text-emerald-400 hover:text-emerald-300 mt-1">Reprice</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-emerald-400 mb-4">Category Performance</h3>
        <div className="space-y-4">
          {[
            { cat: 'Electronics', flips: 34, avgROI: '178%', profitable: true },
            { cat: 'Vintage/Collectibles', flips: 28, avgROI: '201%', profitable: true },
            { cat: 'Fashion', flips: 42, avgROI: '112%', profitable: true },
            { cat: 'Sports Equipment', flips: 23, avgROI: '89%', profitable: false },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-slate-900 rounded">
              <div>
                <div className="font-semibold">{row.cat}</div>
                <div className="text-sm text-slate-400">{row.flips} flips</div>
              </div>
              <div className="text-right">
                <div className={`font-bold text-lg ${row.profitable ? 'text-emerald-400' : 'text-red-400'}`}>{row.avgROI}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
