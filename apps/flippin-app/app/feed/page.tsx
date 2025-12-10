'use client';

import { useState } from 'react';

interface MarketplaceListing {
  id: string;
  platform: string;
  title: string;
  currentPrice: number;
  condition: string;
  location: string;
  photoUrl?: string;
  roi: number;
  estimatedProfit: number;
  confidence: number;
}

// Mock marketplace listings with ROI suggestions
const mockListings: MarketplaceListing[] = [
  {
    id: '1',
    platform: 'eBay',
    title: 'Vintage Canon AE-1 35mm Camera – Excellent',
    currentPrice: 189.99,
    condition: 'Excellent',
    location: 'Los Angeles, CA',
    roi: 42,
    estimatedProfit: 85.50,
    confidence: 88,
    photoUrl: 'https://via.placeholder.com/300x300?text=Canon+AE-1',
  },
  {
    id: '2',
    platform: 'Mercari',
    title: 'Apple Watch Series 6 (44mm) Titanium – Like New',
    currentPrice: 275.00,
    condition: 'Like New',
    location: 'Seattle, WA',
    roi: 38,
    estimatedProfit: 104.25,
    confidence: 92,
    photoUrl: 'https://via.placeholder.com/300x300?text=Apple+Watch',
  },
  {
    id: '3',
    platform: 'Facebook',
    title: 'Instant Pot Pro Plus 6L – New in Box',
    currentPrice: 99.50,
    condition: 'New',
    location: 'Denver, CO',
    roi: 55,
    estimatedProfit: 54.75,
    confidence: 85,
    photoUrl: 'https://via.placeholder.com/300x300?text=Instant+Pot',
  },
  {
    id: '4',
    platform: 'eBay',
    title: 'Lego Star Wars Millennium Falcon UCS – Sealed',
    currentPrice: 599.99,
    condition: 'New',
    location: 'Chicago, IL',
    roi: 31,
    estimatedProfit: 185.97,
    confidence: 79,
    photoUrl: 'https://via.placeholder.com/300x300?text=Lego+Falcon',
  },
  {
    id: '5',
    platform: 'Poshmark',
    title: 'Nike Air Jordan 1 Retro High OG – Size 10 – DS',
    currentPrice: 325.00,
    condition: 'Deadstock',
    location: 'New York, NY',
    roi: 48,
    estimatedProfit: 156.00,
    confidence: 90,
    photoUrl: 'https://via.placeholder.com/300x300?text=Air+Jordan+1',
  },
];

export default function FeedPage() {
  const [listings, setListings] = useState<MarketplaceListing[]>(mockListings);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [roiMin, setRoiMin] = useState<number | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const handleSave = (id: string) => {
    const newSaved = new Set(saved);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSaved(newSaved);
    // TODO: POST to /api/feed/:id/save
  };

  const handleSync = () => {
    // TODO: POST to /api/feed/sync
    console.log('Syncing marketplace feeds...');
  };

  const filteredListings = listings.filter((listing) => {
    if (priceMin !== null && listing.currentPrice < priceMin) return false;
    if (priceMax !== null && listing.currentPrice > priceMax) return false;
    if (location && !listing.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (roiMin !== null && listing.roi < roiMin) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Live Marketplace Feed</h1>
        <button
          onClick={handleSync}
          className="px-4 py-2 bg-emerald-500 text-slate-950 rounded font-semibold hover:bg-emerald-400 transition"
        >
          Refresh Feed
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded p-6 space-y-4">
        <h2 className="text-lg font-semibold text-emerald-400">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm mb-2">Min Price</label>
            <input
              type="number"
              placeholder="$0"
              value={priceMin ?? ''}
              onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 bg-slate-700 text-slate-100 rounded border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Max Price</label>
            <input
              type="number"
              placeholder="$10000"
              value={priceMax ?? ''}
              onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 bg-slate-700 text-slate-100 rounded border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Location</label>
            <input
              type="text"
              placeholder="City, State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 text-slate-100 rounded border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Min ROI %</label>
            <input
              type="number"
              placeholder="0"
              value={roiMin ?? ''}
              onChange={(e) => setRoiMin(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 bg-slate-700 text-slate-100 rounded border border-slate-600"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setPriceMin(null);
                setPriceMax(null);
                setLocation('');
                setRoiMin(null);
              }}
              className="w-full px-3 py-2 bg-slate-700 text-slate-100 rounded border border-slate-600 hover:bg-slate-600 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-slate-400">
        Showing {filteredListings.length} of {listings.length} listings
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-slate-800 rounded overflow-hidden border border-slate-700 hover:border-emerald-500 transition">
            {/* Image */}
            <div className="w-full h-48 bg-slate-700 flex items-center justify-center text-slate-500">
              {listing.photoUrl ? (
                <img src={listing.photoUrl} alt={listing.title} className="w-full h-full object-cover" />
              ) : (
                '[Image]'
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Platform badge */}
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded">{listing.platform}</span>
                <span className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded">{listing.condition}</span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm line-clamp-2">{listing.title}</h3>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-emerald-400">${listing.currentPrice.toFixed(2)}</span>
              </div>

              {/* Location */}
              <p className="text-xs text-slate-400">{listing.location}</p>

              {/* ROI Highlight */}
              <div className="bg-emerald-900/30 border border-emerald-700 rounded p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Estimated Profit</span>
                  <span className="font-bold text-emerald-400">${listing.estimatedProfit.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">ROI</span>
                  <span className="font-bold text-emerald-400">{listing.roi}%</span>
                </div>
                <div className="text-xs text-slate-400">
                  Confidence: <span className="font-semibold">{listing.confidence}%</span>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={() => handleSave(listing.id)}
                className={`w-full py-2 rounded font-semibold transition ${
                  saved.has(listing.id)
                    ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    : 'bg-slate-700 text-slate-100 hover:bg-slate-600'
                }`}
              >
                {saved.has(listing.id) ? '✓ Saved' : 'Save to Inventory'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">No listings match your filters.</p>
          <p className="text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
