"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

/**
 * LazySection component that only mounts its children when it enters the viewport.
 * This prevents unnecessary React rendering and animation initialization for offscreen sections.
 */
export default function LazySection({
  children,
  threshold = 0.01,
  rootMargin = "1200px",
  className = "",
}: LazySectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isMounted, threshold, rootMargin]);

  return (
    <div ref={containerRef} className={className} style={{ minHeight: isMounted ? "auto" : "200px" }}>
      {isMounted ? children : null}
    </div>
  );
}
