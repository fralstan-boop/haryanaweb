"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaCircle } from "react-icons/fa6";

interface ConflictHotspot {
  name: string;
  status: "active" | "escalating" | "monitoring";
  region: string;
}

const hotspots: ConflictHotspot[] = [
  { name: "Ukraine–Russia War", status: "active", region: "Eastern Europe" },
  { name: "Gaza Conflict", status: "escalating", region: "Middle East" },
  { name: "Indo-Pacific Tensions", status: "monitoring", region: "Asia-Pacific" },
  { name: "Taiwan Strait", status: "monitoring", region: "East Asia" },
  { name: "Red Sea Crisis", status: "active", region: "Arabian Sea" },
  { name: "Sahel Instability", status: "active", region: "West Africa" },
];

const statusColors: Record<string, string> = {
  active: "text-red-400",
  escalating: "text-amber-400",
  monitoring: "text-blue-400",
};

const statusDot: Record<string, string> = {
  active: "text-red-500",
  escalating: "text-amber-500",
  monitoring: "text-blue-500",
};

export default function GlobalConflictTicker() {
  const prefersReducedMotion = useReducedMotion();

  // Double items for seamless scroll
  const items = [...hotspots, ...hotspots];

  return (
    <motion.div
      className="relative z-10 overflow-hidden border-y border-saffron-500/10 bg-navy-900/40 backdrop-blur-sm"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5  }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
            Global Conflict Status
          </span>
        </div>

        {/* Ticker track */}
        <div className="overflow-hidden">
          <div className={`ticker-track ${prefersReducedMotion ? "" : ""}`}>
            {items.map((h, i) => (
              <div
                key={`${h.name}-${i}`}
                className="flex items-center gap-2 px-6 whitespace-nowrap"
              >
                <FaCircle className={`text-[5px] ${statusDot[h.status]}`} />
                <span className="text-sm font-medium text-text-primary">{h.name}</span>
                <span className={`text-[10px] uppercase tracking-wider font-semibold ${statusColors[h.status]}`}>
                  {h.status}
                </span>
                <span className="text-[10px] text-text-muted">• {h.region}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
