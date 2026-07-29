"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import GlowButton from "@/components/GlowButton";
import StatCounter from "@/components/ui/StatCounter";
import { FaYoutube } from "react-icons/fa6";
import { useMobile } from "@/hooks/useMobile";
import dynamic from "next/dynamic";

const Balatro = dynamic(() => import("@/components/ui/Balatro"), { ssr: false });

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;

  const isMobile = useMobile();
  const [startWebGL, setStartWebGL] = useState(false);

  useEffect(() => {
    // Defer heavy WebGL shader compilation until after first paint
    const timer = setTimeout(() => setStartWebGL(true), 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fi = (d: number) => (noMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 });
  const fa = { opacity: 1, y: 0 };
  const ft = (d: number) => ({
    duration: noMotion ? 0 : 1.0,
    delay: noMotion ? 0 : d,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden min-h-screen"
      style={{ paddingTop: "130px", paddingBottom: "60px" }}
    >
      {/* ── Balatro WebGL background ── */}
      {/* ── Static Fallback (Always rendered instantly) ── */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(255,130,40,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 55%, rgba(0,107,180,0.10) 0%, transparent 50%), linear-gradient(180deg, #081326 0%, #0c1a33 50%, #081326 100%)",
        }}
      />

      {/* ── Balatro WebGL background ── */}
      {startWebGL && !noMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 -z-10"
        >
          <Balatro
            isRotate={false}
            mouseInteraction={false}
            pixelFilter={1760}
            spinRotation={-1.5}
            spinSpeed={4.5}
            contrast={2.8}
            lighting={0.35}
            spinAmount={0.2}
            color1="#FF8228"
            color2="#006BB4"
            color3="#162325"
          />
        </motion.div>
      )}

      {/* ── Cinematic dark overlay ── */}
      <div
        className="absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(9,18,38,0.25), rgba(9,18,38,0.85))",
        }}
      />





      {/* ── Hero content ── */}
      <div
        className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
        style={{ marginTop: "20px" }}
      >
        {/* Title — Ethereal Metallic + Custom Shadow Halo */}
        <motion.div
          className="relative inline-block w-full"
          initial={fi(0)}
          animate={fa}
          transition={ft(0.3)}
        >
          {/* Deep Ambient Shadow (Perfect Letter-Hugging Halo) */}
          <h1
            aria-hidden="true"
            className="absolute inset-0 font-garamond text-4xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-semibold uppercase tracking-[0.08em] leading-[0.95] text-black/60 blur-md select-none"
            style={{
              WebkitTextStroke: "8px rgba(0,0,0,0.4)",
            }}
          >
            Hayanura
          </h1>
          
          {/* Main Metallic Text Layer */}
          <h1
            id="hero-heading"
            className="relative font-garamond text-4xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-semibold uppercase tracking-[0.08em] leading-[0.95]"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #FDE68A 25%, #D4AF37 60%, #996515 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Hayanura
          </h1>
        </motion.div>

        {/* Thin gold & platinum line under title */}
        <motion.div
          className="mx-auto mt-5 h-px max-w-[280px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), rgba(246,183,60,0.9), rgba(255,255,255,0.7), transparent)",
            filter: "drop-shadow(0 0 10px rgba(246,183,60,0.4))",
          }}
          initial={fi(0.35)}
          animate={fa}
          transition={ft(0.35)}
          aria-hidden="true"
        />

        {/* Subtitle — Luminous white with gold accent dots */}
        <motion.p
          className="mt-6 text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.35em] uppercase font-medium whitespace-nowrap text-white"
          style={{ 
            textShadow: "0 2px 10px rgba(0,0,0,0.9), 0 0 16px rgba(246,183,60,0.3)",
          }}
          initial={fi(0.4)}
          animate={fa}
          transition={ft(0.4)}
        >
          Animation &nbsp;<span className="text-[#f6b73c]">•</span>&nbsp; Awareness &nbsp;<span className="text-[#f6b73c]">•</span>&nbsp; Geopolitics
        </motion.p>

        {/* Stats with vertical divider */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-0"
          initial={fi(0.6)}
          animate={fa}
          transition={ft(0.6)}
        >
          {/* Subscribers */}
          <div className="px-4 sm:px-8 md:px-12 text-center overflow-hidden">
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight truncate">
              <StatCounter value={siteConfig.stats.subscribersShort} />
            </div>
            <div className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.25em] font-medium truncate" style={{ color: "rgba(230,225,215,0.45)" }}>
              Subscribers
            </div>
          </div>

          {/* Vertical divider */}
          <div
            className="w-px h-14 sm:h-16 flex-shrink-0"
            style={{
              background: "linear-gradient(180deg, transparent, rgba(246,183,60,0.35), transparent)",
            }}
          />

          {/* Total Views */}
          <div className="px-4 sm:px-8 md:px-12 text-center overflow-hidden">
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight truncate">
              <StatCounter value={siteConfig.stats.totalViewsShort} />
            </div>
            <div className="mt-1 text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.25em] font-medium truncate" style={{ color: "rgba(230,225,215,0.45)" }}>
              Total Views
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={fi(0.7)}
          animate={fa}
          transition={ft(0.7)}
        >
          <GlowButton href={siteConfig.links.youtube} external variant="primary">
            <FaYoutube className="text-lg" />
            Watch Channel
          </GlowButton>
          <GlowButton href="#work" variant="secondary">
            Explore the Work
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
