"use client";

import { useRef, useState, useCallback, memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaDiscord, FaCopy, FaCheck, FaCrown, FaHandshake, FaGlobe, FaCubes } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import GridDistortion from "@/components/ui/GridDistortion";
import { useMobile } from "@/hooks/useMobile";
import SectionWrapper from "@/components/SectionWrapper";

// Custom simple icons for bullet points
const IconNations = () => <FaCrown />;
const IconDiplomacy = () => <FaHandshake />;
const IconWar = () => <GiCrossedSwords size={20} />;

/* ── Constants ── */
const SERVER_IP = "mc.hayanura.in";
const DISCORD_LINK = "https://discord.gg/AQCH5ZRXT2";
const WEBSITE_LINK = "https://smp.hayanura.in";

const HayaSMPSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isVisible = useInView(sectionRef, { margin: "200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;


  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore err
    }
  }, []);

  const slideUp = noMotion
    ? {}
    : {
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    };

  return (
    <section
      ref={sectionRef}
      id="hayasmp"
      className={`hidden md:flex relative w-full overflow-hidden items-center justify-center font-inter pt-10 pb-4 ${!isVisible ? 'paused-animations' : ''}`}
      style={{

        backgroundColor: "#0b1120", // Deep dark base
        contentVisibility: "auto",
        contain: "layout paint",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      {/* ── Top Blur Fade for Seamless Transition ── */}
      <div className="absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-b from-[#0b1120] to-transparent z-[3] pointer-events-none" />

      {/* ── Bottom Blur Fade for Seamless Services Transition ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-[#02060F] to-transparent z-[3] pointer-events-none" />

      {/* ── Interactive WebGL Background (Paused out of view) ── */}
      <div className="absolute inset-0 z-[1] opacity-30">
        {!isMobile && (
          <GridDistortion
            imageSrc="/images/hayasmp/screenshot.png"
            grid={15}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
          />
        )}
      </div>

      {/* ── Ambient Radial Gradients (Adapted to Fiery Gold / Amber) ── */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.20),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(220,38,38,0.15),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(245,158,11,0.15),transparent_50%)] mix-blend-screen pointer-events-none" />

      {/* ── Main Two-Column Grid ── */}
      <motion.div
        className="relative z-[4] w-full max-w-[1240px] mx-auto px-6 py-[80px] md:py-[100px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        {...slideUp}
      >
        {/* ═══════════════════════════════
           LEFT COLUMN: Texts & Pills
           ═══════════════════════════════ */}
        <div className="flex flex-col items-start text-left space-y-8">
          <div className="w-full max-w-[520px]">
            {/* Logo and Title Lockup */}
            <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6 mb-6">
              <Image
                src="/images/hayasmp/logo.png"
                alt="HayaSMP Logo"
                width={80}
                height={80}
                className="object-contain h-[64px] xl:h-[76px] w-auto drop-shadow-lg shrink-0"
                loading="lazy"
              />
              <h2
                className="text-[32px] md:text-[42px] lg:text-[48px] xl:text-[54px] smp-title leading-[1.2]"
                style={{ fontFamily: "'Press Start 2P', system-ui" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-orange-500 drop-shadow-md">
                  HAYA
                </span>
                <span className="text-white ml-2 md:ml-4 tracking-tight drop-shadow-sm">
                  SMP
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-[22px] text-slate-300 leading-relaxed max-w-[500px]">
              A player-driven geopolitical Minecraft world. Build nations, form alliances, and dominate the landscape.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 w-full max-w-[420px]">
            {/* ── Feature Pills (Amber Glow) ── */}
            <div className="feature-pill group">
              <span className="text-amber-400 mr-3 text-lg"><IconNations /></span>
              Nations & Kingdoms
            </div>
            <div className="feature-pill group">
              <span className="text-blue-400 mr-3 text-lg"><IconDiplomacy /></span>
              Diplomacy & Alliances
            </div>
            <div className="feature-pill group">
              <span className="text-orange-500 mr-3 text-lg"><IconWar /></span>
              Wars & Conquest
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
           RIGHT COLUMN: Main Glass Card & Floating Chips
           ═══════════════════════════════ */}
        <div className="relative w-full flex justify-center lg:justify-end items-center mt-20 lg:mt-0">
          <div className="smp-card-wrapper w-full max-w-[540px]">
            {/* Strong Anchor Glow behind the card (Amber) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(245,158,11,0.25)_0%,transparent_60%)] blur-[50px] z-[0] pointer-events-none rounded-full" />

            {/* ----- FLOATING CHIPS ----- */}
            <div className="stat-chip crossplay">
              <div className="w-7 h-7 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center mr-3">
                <FaCubes className="text-sm" />
              </div>
              <span className="text-slate-200 font-semibold text-[15px]">Multiplatform</span>
              <span className="ml-3 text-amber-100 font-bold text-[15px]">Java + Bedrock</span>
            </div>

            <div className="stat-chip live-map">
              <span className="text-amber-500 text-lg mr-3"><FaGlobe /></span>
              <span className="text-amber-100 font-bold mr-2 text-[15px]">Live</span>
              <span className="text-slate-300 font-semibold text-[15px]">SMP Map Render</span>
            </div>

            {/* ── Main Glass Card ── */}
            <div className="smp-card w-full flex flex-col items-center">

              {/* Premium Screenshot Display inside the Card */}
              <div className="w-full relative rounded-[16px] overflow-hidden border border-white/10 shadow-2xl mb-8 group bg-black/50">
                <Image
                  src="/images/hayasmp/ssimg.png"
                  alt="HayaSMP World Screenshot"
                  width={640}
                  height={360}
                  className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-[1.05]"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Action Buttons */}
              <button
                className="join-btn w-full max-w-[340px] relative overflow-hidden group mb-4"
                onClick={() => window.open(WEBSITE_LINK, '_blank')}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <div className="relative z-10 font-bold tracking-wide flex items-center justify-center gap-2 text-white">
                  <span className="text-lg pb-1 text-amber-100">⌘</span> Visit HayaSMP Website
                </div>
              </button>

              <button
                className="discord-btn w-full max-w-[340px] relative overflow-hidden group"
                onClick={() => window.open(DISCORD_LINK, '_blank')}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <div className="relative z-10 font-bold tracking-wide flex items-center justify-center gap-2 text-red-100">
                  <FaDiscord className="text-lg" /> Join Discord
                </div>
              </button>

              {/* Online Indicator / Copy IP */}
              <div
                className="mt-8 flex items-center justify-center text-[15px] font-bold drop-shadow-md cursor-pointer group px-4 py-2 rounded-lg transition-colors hover:bg-white/5"
                onClick={handleCopy}
              >
                <span className="w-[10px] h-[10px] rounded-full bg-amber-500 mr-[10px] shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-pulse" />
                <div className="text-slate-300 group-hover:text-amber-400 transition-colors">
                  Server IP: <span className="font-mono text-amber-400 ml-1">{SERVER_IP}</span>
                </div>
                <div className="ml-4 text-slate-500 group-hover:text-amber-400">
                  {copied ? <FaCheck /> : <FaCopy />}
                </div>
              </div>

            </div>
          </div>
        </div>

      </motion.div>

      {/* ── Global & Scoped Styles ── */}
      <style jsx>{`
        .hayasmp-section {
          transform: translateZ(0);
        }
        .paused-animations, .paused-animations * {
          animation-play-state: paused !important;
        }
        .smp-title {

          text-shadow: 0 0 45px rgba(245,158,11,0.6);
        }

        .feature-pill {
          display: inline-flex;
          align-items: center;
          background: #1e293b;
          border: 1px solid rgba(245,158,11,0.3);
          padding: 14px 26px;
          border-radius: 14px;
          font-size: 17px;
          color: #e2e8f0;
          font-weight: 600;
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        .feature-pill:hover {
          transform: translateY(-4px);
          background: rgba(245,158,11,0.15); /* Warm amber low opacity */
          border-color: rgba(245,158,11,0.6);
          box-shadow: 0 10px 24px rgba(0,0,0,0.5), 0 0 20px rgba(245,158,11,0.2);
          color: white;
        }

        .smp-card-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stat-chip {
          position: absolute;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(245,158,11,0.4);
          border-radius: 14px;
          padding: 10px 18px;
          min-width: 170px;
          font-size: 14px;
          font-weight: 500;
          color: #cbd5e1;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(245,158,11,0.15);
          white-space: nowrap;
          pointer-events: none;
          z-index: 6;
          display: flex;
          align-items: center;
        }

        @keyframes chipFloat {
          0% { transform: translateY(0px) rotate(var(--tilt)); }
          50% { transform: translateY(-8px) rotate(var(--tilt)); }
          100% { transform: translateY(0px) rotate(var(--tilt)); }
        }

        .stat-chip.crossplay {
          top: -28px;
          right: -30px;
          --tilt: 4deg;
          animation: chipFloat 6s ease-in-out infinite;
        }

        .stat-chip.live-map {
          bottom: 25px;
          left: -80px;
          --tilt: -3deg;
          animation: chipFloat 7s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        /* Subtle connecting flow lines to the center */
        .stat-chip::before {
          content: "";
          position: absolute;
          z-index: -1;
          background: linear-gradient(90deg, rgba(245,158,11,0.5), transparent);
          height: 1px;
          width: 60px;
          opacity: 0;
          animation: pulseLine 4s infinite;
        }

        @keyframes pulseLine {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }

        .stat-chip.crossplay::before {
          left: -40px;
          bottom: -15px;
          transform: rotate(120deg);
        }
        
        .stat-chip.live-map::before {
          right: -50px;
          top: 50%;
          transform: rotate(180deg);
          animation-delay: 2s;
        }

        @media (max-width: 900px) {
          .stat-chip {
            display: none;
          }
        }

        .smp-card {
          background: linear-gradient(150deg, rgba(15,23,42,0.85) 0%, rgba(9,14,24,0.98) 100%);
          backdrop-filter: blur(12px);
          border-radius: 26px;
          border: 1px solid rgba(245,158,11,0.3);
          border-top-color: rgba(251,191,36,0.5);
          border-left-color: rgba(245,158,11,0.4);
          padding: 40px 30px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.08);
          position: relative;
          z-index: 4;
        }

        .join-btn {
          background: linear-gradient(90deg, #d97706, #92400e);
          border: 1px solid rgba(251,191,36,0.3);
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 17px;
          color: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(245,158,11,0.3), inset 0 1px 1px rgba(255,255,255,0.2);
        }

        .join-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 40px rgba(245,158,11,0.5), inset 0 1px 1px rgba(255,255,255,0.3);
        }

        .discord-btn {
          background: rgba(127, 29, 29, 0.4); /* Dark Red */
          border: 1px solid rgba(239, 68, 68, 0.4); /* Brighter red border */
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 17px;
          color: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .discord-btn:hover {
          background: rgba(153, 27, 27, 0.8);
          border-color: rgba(239, 68, 68, 0.7);
          box-shadow: 0 10px 30px rgba(220,38,38,0.3);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};


const MemoizedHayaSMPSection = memo(HayaSMPSection);
export default MemoizedHayaSMPSection;


