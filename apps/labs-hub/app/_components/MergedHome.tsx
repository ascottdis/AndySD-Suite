"use client";

import { useState } from "react";
import PortfolioHome from "./PortfolioHome";

export default function MergedHome() {
  const [showLegacy, setShowLegacy] = useState(false);

  return (
    <>
      <PortfolioHome />

      <div className="fixed bottom-6 right-6 z-60">
        <button
          onClick={() => setShowLegacy(true)}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
        >
          Open Legacy
        </button>
      </div>

      {showLegacy && (
        <div
          className="fixed inset-0 z-70 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setShowLegacy(false)}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowLegacy(false);
              }}
              className="px-3 py-2 rounded-full bg-white/5 border border-white/10"
            >
              Close
            </button>
          </div>

          <iframe
            src="/legacy/index.html"
            title="Legacy Portfolio"
            className="w-full h-full border-0 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
