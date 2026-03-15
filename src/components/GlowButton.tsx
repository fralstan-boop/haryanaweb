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
    "inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-md font-medium text-sm tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-saffron-500 focus-visible:outline-offset-2 relative overflow-hidden";

  const variants = {
    primary:
      "text-navy-900 font-semibold hover:shadow-[0_0_28px_rgba(246,183,60,0.3)] active:scale-[0.97]",
    secondary:
      "text-gold-400 hover:bg-gold-400/8 hover:shadow-[0_0_20px_rgba(246,183,60,0.08)] active:scale-[0.97]",
  };

  const primaryStyle =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, #f6b73c, #ff8c1a)",
          border: "1px solid rgba(246,183,60,0.5)",
        }
      : {
          border: "1px solid rgba(246,183,60,0.25)",
          background: "transparent",
        };

  const content = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={primaryStyle}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
    >
      {children}
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
