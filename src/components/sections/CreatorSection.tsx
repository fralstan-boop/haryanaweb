"use client";

import { MouseEvent, useRef, useState, useEffect } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { staggerItem } from "@/components/SectionWrapper";
import { siteConfig } from "@/lib/site.config";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useMobile } from "@/hooks/useMobile";
import { FaYoutube, FaEye, FaClock, FaDiscord, FaFilm } from "react-icons/fa6";

import LiquidChrome from "@/components/ui/LiquidChrome";
import { MagicContainer, MagicCard } from "@/components/ui/MagicBento";
import StatCounter from "@/components/ui/StatCounter";
import { useDiscordStats } from "@/hooks/useDiscordStats";

// Structured data lives outside the component so it never re-serializes on
// re-render. This is what search crawlers and AI answer engines (AEO/LLMEO)
// actually parse, it should mirror the visible copy below word for word so
// there's no mismatch between what a bot reads and what a person reads.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hayanura",
  alternateName: "HAYANURA",
  url: "https://hayanura.in",
  jobTitle: "Video Editor, Motion Graphics Animator & Geopolitical Content Creator",
  description:
    "Hayanura is a solo Indian video editor and motion graphics animator who researches, scripts, and animates every video on his geopolitics and history channel by himself.",
  knowsAbout: [
    "Geopolitics",
    "Military Strategy",
    "Indian Foreign Policy",
    "World History",
    "Motion Graphics",
    "Video Editing",
    "Cartography",
  ],
  sameAs: [
    "https://youtube.com/@hayanura",
    "https://instagram.com/hayanura",
  ],
  nationality: {
    "@type": "Country",
    name: "India",
  },
};

export default function CreatorSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;
  const discordStats = useDiscordStats();

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
    { icon: FaClock, value: "900+", label: "Hours Edited", color: "#4299e1", rgb: "66, 153, 225" },
    { icon: FaDiscord, value: discordStats.members ? discordStats.members.toLocaleString() : "2.9K+", label: "Discord Members", color: "#5865F2", rgb: "88, 101, 242" },
    { icon: FaFilm, value: "222", label: <>Original Videos<br /><span className="text-[10px] text-white/50 font-normal">Insta + YT</span></>, color: "#10B981", rgb: "16, 185, 129" },
  ];

  return (
    <div
      className="relative group pb-2 overflow-hidden"
      onMouseMove={handleMouseMove}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Structured data for search crawlers and AI answer engines. Hidden
          from view but kept in sync with the visible bio text below. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <meta itemProp="name" content="Hayanura" />
      <meta itemProp="jobTitle" content="Video Editor & Motion Graphics Animator" />
      <meta itemProp="url" content="https://hayanura.in" />

      {/* Base Global Gradient / Liquid Chrome for Section */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {!isMobile && (
          <LiquidChrome
            baseColor={[0.03, 0.05, 0.1]}
            speed={0.8}
            amplitude={0.4}
            interactive={!noMotion}
            style={{ opacity: 0.6 }} // Drop opacity slightly so text remains fully legible
          />
        )}

        {/* Cinematic gradient overlay to darken edges and blend chrome into the void */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, #02060F 0%, rgba(5,11,24,0.4) 15%, rgba(7,20,42,0.2) 50%, rgba(9,18,38,0.4) 85%, #02060F 100%)`,
          }}
        />
      </div>

      <SectionWrapper
        id="about"
        title="Who is HAYANURA?"
        subtitle="One editor, one timeline, no ghostwriters. Here's the actual story."
      >
        <MagicContainer className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">

          {/* Text Panels: 3/5 */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            variants={noMotion ? {} : staggerItem}
          >
            <MagicCard enableTilt={true} enableStars={true} className="p-6 sm:p-8 rounded-2xl bg-[#091020]/60 backdrop-blur-md border border-white/5 relative group/card shadow-2xl">
              {/* Subtle inner card hover layer for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              <div
                className="text-[17px] text-text-secondary leading-relaxed font-medium relative z-10"
                itemProp="description"
              >
                Hayanura started the way most obsessions do: a kid in Bharat messed around with an editing app and couldn't put it down. That habit turned into a full channel built around geopolitics, military strategy, and world history, and it now reaches{" "}
                <span itemProp="interactionCount">
                  <StatCounter value={siteConfig.stats.subscribers} />
                </span>{" "}
                subscribers with{" "}
                <StatCounter value={siteConfig.stats.totalViews} />{" "}
                views combined across{" "}
                <a href="https://youtube.com/@hayanura" target="_blank" rel="noopener noreferrer" className="text-saffron-400 hover:underline">YouTube</a>{" "}
                and{" "}
                <a href="https://instagram.com/hayanura" target="_blank" rel="noopener noreferrer" className="text-saffron-400 hover:underline">Instagram</a>. No writers' room, no outsourced animators, just one person breaking down global conflicts with original motion graphics and maps drawn from scratch.
              </div>
            </MagicCard>

            <div className="flex flex-col gap-6">
              <MagicCard enableTilt={true} enableStars={true} className="p-6 sm:p-8 rounded-2xl bg-[#091020]/60 backdrop-blur-md border border-white/5 relative group/card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#101C35]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                <h4 className="text-white font-cinzel text-lg mb-3 tracking-wider text-saffron-300">Research Before a Single Frame Moves</h4>
                <p className="text-[15px] sm:text-[16px] text-text-secondary/80 leading-relaxed relative z-10">
                  Every video gets researched, scripted, and animated by the same person, start to finish. That means digging through troop movements, border disputes, and trade routes before touching the timeline, because a gorgeous animation built on a wrong border is still wrong. The visuals only get made once the facts hold up.
                </p>
              </MagicCard>

              <MagicCard enableTilt={true} enableStars={true} className="p-6 sm:p-8 rounded-2xl bg-[#091020]/60 backdrop-blur-md border border-white/5 relative group/card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#101C35]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                <h4 className="text-white font-cinzel text-lg mb-3 tracking-wider text-saffron-300">What Actually Gets Covered</h4>
                <p className="text-[15px] sm:text-[16px] text-text-secondary/80 leading-relaxed relative z-10">
                  Most episodes circle back to Indian foreign policy: how New Delhi is playing the Indo-Pacific, what old empires can tell us about today's flashpoints, and the border stories most news channels flatten into a thirty-second clip. Accuracy comes before speed, even when that costs an extra week of edits before a video is ready to publish.
                </p>
              </MagicCard>
            </div>
          </motion.div>

          {/* Stats cards — 2/5 */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-5 mt-4 lg:mt-0">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
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
                  className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#091020]/80 backdrop-blur-xl border border-white/5 flex items-center gap-4 sm:gap-6 shadow-2xl relative group/stat"
                >
                  {/* Micro hover gradient passing through the stat card */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(120deg, transparent, ${item.color}08, transparent)`,
                    }}
                  />

                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover/stat:scale-110 group-hover/stat:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                      boxShadow: `0 0 15px ${item.color}10 inset`
                    }}
                  >
                    <item.icon className="text-xl sm:text-2xl drop-shadow-md" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <div className="relative z-10 flex-1 overflow-hidden">
                    <div className="text-xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-sm truncate">
                      <StatCounter value={item.value} />
                    </div>
                    <div className="text-[9px] sm:text-[11px] lg:text-xs mt-1 uppercase tracking-[0.15em] sm:tracking-[0.25em] text-text-muted font-medium truncate">
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