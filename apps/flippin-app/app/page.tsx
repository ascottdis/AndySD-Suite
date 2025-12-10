'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /feed as the primary entry point
    router.push('/feed');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-slate-400">Redirecting to feed...</p>
    </div>
  );
}

