"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

interface StatCounterProps {
  value: string; // e.g. "286K+", "110M+", "50+"
  className?: string;
}

export default function StatCounter({ value, className = "" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract digits and decimals: e.g. "2.9K+" -> "2.9"
  const rawNumberMatch = value.match(/[\d.]+/);
  const rawNumber = rawNumberMatch ? parseFloat(rawNumberMatch[0]) : 0;
  
  // Extract text suffix: e.g. "2.9K+" -> "K+"
  const suffixMatch = value.match(/[A-Za-z+]+/);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  
  // Check if we need decimals based on the original string
  const decimals = value.includes('.') ? value.split('.')[1].match(/\d+/)?.[0].length || 0 : 0;

  return (
    <div ref={ref} className={`inline-block whitespace-nowrap ${className}`}>
      {isInView ? (
        <CountUp
          start={0}
          end={rawNumber}
          duration={2.5}
          separator=","
          decimals={decimals}
          suffix={suffix}
          useEasing={true}
        />
      ) : (
        // Render 0 before scrolling into view to hold layout
        <span>0{suffix}</span>
      )}
    </div>
  );
}
