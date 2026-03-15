"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { staggerItem } from "@/components/SectionWrapper";
import GlowButton from "@/components/GlowButton";
import { siteConfig } from "@/lib/site.config";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaCubes,
  FaScroll,
  FaHandshakeSimple,
  FaExplosion,
  FaCalendarCheck,
} from "react-icons/fa6";

const features = [
  { icon: FaCubes, title: "Factions", desc: "Build and lead your own civilization" },
  { icon: FaScroll, title: "Diplomacy", desc: "Negotiate alliances and treaties" },
  { icon: FaExplosion, title: "Wars", desc: "Fight strategic wars for territory" },
  { icon: FaHandshakeSimple, title: "Alliances", desc: "Form powerful coalitions" },
  { icon: FaCalendarCheck, title: "Events", desc: "Community-driven challenges" },
];

export default function GamingSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper
      id="hayasmp"
      title="HayaSMP"
      subtitle="Minecraft civilization builder — factions, diplomacy, and wars."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Info */}
        <motion.div
          className="space-y-6"
          variants={prefersReducedMotion ? {} : staggerItem}
        >
          <p className="text-lg text-text-secondary leading-relaxed">
            HayaSMP is a public Minecraft server where players build
            civilizations, forge alliances, and engage in strategic warfare.
            It&apos;s geopolitics — but in blocks.
          </p>
          <p className="text-base text-text-secondary leading-relaxed">
            Planned features include factions, diplomacy mechanics, wars, and
            community events that bring the server&apos;s world to life.
          </p>
          <GlowButton href={siteConfig.links.hayasmp} external variant="primary">
            Visit HayaSMP
          </GlowButton>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="glow-card p-5 text-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <feat.icon className="text-2xl text-saffron-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-text-primary">
                {feat.title}
              </div>
              <div className="text-xs text-text-muted mt-1">{feat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
