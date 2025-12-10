import "./globals.css";
import "./portfolio.css";

import type { Metadata } from "next";
import { Orbitron, Lexend_Deca, Playfair_Display, Poppins, Bangers } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-orbitron", display: "swap" });
const lexend = Lexend_Deca({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-lexend", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"], variable: "--font-playfair", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-poppins", display: "swap" });
const bangers = Bangers({ subsets: ["latin"], weight: ["400"], variable: "--font-bangers", display: "swap" });

export const metadata: Metadata = {
  title: "AndySD | Cinematic Portfolio",
  description: "Cinematic, intelligent tools for clarity, wellness, creativity, and mastery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        orbitron.variable,
        lexend.variable,
        playfair.variable,
        poppins.variable,
        bangers.variable,
      ].join(" ")}
    >
      <body className="bg-[#050507] text-white antialiased">{children}</body>
    </html>
  );
}
