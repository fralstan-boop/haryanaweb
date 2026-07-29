"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface GlowButtonProps {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function GlowButton({
  children,
  href,
  external = false,
  variant = "primary",
  className = "",
}: GlowButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-md font-medium text-sm tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-saffron-500 focus-visible:outline-offset-2 relative overflow-hidden group cursor-pointer select-none";

  const variants = {
    primary:
      "text-navy-900 font-semibold shadow-[0_10px_30px_rgba(246,183,60,0.25)] hover:shadow-[0_15px_40px_rgba(246,183,60,0.45)]",
    secondary:
      "text-gold-400 border border-[rgba(246,183,60,0.25)] hover:border-[rgba(246,183,60,0.5)] hover:shadow-[0_10px_30px_rgba(246,183,60,0.15)]",
  };

  const primaryStyle =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, #f6b73c, #ff8c1a)",
          border: "1px solid rgba(246,183,60,0.5)",
        }
      : {
          background: "transparent",
        };

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={primaryStyle}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -2 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
    >
      {/* HayaSMP-style slide-up fill overlay */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={false}>
      {content}
    </Link>
  );
}
