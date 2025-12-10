'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewGigPage() {
  const router = useRouter();
  const [provider, setProvider] = useState('');
  const [payout, setPayout] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4002/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          payout: Number(payout),
          address,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create gig');
      }

      router.push('/gigs');
    } catch (err) {
      setError('Failed to create gig. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginTop: '0.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '1rem',
    fontWeight: 500 as const,
  };

  return (
    <div>
      <h1>Add New Gig</h1>

      {error && (
        <div style={{ padding: '1rem', background: '#fee', color: '#c00', borderRadius: '6px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <label style={labelStyle}>
          Provider (e.g., DoorDash, Instacart)
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            required
            style={inputStyle}
            placeholder="DoorDash"
          />
        </label>

        <label style={labelStyle}>
          Payout ($)
          <input
            type="number"
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            required
            min="1"
            style={inputStyle}
            placeholder="15"
          />
        </label>

        <label style={labelStyle}>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={inputStyle}
            placeholder="123 Main St, City"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: loading ? '#ccc' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating...' : 'Create Gig'}
        </button>
      </form>
    </div>
  );
}