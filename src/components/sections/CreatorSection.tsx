"use client";

import { MouseEvent } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { staggerItem } from "@/components/SectionWrapper";
import { siteConfig } from "@/lib/site.config";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FaYoutube, FaEye, FaGlobe, FaDiscord, FaFilm } from "react-icons/fa6";


import LiquidChrome from "@/components/ui/LiquidChrome";
import { MagicContainer, MagicCard } from "@/components/ui/MagicBento";
import StatCounter from "@/components/ui/StatCounter";

export default function CreatorSection() {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;
  
  // Mouse tracking for interactive gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const achievements = [
    { icon: FaYoutube, value: siteConfig.stats.subscribers, label: "YouTube Subscribers", color: "#FF0000", rgb: "255, 0, 0" },
    { icon: FaEye, value: siteConfig.stats.totalViews, label: "Total Views", color: "#f6b73c", rgb: "246, 183, 60" },
    { icon: FaGlobe, value: "50+", label: "Countries Reached", color: "#4299e1", rgb: "66, 153, 225" },
    { icon: FaDiscord, value: "2.9K+", label: "Discord Members", color: "#5865F2", rgb: "88, 101, 242" },
    { icon: FaFilm, value: "100+", label: "Original Videos", color: "#10B981", rgb: "16, 185, 129" },
  ];

  return (
    <div 
      className="relative group pb-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Base Global Gradient / Liquid Chrome for Section */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <LiquidChrome
          baseColor={[0.03, 0.05, 0.1]}
          speed={0.8}
          amplitude={0.4}
          interactive={!noMotion}
          style={{ opacity: 0.6 }} // Drop opacity slightly so text remains fully legible
        />
        
        {/* Cinematic gradient overlay to darken edges and blend chrome into the void */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, #02060F 0%, rgba(5,11,24,0.4) 15%, rgba(7,20,42,0.2) 50%, rgba(9,18,38,0.4) 85%, #02060F 100%)`,
          }}
        />
      </div>

      <SectionWrapper id="about" title="Who is HAYANURA?" subtitle="The shockingly unsugarcoated story behind the animations.">
        <MagicContainer className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">
          
          {/* Text Panels — 3/5 */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            variants={noMotion ? {} : staggerItem}
          >
            <MagicCard enableTilt={true} enableStars={true} className="p-6 sm:p-8 rounded-2xl bg-[#091020]/60 backdrop-blur-md border border-white/5 relative group/card shadow-2xl">
              {/* Subtle inner card hover layer for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              
              <p className="text-[17px] text-text-secondary leading-relaxed font-medium relative z-10">
                HAYANURA is less of a standard media channel and more of an ongoing, highly caffeinated attempt by an Indian boy to explain why the world is currently on fire—and exactly who is holding the match. 
                We produce <span className="text-saffron-400 font-semibold drop-shadow-md">animated geopolitical and historical narratives</span>, mostly because real-life global power struggles are far too chaotic to understand without a good visual aid and some dramatic lighting.
              </p>
            </MagicCard>

            <div className="flex flex-col gap-6">
              <MagicCard enableTilt={true} enableStars={true} className="p-6 sm:p-8 rounded-2xl bg-[#091020]/60 backdrop-blur-md border border-white/5 relative group/card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#101C35]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                <h4 className="text-white font-cinzel text-lg mb-3 tracking-wider text-saffron-300">No Sugarcoating</h4>
                <p className="text-[15px] sm:text-[16px] text-text-secondary/80 leading-relaxed relative z-10">
                  Built for an audience that prefers their history raw. From the Mauryan Empire flexing its muscles to the massive modern Indo-Pacific strategic headache, we turn incredibly dense geopolitical realities into cinematic stories that actually make sense (and look undeniably cool).
                </p>
              </MagicCard>

              <MagicCard enableTilt={true} enableStars={true} className="p-6 sm:p-8 rounded-2xl bg-[#091020]/60 backdrop-blur-md border border-white/5 relative group/card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#101C35]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                <h4 className="text-white font-cinzel text-lg mb-3 tracking-wider text-saffron-300">The Ultimate Goal</h4>
                <p className="text-[15px] sm:text-[16px] text-text-secondary/80 leading-relaxed relative z-10">
                  Whether investigating border tensions or trying to figure out why superpowers just can&apos;t behave, the goal is simple: build a politically mature generation of Bharat. Or at the very least, a generation that sounds obnoxiously smart at dinner parties.
                </p>
              </MagicCard>
            </div>
          </motion.div>

          {/* Stats cards — 2/5 */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-5 mt-4 lg:mt-0">
            {achievements.map((item, i) => (
              <motion.div
                key={item.label}
                initial={noMotion ? {} : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <MagicCard
                  enableTilt={true}
                  enableStars={false}
                  glowColor={item.rgb}
                  className="p-6 sm:p-8 rounded-2xl bg-[#091020]/80 backdrop-blur-xl border border-white/5 flex items-center gap-6 shadow-2xl relative group/stat"
                >
                  {/* Micro hover gradient passing through the stat card */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(120deg, transparent, ${item.color}08, transparent)`,
                    }}
                  />

                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/stat:scale-110 group-hover/stat:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                      boxShadow: `0 0 15px ${item.color}10 inset`
                    }}
                  >
                    <item.icon className="text-2xl drop-shadow-md" style={{ color: item.color }} />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                      <StatCounter value={item.value} />
                    </div>
                    <div className="text-[11px] sm:text-xs mt-1 uppercase tracking-[0.25em] text-text-muted font-medium">
                      {item.label}
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>

        </MagicContainer>
      </SectionWrapper>
    </div>
  );
}
