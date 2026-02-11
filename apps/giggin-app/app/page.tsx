
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function Home() {
  return (
    <div>
      <h1>Welcome to Giggin</h1>
      <p>Your gig planning command center.</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/gigs" style={{ 
          display: 'inline-block', 
          padding: '1rem 2rem', 
          background: '#0070f3', 
          color: '#fff', 
          borderRadius: '8px',
          textDecoration: 'none'
        }}>
          View Gigs →
        </a>
      </div>
    </div>
  );
}