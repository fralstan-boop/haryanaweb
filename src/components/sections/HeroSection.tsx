"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import GlowButton from "@/components/GlowButton";
import StatCounter from "@/components/ui/StatCounter";
import { FaYoutube } from "react-icons/fa6";
import dynamic from "next/dynamic";

const Balatro = dynamic(() => import("@/components/ui/Balatro"), { ssr: false });

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 120px)", paddingTop: "120px" }}
    >
      {/* ── Balatro WebGL background ── */}
      {!isMobile && !noMotion ? (
        <div className="absolute inset-0 -z-10">
          <Balatro
            isRotate={false}
            mouseInteraction={false}
            pixelFilter={1760}
            spinRotation={-1.5}
            spinSpeed={4.5}
            contrast={2.8}
            lighting={0.35}
            spinAmount={0.2}
            color1="#ff8228"
            color2="#006BB4"
            color3="#162325"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(255,130,40,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 55%, rgba(0,107,180,0.10) 0%, transparent 50%), linear-gradient(180deg, #081326 0%, #0c1a33 50%, #081326 100%)",
          }}
        />
      )}

      {/* ── Cinematic dark overlay ── */}
      <div
        className="absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(9,18,38,0.25), rgba(9,18,38,0.9))",
        }}
      />

      {/* ── Top glowing star accent ── */}
      <motion.div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(246,183,60,0.9) 0%, rgba(255,140,26,0.3) 40%, transparent 70%)",
          boxShadow: "0 0 30px 10px rgba(246,183,60,0.25), 0 0 60px 20px rgba(255,140,26,0.1)",
        }}
        initial={noMotion ? {} : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: noMotion ? 0 : 1.5, delay: noMotion ? 0 : 0.2 }}
        aria-hidden="true"
      />

      {/* ── Hero content ── */}
      <div 
        className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
        style={{ marginTop: "20px" }}
      >
        {/* Title — Cinzel serif */}
        <motion.h1
          className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-[0.06em] leading-[0.95]"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #f6e4b8 30%, #f6b73c 70%, #c48820 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 15px rgba(255,170,80,0.15)) drop-shadow(0 0 30px rgba(255,170,80,0.05))",
          }}
          initial={fi(0)}
          animate={fa}
          transition={ft(0.3)}
        >
          Hayanura
        </motion.h1>

        {/* Thin gold line under title */}
        <motion.div
          className="mx-auto mt-5 h-px max-w-[280px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(246,183,60,0.5), rgba(255,140,26,0.6), rgba(246,183,60,0.5), transparent)",
          }}
          initial={fi(0.35)}
          animate={fa}
          transition={ft(0.35)}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-[13px] sm:text-sm tracking-[0.35em] uppercase font-medium"
          style={{ color: "rgba(246,183,60,0.75)" }}
          initial={fi(0.4)}
          animate={fa}
          transition={ft(0.4)}
        >
          Geopolitics &nbsp;•&nbsp; History &nbsp;•&nbsp; Strategy
        </motion.p>

        {/* Mission statement — italic serif quote */}
        <motion.p
          className="mt-8 font-cinzel italic text-lg sm:text-xl leading-relaxed max-w-lg mx-auto"
          style={{ color: "rgba(230,225,215,0.55)" }}
          initial={fi(0.5)}
          animate={fa}
          transition={ft(0.5)}
        >
          &ldquo;Just an Indian boy attempting to build a
          <br />
          politically mature generation of Bharat.&rdquo;
        </motion.p>

        {/* Stats with vertical divider */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-0"
          initial={fi(0.6)}
          animate={fa}
          transition={ft(0.6)}
        >
          {/* Subscribers */}
          <div className="px-8 sm:px-12 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
              <StatCounter value={siteConfig.stats.subscribers} />
            </div>
            <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium" style={{ color: "rgba(230,225,215,0.45)" }}>
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
          <div className="px-8 sm:px-12 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
              <StatCounter value={siteConfig.stats.totalViews} />
            </div>
            <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium" style={{ color: "rgba(230,225,215,0.45)" }}>
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

        {/* Ashoka Chakra decorative divider */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-0"
          initial={fi(0.8)}
          animate={fa}
          transition={ft(0.8)}
          aria-hidden="true"
        >
          <div
            className="h-px w-20 sm:w-28"
            style={{ background: "linear-gradient(90deg, transparent, rgba(246,183,60,0.3))" }}
          />
          {/* Chakra ornament */}
          <svg width="28" height="28" viewBox="0 0 28 28" className="mx-3 opacity-40">
            <circle cx="14" cy="14" r="12" fill="none" stroke="rgba(246,183,60,0.5)" strokeWidth="0.5" />
            <circle cx="14" cy="14" r="7" fill="none" stroke="rgba(246,183,60,0.4)" strokeWidth="0.5" />
            <circle cx="14" cy="14" r="2" fill="rgba(246,183,60,0.4)" />
            {/* 8 spokes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={14 + Math.cos(a) * 3}
                  y1={14 + Math.sin(a) * 3}
                  x2={14 + Math.cos(a) * 11.5}
                  y2={14 + Math.sin(a) * 11.5}
                  stroke="rgba(246,183,60,0.35)"
                  strokeWidth="0.4"
                />
              );
            })}
            {/* 4 diamond accents */}
            {[0, 90, 180, 270].map((deg) => {
              const a = (deg * Math.PI) / 180;
              const cx = 14 + Math.cos(a) * 12;
              const cy = 14 + Math.sin(a) * 12;
              return (
                <circle
                  key={deg}
                  cx={cx}
                  cy={cy}
                  r="1"
                  fill="rgba(246,183,60,0.45)"
                />
              );
            })}
          </svg>
          <div
            className="h-px w-20 sm:w-28"
            style={{ background: "linear-gradient(90deg, rgba(246,183,60,0.3), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
