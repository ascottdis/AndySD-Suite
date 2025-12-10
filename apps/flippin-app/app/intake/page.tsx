'use client';

import { useState } from 'react';

export default function Intake() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [draft, setDraft] = useState<any>(null);
  const [extracting, setExtracting] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = Array.from(files).map((f) => URL.createObjectURL(f));
    setPhotos([...photos, ...newPhotos]);
  };

  const handleExtract = async () => {
    if (photos.length === 0) {
      alert('Please upload at least one photo');
      return;
    }

    setExtracting(true);
    try {
      // Call backend extraction API (will implement in Fastify backend)
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoCount: photos.length }),
      });
      const data = await response.json();
      setDraft(data);
    } catch (err) {
      console.error('Extraction failed:', err);
      // Fallback mock for demo
      setDraft({
        brand: 'Sample Brand',
        model: 'Sample Model',
        condition: 'Good',
        suggestedTitle: 'Sample Item - Like New',
        suggestedPrice: 49.99,
        confidence: 92,
      });
    } finally {
      setExtracting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold text-emerald-400 mb-2">Photo Intake</h1>
        <p className="text-slate-300">Snap 2–8 photos. AI builds your listing draft instantly.</p>
      </div>

      {/* Photo Upload */}
      <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id="photo-input"
        />
        <label htmlFor="photo-input" className="cursor-pointer">
          <div className="text-6xl mb-4">📷</div>
          <div className="text-xl font-bold text-emerald-400 mb-2">Drop photos or click to upload</div>
          <div className="text-sm text-slate-400">Front, back, tag, label, serial, defects</div>
        </label>
      </div>

      {/* Photo Preview */}
      {photos.length > 0 && (
        <div>
          <div className="text-sm text-slate-400 mb-4">{photos.length} photo(s) selected</div>
          <div className="grid grid-cols-4 gap-4">
            {photos.map((url, i) => (
              <div key={i} className="relative bg-slate-700 rounded-lg overflow-hidden aspect-square">
                <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extract Button */}
      <button
        onClick={handleExtract}
        disabled={extracting || photos.length === 0}
        className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-600 text-slate-900 font-bold py-3 rounded-lg transition"
      >
        {extracting ? 'AI Extracting...' : `Extract from ${photos.length} Photo(s)`}
      </button>

      {/* Draft Preview */}
      {draft && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-emerald-400">AI Draft</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400">Brand</label>
              <input
                type="text"
                defaultValue={draft.brand}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Model</label>
              <input
                type="text"
                defaultValue={draft.model}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Condition</label>
              <select className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white">
                <option>Mint</option>
                <option selected>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400">AI Confidence</label>
              <div className="mt-1 text-emerald-400 font-bold">{draft.confidence}%</div>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400">Suggested Title</label>
            <input
              type="text"
              defaultValue={draft.suggestedTitle}
              className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400">Suggested Price</label>
              <input
                type="number"
                defaultValue={draft.suggestedPrice}
                className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
              />
            </div>
          </div>

          <button className="w-full bg-lime-600 hover:bg-lime-500 text-slate-900 font-bold py-2 rounded-lg transition">
            Proceed to Pricing & Listing →
          </button>
        </div>
      )}
    </div>
  );
}
