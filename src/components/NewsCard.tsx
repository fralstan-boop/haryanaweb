"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NewsItem } from "@/data/news";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="glow-card p-6"
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(255,140,26,0.08)" }
      }
      transition={{ duration: 0.3 }}
    >
      {/* Category + Date */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-saffron-500 bg-saffron-500/10 px-2.5 py-1 rounded-md">
          {item.category}
        </span>
        <span className="text-xs text-text-muted">{item.date}</span>
      </div>

      {/* Headline */}
      <h3 className="text-base font-semibold text-text-primary leading-snug">
        {item.headline}
      </h3>

      {/* Summary */}
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {item.summary}
      </p>
    </motion.div>
  );
}
