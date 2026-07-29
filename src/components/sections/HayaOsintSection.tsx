"use client";

import { useRef, useEffect, useState, memo } from "react";
import { useInView, useScroll, useTransform, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import GlowButton from "@/components/GlowButton";
import { siteConfig } from "@/lib/site.config";

const HayaOsintSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const isVisible = useInView(ref, { margin: "200px 0px" });

  // --- Live timestamp for the lower-third data readout (cosmetic) ---
  const [timestamp, setTimestamp] = useState("");
  useEffect(() => {
    const update = () =>
      setTimestamp(
        new Date().toISOString().replace("T", " ").slice(0, 19) + "Z"
      );
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  // Custom 2D Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const forestY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const fogY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // --- MOUSE PARALLAX ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothOptions = { damping: 20, stiffness: 50, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);
  const forestMouseX = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const forestMouseY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={ref}
      id="hayaosint"
      className={`flex hayaosint-scene relative w-full min-h-[680px] md:h-[88svh] md:min-h-[620px] md:max-h-[880px] items-center justify-center overflow-hidden bg-[#02060F] ${!isVisible ? "paused-animations" : ""
        }`}
      style={{ contain: "layout paint" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LAYER 1: Forest Background */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none layer forest"
        style={{
          y: forestY,
          x: forestMouseX,
          backgroundImage: "url('/images/hayaosint/forestbg.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.5) contrast(1.15)",
          willChange: "transform",
        }}
      >
        <motion.div className="w-full h-full" style={{ y: forestMouseY }} />
      </motion.div>

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none section-vignette"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* LAYER 2: Atmospheric Fog */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none layer fog"
        style={{
          y: fogY,
          backgroundImage: "url('/images/hayaosint/fog.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.16,
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      {/* LAYER 3: Film Grain / Noise Overlay */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.05] mix-blend-overlay grain-layer" />

      {/* LAYER 4: Split Content */}
      <div className="relative z-[4] w-full h-full flex flex-col md:flex-row py-6 md:py-0">
        {/* Left Column: Halftone Soldier — widened, dominant */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-full md:w-[58%] lg:w-[60%] flex items-center justify-center pointer-events-none overflow-hidden shrink-0">
          <Image
            src="/images/hayaosint/soldier-left-halftone.png"
            alt="HayaOSINT Operative"
            fill
            className="object-cover object-[62%_20%] select-none pointer-events-none twinkle-layer"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />

          {/* Left-edge fade into the scene on desktop */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#02060F] to-transparent pointer-events-none" />

          {/* Right-edge fade so the soldier blends into the right column on desktop */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-32 md:w-40 bg-gradient-to-l from-[#02060F] via-[#02060F]/40 to-transparent pointer-events-none" />

          {/* Bottom fade on mobile to seamlessly blend soldier image into content below */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#02060F] via-[#02060F]/70 to-transparent pointer-events-none" />

          {/* Targeting reticle corner brackets */}
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-[#c94b3d]/50 pointer-events-none" />
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b border-l border-[#c94b3d]/50 pointer-events-none" />

          {/* Data readout, bottom-left */}
          <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 font-sans text-[9px] sm:text-[10px] md:text-[11px] text-[#d8bfa0]/85 tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed pointer-events-none select-none z-10">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
              <span className="w-1 h-1 rounded-full bg-[#c94b3d] status-dot" />
              <span className="font-semibold">SIG-INT ACTIVE</span>
            </div>
            <div className="opacity-70">26.4499°N · 80.3319°E</div>
            <div className="opacity-50">{timestamp}</div>
          </div>
        </div>

        {/* Right Column: Logo and Text */}
        <div className="relative w-full md:h-full md:w-[42%] lg:w-[40%] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-4 md:py-6 pb-6 md:pb-20 mt-2 md:mt-0 translate-y-0 md:-translate-y-6">
          {/* Light Beam */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] z-[-1] pointer-events-none rounded-full light-beam"
            style={{
              background:
                "radial-gradient(circle, rgba(255,180,60,0.22), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Eyebrow label — small caps */}
          <div
            className={`flex items-center gap-2 sm:gap-3 mb-2 md:mb-3 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
          >
            <span className="w-4 sm:w-6 h-px bg-[#c94b3d]" />
            <span className="font-sans text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-[#c94b3d] uppercase">
              Intelligence Bureau
            </span>
            <span className="w-4 sm:w-6 h-px bg-[#c94b3d]" />
          </div>

          <div
            className={`relative flex items-center justify-center -mb-1 sm:mb-1 md:mb-2 mt-1 sm:mt-2 md:mt-4 ${isInView ? "animate-logo-reveal opacity-100" : "opacity-0"
              }`}
          >
            {/* Ashoka Chakra Watermark */}
            <div className="absolute inset-0 flex items-center justify-center z-[-1] pointer-events-none opacity-[0.09]">
              <Image
                src="/images/hayaosint/chakra.png"
                alt="Chakra Watermark"
                width={300}
                height={300}
                loading="lazy"
                className="w-[180px] sm:w-[240px] md:w-[360px] lg:w-[450px] object-contain animate-[spin_60s_linear_infinite]"
              />
            </div>

            <Image
              src="/images/hayaosint/hayaosint-logo-halftone.png"
              alt="HAYAOSINT Crest Halftone"
              width={400}
              height={260}
              loading="lazy"
              className="w-[240px] sm:w-[320px] md:w-[440px] lg:w-[520px] object-contain logo-filter translate-y-0 md:translate-y-4"
            />
          </div>

          {/* Text and Button Wrapper */}
          <div className="flex flex-col items-center justify-center -mt-3 sm:mt-0 md:-mt-4 translate-y-0 md:-translate-y-4">
            {/* Headline */}
            <h3
              className={`text-center font-serif font-semibold uppercase text-[#f2e9dc] text-sm sm:text-lg md:text-2xl lg:text-[1.85rem] tracking-[0.04em] leading-[1.35] mb-2 sm:mb-3 md:mb-4 max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] transition-all duration-700 delay-150 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.75)" }}
            >
              Threats to Bharat.
              <br />
              Identified. Tracked. Neutralized.
            </h3>

            {/* Supporting line */}
            <p
              className={`text-center font-sans text-[#a8b0be] text-[11px] sm:text-xs md:text-sm tracking-[0.05em] sm:tracking-[0.08em] leading-relaxed mb-4 sm:mb-6 md:mb-7 max-w-[300px] sm:max-w-[380px] transition-all duration-700 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
            >
              Field reporting and open-source intelligence from the front lines
              of Bharat&apos;s security.
            </p>

            <div
              className={`transition-all duration-1000 delay-500 ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
            >
              <a
                href={siteConfig.links.hayaosint}
                target="_blank"
                rel="noopener noreferrer"
                className="osint-btn relative overflow-hidden group inline-flex items-center justify-center !px-6 sm:!px-8 md:!px-10 lg:!px-12 !py-2.5 sm:!py-3 md:!py-3.5 lg:!py-4 text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold font-sans tracking-[0.15em] sm:tracking-[0.18em] uppercase rounded-sm cursor-pointer select-none"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold tracking-wide flex items-center justify-center gap-2 text-white">
                  Access HayaOSINT
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 6: Fire Embers */}
      <div className="absolute inset-0 z-[6] pointer-events-none layer embers" />

      {/* Bottom Fade (Removed per request) */}
      {/* <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[130px] bg-gradient-to-t from-[#02060F] via-[#02060F]/80 to-transparent z-[7] pointer-events-none" /> */}

      <style jsx>{`
        .hayaosint-scene {
          animation: cameraBreath 18s ease-in-out infinite;
          transform: translateZ(0);
        }
        .paused-animations,
        .paused-animations * {
          animation-play-state: paused !important;
        }

        .forest {
          animation: forestWarp 20s ease-in-out infinite;
        }
        .fog {
          animation: fogDrift 40s linear infinite;
        }
        .embers {
          background: url("/images/hayaosint/embers.png") center/cover no-repeat;
          animation: emberDrift 25s linear infinite;
          opacity: 0.5;
          mix-blend-mode: screen;
        }

        .grain-layer {
          background-image: url("/images/hayaosint/noise.png");
          background-repeat: repeat;
          background-size: 180px;
          animation: grainShift 1.2s steps(4) infinite;
        }

        /* Twinkling dot overlay — simulated via layered radial-gradient mask pulse.
           If a true per-dot twinkle is wanted, bake a second sparse dot-mask PNG
           at build time and cross-fade it in over this layer instead. */
        .twinkle-layer {
          animation: twinklePulse 5s ease-in-out infinite;
        }

        .scan-sweep {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(201, 75, 61, 0.0) 48%,
            rgba(255, 200, 160, 0.25) 50%,
            rgba(201, 75, 61, 0.0) 52%,
            transparent 100%
          );
          background-size: 100% 300%;
          animation: scanSweep 7s linear infinite;
        }

        .status-dot {
          animation: statusBlink 1.6s ease-in-out infinite;
        }

        .typing-cursor {
          animation: cursorBlink 1s steps(1) infinite;
          color: #c94b3d;
        }

        @keyframes cameraBreath {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes forestWarp {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes fogDrift {
          0% {
            transform: translateX(-30px);
          }
          100% {
            transform: translateX(30px);
          }
        }
        @keyframes emberDrift {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-120px);
          }
        }
        @keyframes grainShift {
          0% {
            background-position: 0 0;
          }
          25% {
            background-position: -20px 10px;
          }
          50% {
            background-position: 15px -15px;
          }
          75% {
            background-position: -10px -20px;
          }
          100% {
            background-position: 0 0;
          }
        }
        @keyframes twinklePulse {
          0%,
          100% {
            filter: brightness(1) saturate(1);
          }
          50% {
            filter: brightness(1.12) saturate(1.15);
          }
        }
        @keyframes scanSweep {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 300%;
          }
        }
        @keyframes statusBlink {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 6px 1px rgba(201, 75, 61, 0.8);
          }
          50% {
            opacity: 0.3;
            box-shadow: 0 0 2px 0px rgba(201, 75, 61, 0.3);
          }
        }
        @keyframes cursorBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
      <style jsx global>{`
        .logo-filter {
          filter: contrast(1.3) brightness(1.12) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.9));
        }
        .animate-logo-reveal {
          animation: logoReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .osint-btn {
          background: linear-gradient(90deg, #c94b3d, #9e3226);
          border: 1px solid rgba(245, 120, 105, 0.4);
          box-shadow: 0 10px 30px rgba(201, 75, 61, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .osint-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 40px rgba(201, 75, 61, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
};

const MemoizedHayaOsintSection = memo(HayaOsintSection);
export default MemoizedHayaOsintSection;