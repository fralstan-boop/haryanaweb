"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Dither = dynamic(() => import("@/components/ui/Dither"), { ssr: false });

export default function DitherBackground() {
  const [isMobile, setIsMobile] = useState(true);
  const [noMotion, setNoMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setNoMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (isMobile || noMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, top: "100vh" }}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ height: "900vh" }}>
        <Dither
          waveColor={[0.05, 0.1, 0.2]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.25}
          colorNum={4}
          waveAmplitude={0.25}
          waveFrequency={2.5}
          waveSpeed={0.03}
          pixelSize={2}
        />
      </div>
      {/* Dark overlay to keep text readable */}
      <div
        className="absolute inset-0"
        style={{
          height: "900vh",
          background: "rgba(5,11,24,0.55)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
