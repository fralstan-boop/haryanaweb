"use client";

import { useRef, useEffect, useState, memo } from "react";
import { siteConfig } from "@/lib/site.config";
import { motion, useReducedMotion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { FaDiscord, FaFire, FaCommentDots, FaCheck, FaHandHoldingHeart, FaCalendarDays, FaNewspaper } from "react-icons/fa6";
import CountUp from "react-countup";
import { useDiscordStats } from "@/hooks/useDiscordStats";

import GridMotion from '@/components/ui/GridMotion';

const CommunitySection = () => {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(sectionRef, { margin: "200px 0px" });


  // Live Discord Stats
  const stats = useDiscordStats();

  return (
    <section
      id="community"
      ref={sectionRef}
      className={`hidden md:flex relative w-full overflow-hidden bg-[#0b1120] community-section items-center justify-center font-inter ${!isVisible ? 'paused-animations' : ''}`}
      style={{ contentVisibility: 'auto', contain: 'layout paint' }}
    >
      {/* 10. Top Blur Fade for Seamless Hero Transition */}
      <div className="absolute top-[0px] left-0 right-0 h-[140px] bg-gradient-to-b from-[#02060F] to-transparent z-[3] pointer-events-none" />

      {/* Bottom Blur Fade for Seamless SMP Transition */}
      <div className="absolute bottom-[0px] left-0 right-0 h-[160px] bg-gradient-to-t from-[#0b1120] to-transparent z-[3] pointer-events-none" />

      {/* NEW: Interactive GSAP Background */}
      <div className="absolute inset-0 z-[1] w-full h-full pointer-events-none overflow-hidden">
        <GridMotion
          maxRows={5}
          gradientColor="#0b1120"
          items={[
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "DEFENCE INTELLIGENCE",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "GEOPOLITICS",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "OPEN SOURCE INTEL",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "STRATEGY",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "GLOBAL ANALYSIS",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "TACTICAL",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "THREAT MODELING",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "COMMUNITY DEBATES",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "MILITARY TECH",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "LOGISTICS",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "CYBER SECURITY",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "AEROSPACE",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "NAVAL OPS",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "DATA ANALYSIS",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "SPECIAL FORCES",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "INTELLIGENCE",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "STRATEGIC PLANNING",
            "https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ]}
        />
      </div>

      {/* 2. Stronger Ambient Radial Gradients (Kept to blend the new grid in) */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.25),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(139,92,246,0.2),transparent_50%)] mix-blend-screen pointer-events-none" />

      {/* MAIN TWO-COLUMN GRID */}
      <div className="relative z-[4] w-full max-w-[1300px] mx-auto px-6 pt-24 md:pt-32 lg:pt-40 pb-[80px] md:pb-[120px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* LEFT COLUMN: Texts & Pills */}
        <div className="flex flex-col items-start text-left space-y-8">
          <div>
            {/* 11. Larger Typography Hierarchy */}
            <h2 className="text-6xl md:text-7xl lg:text-[72px] font-extrabold tracking-wide text-white mb-4 community-title leading-[1.1]">
              COMMUNITY
            </h2>
            <p className="text-xl md:text-[22px] text-slate-300 leading-relaxed max-w-[500px]">
              A community for the geopolitically curious - debates, fun and enjoy a Bhartiya  enthusiasm
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 w-full max-w-[400px]">
            {/* 4. Energetic Feature Pills */}
            <div className="feature-pill group">
              <span className="mr-3 text-[22px] leading-none">🇮🇳</span>
              Bhartiya Community
            </div>
            <div className="feature-pill group">
              <span className="text-fuchsia-400 mr-3 text-lg"><FaHandHoldingHeart /></span>
              Safe & Non-Toxic Environment
            </div>
            <div className="feature-pill group">
              <span className="text-emerald-400 mr-3 text-lg"><FaCalendarDays /></span>
              Regular Events
            </div>
            <div className="feature-pill group">
              <span className="text-fuchsia-400 mr-3 text-lg"><FaNewspaper /></span>
              News and Discussions
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Discord Card & Floating Chips Wrapper */}
        <div className="relative w-full flex justify-center lg:justify-end items-center mt-20 lg:mt-0">

          <div className="community-card-wrapper w-full max-w-[500px]">
            {/* 3. Strong Anchor Glow behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(99,102,241,0.38)_0%,transparent_60%)] blur-[50px] z-[0] pointer-events-none rounded-full" />

            {/* subtle intense beam directly behind card */}
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.5)_0%,transparent_70%)] blur-[40px] z-[1] pointer-events-none" />

            {/* ----- FLOATING CHIPS ----- */}
            <div className="stat-chip debates">
              <span className="text-amber-500 text-lg mr-3"><FaFire /></span>
              <span className="text-white font-bold mr-2 text-[15px]">23</span>
              <span className="text-slate-300 font-semibold text-[15px]">Active Debates</span>
            </div>

            <div className="stat-chip messages">
              <div className="w-7 h-7 rounded-md bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mr-3">
                <FaCommentDots className="text-sm" />
              </div>
              <span className="text-slate-200 font-semibold text-[15px]">Messages Today</span>
              <span className="ml-3 text-white font-bold text-[15px]">591</span>
            </div>

            <div className="stat-chip online">
              <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center mr-3">
                <FaCheck className="text-sm" />
              </div>
              <span className="text-slate-200 font-semibold text-[15px]">Online Now</span>
              <span className="ml-3 text-white font-bold text-[15px]">
                <CountUp end={stats.online} duration={1.2} separator="," enableScrollSpy={true} scrollSpyOnce={true} />
              </span>
            </div>

            {/* Discord Main Card */}
            <div ref={cardRef} className="discord-card w-full flex flex-col items-center text-center">

              {/* 6. Intensely Glowing Hexagon/Circle Discord Icon */}
              <div className="discord-icon mb-8">
                <FaDiscord className="text-[44px] text-white" />
              </div>

              {/* 12. Flex Baseline Members Text */}
              <div className="flex items-baseline justify-center gap-2 sm:gap-[12px] mb-3">
                <span className="text-4xl sm:text-6xl md:text-[72px] font-black text-white tracking-tight leading-none drop-shadow-lg flex items-baseline">
                  <CountUp end={stats.members} duration={1.2} separator="," enableScrollSpy={true} scrollSpyOnce={true} />+
                </span>
                <span className="text-xl sm:text-[32px] font-bold text-slate-300 leading-none">
                  Members
                </span>
              </div>

              <p className="text-slate-300 font-medium text-[16px] leading-[1.6] mb-10 px-6 max-w-[420px]">
                Join analysts, enthusiasts, and curious minds discussing geopolitics, defence, and strategy!
              </p>

              {/* 7. Premium Action Button Area */}
              <button
                className="join-btn w-[90%] max-w-[340px] relative overflow-hidden group"
                onClick={() => window.open(siteConfig.links.discord, '_blank')}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold tracking-wide">Join the Community</span>
              </button>

              {/* Online Indicator */}
              <div className="mt-6 flex items-center justify-center text-[15px] text-emerald-400 font-bold drop-shadow-md">
                <span className="w-[10px] h-[10px] rounded-full bg-emerald-500 mr-[10px] shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
                {stats.online.toLocaleString()} Online Now
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Global & Scoped Styles */}
      <style jsx>{`
        .community-section {
          transform: translateZ(0);
        }
        .paused-animations, .paused-animations * {
          animation-play-state: paused !important;
        }
        .community-title {
          text-shadow: 0 0 35px rgba(99,102,241,0.6);
          font-family: 'Inter', sans-serif;
        }

        .feature-pill {
          display: inline-flex;
          align-items: center;
          background: #1e293b;
          border: 1px solid rgba(99,102,241,0.3);
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
          background: #2b3a55;
          border-color: rgba(99,102,241,0.6);
          box-shadow: 0 10px 24px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.15);
          color: white;
        }

        .community-card-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stat-chip {
          position: absolute;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(99, 102, 241, 0.35);
          border-radius: 14px;
          padding: 10px 18px;
          min-width: 170px;
          font-size: 14px;
          font-weight: 500;
          color: #cbd5e1;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 12px rgba(99, 102, 241, 0.2);
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

        .stat-chip.debates {
          top: 55%;
          left: -110px;
          --tilt: 4deg;
          animation: chipFloat 7s ease-in-out infinite;
        }

        .stat-chip.messages {
          top: -28px;
          right: 40px;
          --tilt: -6deg;
          animation: chipFloat 6s ease-in-out infinite;
          animation-delay: 1s;
        }

        .stat-chip.online {
          bottom: -26px;
          right: 30px;
          --tilt: -3deg;
          animation: chipFloat 5.5s ease-in-out infinite;
          animation-delay: 2s;
        }

        /* Subtle connecting flow lines to the center */
        .stat-chip::before {
          content: "";
          position: absolute;
          z-index: -1;
          background: linear-gradient(90deg, rgba(99,102,241,0.5), transparent);
          height: 1px;
          width: 60px;
          opacity: 0;
          animation: pulseLine 4s infinite;
        }

        @keyframes pulseLine {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }

        .stat-chip.debates::before {
          right: -50px;
          top: 50%;
        }
        
        .stat-chip.messages::before {
          left: -40px;
          bottom: -15px;
          transform: rotate(120deg);
          animation-delay: 1.5s;
        }

        .stat-chip.online::before {
          left: -40px;
          top: -15px;
          transform: rotate(-120deg);
          animation-delay: 3s;
        }

        @media (max-width: 900px) {
          .stat-chip {
            display: none;
          }
        }

        .discord-card {
          background: linear-gradient(150deg, rgba(15,23,42,0.85) 0%, rgba(9,14,24,0.98) 100%);
          backdrop-filter: blur(12px);
          border-radius: 26px;
          border: 1px solid rgba(99,102,241,0.4);
          border-top-color: rgba(139,92,246,0.6);
          border-left-color: rgba(99,102,241,0.5);
          padding: 55px 30px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.08);
          position: relative;
          min-height: 480px; 
          z-index: 4;
        }

        .discord-icon {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 35px rgba(99,102,241,0.8), 0 0 70px rgba(99,102,241,0.4), inset 0 2px 5px rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .join-btn {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 14px;
          padding: 18px 36px;
          font-size: 19px;
          color: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(99,102,241,0.5), inset 0 1px 1px rgba(255,255,255,0.2);
        }

        .join-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 15px 40px rgba(99,102,241,0.65), inset 0 1px 1px rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  );
};

const MemoizedCommunitySection = memo(CommunitySection);
export default MemoizedCommunitySection;



