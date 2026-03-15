"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";

interface StepCardProps {
  icon: IconType;
  title: string;
  description: string;
  stepNumber: number;
}

export default function StepCard({
  icon: Icon,
  title,
  description,
  stepNumber,
}: StepCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="glow-card p-6 text-center relative overflow-hidden"
      whileHover={
        prefersReducedMotion
          ? {}
          : { y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(255,140,26,0.08)" }
      }
      transition={{ duration: 0.3 }}
    >
      {/* Step number watermark */}
      <span className="absolute top-2 right-4 text-6xl font-black text-saffron-500/[0.04] select-none">
        {String(stepNumber).padStart(2, "0")}
      </span>

      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-saffron-500/10 flex items-center justify-center text-saffron-500">
        <Icon className="text-2xl" />
      </div>
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
