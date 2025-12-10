async function getGigs() {
  const res = await fetch('http://localhost:4002/gigs', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch gigs');
  return res.json();
}

export default async function GigsPage() {
  const data = await getGigs();
  const gigs = data.gigs || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Gigs</h1>
        <a href="/gigs/new" style={{ 
          padding: '0.5rem 1rem', 
          background: '#0070f3', 
          color: '#fff', 
          borderRadius: '6px',
          textDecoration: 'none'
        }}>
          + Add Gig
        </a>
      </div>

      {gigs.length === 0 ? (
        <p>No gigs yet. Add one!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          {gigs.map((gig: any) => (
            <a 
              key={gig.id} 
              href={`/gigs/${gig.id}`}
              style={{
                display: 'block',
                padding: '1rem',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{gig.provider}</strong>
                <span style={{ color: '#0a0', fontWeight: 'bold' }}>${gig.payout}</span>
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {gig.address}
              </div>
              <div style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.8rem', 
                color: gig.status === 'completed' ? '#0a0' : '#f90' 
              }}>
                Status: {gig.status}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}