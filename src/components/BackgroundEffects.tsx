"use client";

import { useEffect, useRef, useState, useCallback } from "react";



export default function BackgroundEffects() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  /* ── Responsive check ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Cursor Spotlight ── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || !spotlightRef.current) return;
      spotlightRef.current.style.left = `${e.clientX}px`;
      spotlightRef.current.style.top = `${e.clientY}px`;
      spotlightRef.current.style.opacity = "1";
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <>
      {/* Cinematic CSS gradient — replaces WebGL Dither */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(180deg, #050B18 0%, #07142A 40%, #091226 70%, #02060F 100%)
          `,
        }}
      />

      {/* Subtle aurora light layer */}
      <div className="aurora-gradient pointer-events-none z-0" aria-hidden="true" />

      {/* Cursor spotlight (desktop only) */}
      {!isMobile && (
        <div
          ref={spotlightRef}
          className="fixed z-[1] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
          aria-hidden="true"
          style={{
            width: 450,
            height: 450,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,140,26,0.035) 0%, rgba(246,183,60,0.015) 30%, transparent 70%)",
            opacity: 0,
          }}
        />
      )}
    </>
  );
}
