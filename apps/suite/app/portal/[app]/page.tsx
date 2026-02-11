import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ app: string }>;
}

export default async function PortalAppPage({ params }: Props) {
  const { app } = await params;

  // Render your portal content
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-8 gradient-text">
          {app.toUpperCase()} PORTAL
        </h1>
        <p className="text-xl text-zinc-400">
          Welcome to the {app} system interface.
        </p>
      </div>
    </main>
  );
}