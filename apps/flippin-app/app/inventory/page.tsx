'use client';

import { useState } from 'react';

export default function Inventory() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [items] = useState([
    { id: '1', title: 'Vintage Camera', status: 'listed', costPrice: 30, currentPrice: 79.99, profit: 45.50, roi: '151%' },
    { id: '2', title: 'Nike Sneakers', status: 'sold', costPrice: 25, currentPrice: 62.00, profit: 32.40, roi: '129%' },
    { id: '3', title: 'Gaming Console', status: 'draft', costPrice: 120, currentPrice: null, profit: null, roi: null },
  ]);

  const filtered = filterStatus === 'all' ? items : items.filter(i => i.status === filterStatus);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-emerald-400 mb-2">Inventory</h1>
        <p className="text-slate-300">Manage your items: draft → listed → sold → shipped.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {['all', 'draft', 'listed', 'sold', 'archived'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === s
                ? 'bg-emerald-500 text-slate-900'
                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-emerald-500'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Cost</th>
              <th className="px-6 py-3">Current Price</th>
              <th className="px-6 py-3">Est. Profit</th>
              <th className="px-6 py-3">ROI</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-6 py-3 font-semibold">{item.title}</td>
                <td className="px-6 py-3">${item.costPrice.toFixed(2)}</td>
                <td className="px-6 py-3">{item.currentPrice ? `$${item.currentPrice.toFixed(2)}` : '—'}</td>
                <td className="px-6 py-3 text-emerald-400">{item.profit ? `+$${item.profit.toFixed(2)}` : '—'}</td>
                <td className="px-6 py-3 text-lime-400 font-bold">{item.roi || '—'}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'draft' ? 'bg-slate-700' :
                    item.status === 'listed' ? 'bg-emerald-900 text-emerald-200' :
                    item.status === 'sold' ? 'bg-lime-900 text-lime-200' :
                    'bg-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <button className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
