"use client";

import { useRef, useEffect, useState, memo } from "react";
import { 
  motion, 
  useInView, 
  useReducedMotion, 
  useMotionValue, 
  useSpring, 
  useTransform,
  type Variants 
} from "framer-motion";

import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import Image from "next/image";
import FireParticles from "@/components/ui/FireParticles";

const ARCH_URL =
  "/images/golden-arch.png";
const DIVIDER_URL =
  "/images/services-divider.png";

/* ── Framer Motion variants ── */
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const dividerFade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
  },
};

/* ── Ornamental Divider (matches SectionWrapper) ── */
function CinematicDivider() {
  return (
    <div className="flex items-center justify-center py-10" aria-hidden="true">
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

const ServicesSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isBgInView = useInView(bgRef, { margin: "200px" });
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const isVisible = useInView(sectionRef, { margin: "200px 0px" });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Double-frame delay to prevent CPU spikes on the frame the section enters
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    }
  }, [isInView]);


  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map to pixel movement (-2% to 2% overlap basically)
  const backgroundX = useTransform(smoothX, [0, 1920], [15, -15]);
  const backgroundY = useTransform(smoothY, [0, 1080], [10, -10]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Only track if section is roughly in view
      if (isBgInView) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isBgInView, mouseX, mouseY, prefersReducedMotion]);

  return (
    <div ref={bgRef} className="relative w-full">


      {/* ── Main section ── */}
      <section
        ref={sectionRef}
        id="services"
        aria-labelledby="services-heading"
        className={`relative z-10 ${!isVisible ? 'paused-animations' : ''}`}
        style={{ contain: 'layout paint' }}
      >
        {/* ── Mouse Parallax Background ── */}
        <motion.div 
          className="services-parallax-bg"
          style={{ 
            x: backgroundX, 
            y: backgroundY 
          }}
        />

        {/* ── Fire Particles (rising from bottom edge) ── */}
        <div 
          className="absolute inset-0 pointer-events-none z-[5] opacity-80" 
          style={{ 
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)"
          }}
        >
          <FireParticles />
        </div>
      {/* ── Decorative Arch (outside max-width container for full width) ── */}
        <motion.div
          className="arch-overlay"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ARCH_URL}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : "hidden"}
          animate={shouldAnimate ? "show" : "hidden"}
          variants={prefersReducedMotion ? {} : staggerContainer}
          className="services-container"
        >
          {/* ── Header ── */}
          <motion.div className="text-center" variants={prefersReducedMotion ? {} : fadeUp}>
            <h2
              id="services-heading"
              className="font-cinzel font-semibold text-text-primary services-title"
            >
              Services
            </h2>
            <p className="services-subtitle text-text-secondary">
              Thoughtfully crafted collaborations, storytelling, and production
              for brands that prefer intelligence over noise.
            </p>
          </motion.div>

          {/* ── Cultural Divider ── */}
          <motion.div
            className="services-divider-wrap"
            variants={prefersReducedMotion ? {} : dividerFade}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DIVIDER_URL}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
          </motion.div>

          {/* ── Card Grid ── */}
          <div className="services-grid">
            {services.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.id}
                variants={prefersReducedMotion ? {} : cardItem}
                custom={i}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}

            {/* Middle decorative slot (Logo) */}
            <motion.div
              variants={prefersReducedMotion ? {} : cardItem}
              custom={4}
              className="flex items-center justify-center p-6 opacity-40 pointer-events-none select-none"
            >
              <Image 
                src="/logo.png" 
                alt="Hayanura Logo" 
                width={80} 
                height={80} 
                unoptimized
                className="grayscale opacity-80"
              />
            </motion.div>

            {/* Last service card */}
            {services.slice(4).map((service, i) => (
              <motion.div
                key={service.id}
                variants={prefersReducedMotion ? {} : cardItem}
                custom={5 + i}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const MemoizedServicesSection = memo(ServicesSection);
export default MemoizedServicesSection;

