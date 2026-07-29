"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  hideDivider?: boolean;
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Ornamental Divider SVG ── */
function CinematicDivider() {
  return (
    <div className="flex items-center justify-center py-3" aria-hidden="true">
      <div
        className="h-px w-16 sm:w-24"
        style={{ background: "linear-gradient(90deg, transparent, rgba(246,183,60,0.3))" }}
      />
      <svg width="32" height="32" viewBox="0 0 32 32" className="mx-4 opacity-50">
        <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(246,183,60,0.4)" strokeWidth="0.5" />
        <circle cx="16" cy="16" r="7.5" fill="none" stroke="rgba(246,183,60,0.3)" strokeWidth="0.5" />
        <circle cx="16" cy="16" r="2.5" fill="rgba(246,183,60,0.35)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={16 + Math.cos(a) * 3.5}
              y1={16 + Math.sin(a) * 3.5}
              x2={16 + Math.cos(a) * 12.5}
              y2={16 + Math.sin(a) * 12.5}
              stroke="rgba(246,183,60,0.3)"
              strokeWidth="0.4"
            />
          );
        })}
        {[0, 90, 180, 270].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={16 + Math.cos(a) * 13}
              cy={16 + Math.sin(a) * 13}
              r="1.2"
              fill="rgba(246,183,60,0.4)"
            />
          );
        })}
      </svg>
      <div
        className="h-px w-16 sm:w-24"
        style={{ background: "linear-gradient(90deg, rgba(246,183,60,0.3), transparent)" }}
      />
    </div>
  );
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
  noPadding = false,
  hideDivider = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const headingId = `${id}-heading`;

  return (
    <>
      {!hideDivider && <CinematicDivider />}

      <section
        ref={ref}
        id={id}
        aria-labelledby={title ? headingId : undefined}
        className={`relative z-10 ${noPadding ? "" : "px-4 sm:px-6 lg:px-8 py-8 md:py-16"} ${className}`}
      >
        <motion.div
          initial={prefersReducedMotion ? {} : "hidden"}
          animate={isInView ? "show" : "hidden"}
          variants={prefersReducedMotion ? {} : staggerContainer}
          className="mx-auto max-w-[1200px]"
        >
          {title && (
            <motion.div
              className="mb-16 text-center"
              variants={prefersReducedMotion ? {} : staggerItem}
            >
              <h2
                id={headingId}
                className="font-cinzel text-3xl font-semibold tracking-[0.04em] text-text-primary sm:text-4xl md:text-5xl"
              >
                {title}
              </h2>
              {subtitle && (
                <p className="mt-5 text-base text-text-secondary/70 max-w-2xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
              {/* Gold underline */}
              <div
                className="mx-auto mt-6 h-px max-w-[200px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(246,183,60,0.4), rgba(255,140,26,0.5), rgba(246,183,60,0.4), transparent)",
                }}
              />
            </motion.div>
          )}
          {children}
        </motion.div>
      </section>
    </>
  );
}
