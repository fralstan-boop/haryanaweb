"use client";

import { useEffect, useRef, useState, memo } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

interface GridMotionProps {
  items?: (string | React.ReactNode)[];
  gradientColor?: string;
  maxRows?: number;
}

function GridMotion({ 
  items = [], 
  gradientColor = 'rgba(11, 17, 32, 1)', 
  maxRows = 5 // User requested limit 5 rows max
}: GridMotionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Track continuous mouse position
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  
  // Track idle state & mobile
  const [isIdle, setIsIdle] = useState(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const isVisibleRef = useRef(false);


  const totalItems = maxRows * 7;
  // Fallback defaults if no items passed
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `DATA_${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;
  
  // Fill array to exactly totalItems if short
  while (combinedItems.length < totalItems) {
    combinedItems.push(`SYS_NODE_${combinedItems.length}`);
  }

  // Handle window resizing & Mobile check
  useEffect(() => {
    const handleResize = () => {
      // User request: disable strictly < 900px
      setIsMobile(window.innerWidth < 900);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main GSAP Hook
  useEffect(() => {
    if (isMobile) {
      rowRefs.current.forEach((row) => {
        if (row) gsap.killTweensOf(row);
      });
      return;
    }

    let animationFrameId: number;

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2, 0.5];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const mapMouseToScreen = mouseXRef.current / window.innerWidth;
          const moveAmount = (mapMouseToScreen * maxMoveAmount - maxMoveAmount / 2) * direction;

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;
      mouseXRef.current = e.clientX;
      setIsIdle(false);
      
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => setIsIdle(true), 1500);
      
      animationFrameId = requestAnimationFrame(updateMotion);
    };

    const handleMouseLeave = () => {
      setIsIdle(true);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (isVisibleRef.current) {
        // Double-frame delay to prevent CPU spikes on mount
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (isVisibleRef.current && !isMobile) {
              updateMotion();
            }
          });
        });
      }
    }, { threshold: 0, rootMargin: '200px' });

    if (gridRef.current) observer.observe(gridRef.current);

    if (!isMobile) updateMotion();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isMobile]);




  return (
    <div className="noscroll w-full h-full pointer-events-none" ref={gridRef}>
      <section
        className="intro absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          // User requested gradient blending
          background: `radial-gradient(circle at center, transparent 0%, ${gradientColor} 90%)`
        }}
      >
        <div className="gridMotion-container opacity-[0.35] mix-blend-screen">
          {[...Array(maxRows)].map((_, rowIndex) => (
            <div 
              key={rowIndex} 
              className="row" 
              ref={el => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
              // Static render if mobile/idle for harsh battery saving
              style={{
                willChange: (isMobile || isIdle) ? 'auto' : 'transform',
                transform: isMobile ? 'translateX(0px)' : undefined 
              }}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="row__item">
                    <div className="row__item-inner">
                      {typeof content === 'string' && content.startsWith('http') ? (
                        <div
                          className="row__item-img"
                          style={{
                            backgroundImage: `url(${content})`
                          }}
                        />
                      ) : (
                        <div className="row__item-content">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
const MemoizedGridMotion = memo(GridMotion);
export default MemoizedGridMotion;
