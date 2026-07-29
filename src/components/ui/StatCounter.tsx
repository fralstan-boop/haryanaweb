"use client";

import { useInView, motion } from "framer-motion";
import { useRef } from "react";

function OdometerDigit({ digit, duration }: { digit: string; duration: number }) {
  const isNumber = !isNaN(parseInt(digit));
  
  if (!isNumber || digit.trim() === '') {
    return <span className="inline-flex h-[1em] items-center shrink-0">{digit}</span>;
  }

  // Use 2 full cycles of 0-9 before landing on the target digit
  const cycles = 2; 
  const numbers = Array.from({ length: 10 * cycles }, (_, i) => i % 10);
  const targetIndex = parseInt(digit) + (10 * (cycles - 1));
  const totalItems = numbers.length;
  
  // Calculate the exact percentage to translate up
  const yPercent = (targetIndex / totalItems) * 100;

  return (
    <span className="inline-flex flex-col h-[1em] overflow-hidden relative align-bottom" style={{ lineHeight: 1 }}>
      <motion.span
        initial={{ y: "0%" }}
        animate={{ y: `-${yPercent}%` }}
        transition={{
          duration: duration,
          ease: [0.16, 1, 0.3, 1], // Cinematic ease-out
        }}
        className="flex flex-col"
      >
        {numbers.map((num, i) => (
          <span key={i} className="h-[1em] flex items-center justify-center shrink-0">
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

interface StatCounterProps {
  value: string; // e.g. "287,543", "110M+", "50+"
  className?: string;
}

export default function StatCounter({ value, className = "" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Split the formatted string into individual characters
  const chars = value.split('');

  return (
    <div ref={ref} className={`inline-flex items-end whitespace-nowrap ${className}`} style={{ lineHeight: 1 }}>
      {/* Invisible screen-reader/selectable text to prevent ::selection glitch on hidden digits */}
      <span className="sr-only">{value}</span>
      
      {/* Visible animated digits (unselectable to avoid dark box artifacts) */}
      <span className="flex select-none pointer-events-none" aria-hidden="true">
        {isInView ? (
          chars.map((char, index) => {
            // Stagger the duration slightly from left to right for a mechanical feel
            const duration = 2 + (index * 0.15);
            return (
              <OdometerDigit 
                key={`${index}-${char}`} 
                digit={char} 
                duration={duration} 
              />
            );
          })
        ) : (
          // Render an invisible placeholder to preserve layout width before animation
          <span className="opacity-0">{value}</span>
        )}
      </span>
    </div>
  );
}
