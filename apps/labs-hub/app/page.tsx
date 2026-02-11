// app/page.tsx
import "./globals.css";
import { Hero } from "../components/marketing/hero";
import { BentoGrid } from "../components/marketing/bentogrid";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <Hero />
      <BentoGrid />
    </main>
  );
}
