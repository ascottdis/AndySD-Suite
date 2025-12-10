'use client';

import { useState } from 'react';

export default function Settings() {
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    businessName: 'My Flipping Store',
    shippingWeight: '2.5',
    taxId: '',
    preferredPlatforms: ['ebay', 'mercari'],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Settings saved!');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-4xl font-bold text-emerald-400 mb-2">Settings</h1>
        <p className="text-slate-300">Configure your account, platforms, and shipping defaults.</p>
      </div>

      {/* Account Settings */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400">Account</h2>
        <div>
          <label className="text-sm text-slate-400">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Tax ID</label>
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
          />
        </div>
      </div>

      {/* Shipping Defaults */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400">Shipping Presets</h2>
        <div>
          <label className="text-sm text-slate-400">Default Weight (lbs)</label>
          <input
            type="number"
            step="0.1"
            name="shippingWeight"
            value={formData.shippingWeight}
            onChange={handleChange}
            className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
          />
        </div>
        <div className="p-4 bg-slate-900 border border-slate-700 rounded text-sm text-slate-300">
          💡 Tip: Set your most-used shipping weight to auto-calculate faster.
        </div>
      </div>

      {/* Platform Integrations */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400">Platform Profiles</h2>
        <div className="space-y-3">
          {['eBay', 'Mercari', 'Facebook Marketplace'].map((platform) => (
            <div key={platform} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700">
              <div>
                <div className="font-semibold">{platform}</div>
                <div className="text-sm text-slate-400">Not connected</div>
              </div>
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded font-semibold text-sm transition">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-lg transition"
      >
        Save Settings
      </button>
    </div>
  );
}
