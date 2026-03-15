"use client";

import { useRef, useEffect, memo } from "react";
import { useInView, useScroll, useTransform, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import GlowButton from "@/components/GlowButton";
import { siteConfig } from "@/lib/site.config";

const HayaOsintSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const isVisible = useInView(ref, { margin: "200px 0px" });

  
  // Custom 2D Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax Depth Mappings (translateY)
  const forestY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const fogY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // --- MOUSE PARALLAX (Cinematic Micro-Drift) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth the mouse motion so it feels like a heavy camera
  const smoothOptions = { damping: 20, stiffness: 50, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  // Map normalized [-1, 1] mouse coordinates to physical pixel drifts
  // Forest moves opposite to mouse slightly (-4px max)
  const forestMouseX = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const forestMouseY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);
  
  // Soldiers move further opposite (-10px max) to create extreme depth
  const soldierMouseX = useTransform(smoothMouseX, [-1, 1], [8, -8]);
  const soldierMouseY = useTransform(smoothMouseY, [-1, 1], [8, -8]);

  // Handle Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize to [-1, 1]
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };
  
  // Reset mouse on leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={ref} 
      id="hayaosint" 
      className={`hayaosint-scene relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-visible bg-[#02060F] ${!isVisible ? 'paused-animations' : ''}`}
      style={{ contain: 'layout paint' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* LAYER 1: Forest Background */}
      <motion.div 
        className="absolute inset-0 z-[1] pointer-events-none layer forest"
        style={{
          y: forestY,
          x: forestMouseX, // Combine with Y via framer-motion styles
          backgroundImage: "url('/images/hayaosint/forestbg.webp')", // using optimized webp
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          imageRendering: "auto",
          filter: "brightness(0.55) contrast(1.1)",
          willChange: "transform",
        }}
      >
        <motion.div className="w-full h-full" style={{ y: forestMouseY }} />
      </motion.div>
      
      {/* Cinematic Vignette Overlay (Stable) */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none section-vignette"
        style={{ background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)" }}
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
          opacity: 0.18,
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      <motion.div
        className="absolute top-1/2 -left-[15vw] w-[70vw] -translate-y-1/2 max-w-none pointer-events-none select-none origin-center z-[10] layer"
        style={{ x: soldierMouseX }}
      >
        <motion.div className="w-full h-full" style={{ y: soldierMouseY }}>
          <div className="w-full h-full soldier-left">
          <Image 
            src="/images/hayaosint/leftsoldier.webp"
            alt="Left Soldier"
            width={800}
            height={1200}
            className="w-full h-auto select-none pointer-events-none"
            style={{ 
              filter: "brightness(.9) contrast(1.1) saturate(.9) drop-shadow(0 0 25px rgba(0,0,0,.6))",
              willChange: "transform" 
            }}
            loading="lazy"
          />

          </div>
        </motion.div>
      </motion.div>

      {/* LAYER 4: Main Content (Logo + Text + Button) */}
      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center layer content -translate-y-[30px] md:-translate-y-[50px]">
        <div className="relative text-center max-w-[720px] mx-auto px-4 flex flex-col items-center">
          
          {/* Cinematic Light Beam (Behind Logo) */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] z-[-1] pointer-events-none rounded-full light-beam" 
            style={{ 
              background: "radial-gradient(circle, rgba(255,180,60,0.35), transparent 70%)", 
              filter: "blur(40px)",
              willChange: "opacity"
            }} 
          />

          <div className={`relative top-[30px] md:top-[50px] mb-[18px] mt-4 flex items-center justify-center ${isInView ? "animate-logo-reveal opacity-100" : "opacity-0"}`} style={{ willChange: "transform, opacity" }}>
            {/* Ashoka Chakra Watermark */}
            <div className="absolute inset-0 flex items-center justify-center z-[-1] pointer-events-none opacity-[0.06]">
              <Image 
                src="/images/hayaosint/chakra.png"
                alt="Chakra Watermark"
                width={300}
                height={300}
                loading="lazy"
                className="w-[300px] md:w-[480px] object-contain animate-[spin_60s_linear_infinite]"
              />
            </div>

            <Image 
              src="/images/hayaosint/crest.png" 
              alt="HAYAOSINT Crest" 
              width={400}
              height={260}
              loading="lazy"
              className="w-[380px] md:w-[480px] object-contain logo-filter scale-110 md:scale-125"
            />

          </div>

          {/* Military Divider Image */}
          <img 
            src="/images/dividers/divider3.png"
            alt="Divider"
            className="hero-divider relative z-10 pointer-events-none"
          />

          <div 
            className={`text-center mx-auto text-[1.1rem] md:text-[1.35rem] font-cinzel text-[#e6e9f0] mt-[10px] mb-7 md:mb-10 max-w-[720px] leading-[1.8] tracking-[0.03em] px-4 md:px-8 relative right-[1%] transition-all duration-1000 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.6)", willChange: "transform, opacity" }}
          >
            Tracking the operations where Bharat's guardians neutralize those who dare threaten the motherland.
          </div>

          <div className={`hero-btn transition-all duration-1000 delay-500 pb-4 mt-[22px] ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={{ willChange: "transform, opacity" }}>
            <GlowButton href={siteConfig.links.hayaosint} className="haya-btn-pulse !px-8 md:!px-12 !py-4 md:!py-5 text-sm md:text-lg font-semibold font-cinzel tracking-[0.15em] uppercase hover:-translate-y-[2px] transition-transform duration-300 !bg-[#f4a833] !text-[#0a0a0a]">
              Visit HayaOSINT
            </GlowButton>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute top-1/2 -right-[10vw] w-[70vw] -translate-y-1/2 max-w-none pointer-events-none select-none origin-center z-[10] layer"
        style={{ x: soldierMouseX }}
      >
        <motion.div className="w-full h-full" style={{ y: soldierMouseY }}>
          <div className="w-full h-full soldier-right">
          <Image 
            src="/images/hayaosint/rightsoldier.webp"
            alt="Right Soldier"
            width={800}
            height={1200}
            className="w-full h-auto select-none pointer-events-none"
            style={{ 
              filter: "brightness(.9) contrast(1.1) saturate(.9) drop-shadow(0 0 25px rgba(0,0,0,.6))",
              willChange: "transform"
            }}
            loading="lazy"
          />

          </div>
        </motion.div>
      </motion.div>

      {/* LAYER 6: Fire Embers Overlay */}
      <div className="absolute inset-0 z-[6] pointer-events-none layer embers" />

      {/* Bottom Fade to elegantly hide soldier cuts */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[160px] bg-gradient-to-t from-[#02060F] via-[#02060F]/80 to-transparent z-[7] pointer-events-none" />

      <style jsx>{`
        .hayaosint-scene {
          animation: cameraBreath 18s ease-in-out infinite;
          transform: translateZ(0);
        }
        .paused-animations, .paused-animations * {
          animation-play-state: paused !important;
        }

        .forest {
          animation: forestWarp 20s ease-in-out infinite;
        }
        .fog {
          animation: fogDrift 40s linear infinite;
        }
        .embers {
          background: url('/images/hayaosint/embers.png') center/cover no-repeat;
          animation: emberDrift 25s linear infinite;
          opacity: 0.55;
          mix-blend-mode: screen;
        }
        .soldier-left {
          transform-origin: bottom center;
          animation: ${isInView ? 'soldierLeftEnter 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, soldierBreathing 4s ease-in-out 1.4s infinite, soldierSway 7s ease-in-out 1.4s infinite' : 'none'};
          opacity: 0;
          will-change: transform, opacity;
        }
        .soldier-right {
          transform-origin: bottom center;
          animation: ${isInView ? 'soldierRightEnter 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, soldierBreathing 4s ease-in-out 1.6s infinite, soldierSwayRight 7s ease-in-out 1.6s infinite' : 'none'};
          opacity: 0;
          will-change: transform, opacity;
        }

        @keyframes cameraBreath {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes soldierBreathing {
          0% { transform: scale(1) translateY(0px) skewX(0deg); }
          50% { transform: scale(1.06) translateY(-12px) skewX(0deg); }
          100% { transform: scale(1) translateY(0px) skewX(0deg); }
        }
        @keyframes soldierSway {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(1.2deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes soldierSwayRight {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-1.2deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes forestWarp {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        @keyframes fogDrift {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
        @keyframes emberDrift {
          0% { transform: translateY(0); }
          100% { transform: translateY(-120px); }
        }
        @keyframes soldierLeftEnter {
          0% { transform: translate(-100px, 100px) skewX(20deg); opacity: 0; }
          100% { transform: translate(0, 0) skewX(0deg); opacity: 1; }
        }
        @keyframes soldierRightEnter {
          0% { transform: translate(100px, 100px) skewX(-20deg); opacity: 0; }
          100% { transform: translate(0, 0) skewX(0deg); opacity: 1; }
        }
      `}</style>
      <style jsx global>{`
        .logo-filter {
          filter: drop-shadow(0 0 15px rgba(255,180,60,.6)) drop-shadow(0 0 40px rgba(255,180,60,.5));
        }
        .animate-logo-reveal {
          animation: logoReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes logoReveal {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hero-divider {
          width: 70%;
          max-width: 520px;
          margin: -190px auto -130px auto;
          display: block;
          opacity: 0.8;
          object-fit: contain;
          height: auto;
          clip-path: inset(48% 0 48% 0);
          filter: drop-shadow(0 0 8px rgba(255,180,60,0.35));
          animation: dividerGlow 5s ease-in-out infinite;
          mask-image: linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, white 15%, white 85%, transparent 100%);
        }
        @keyframes dividerGlow {
          0% { filter: drop-shadow(0 0 6px rgba(255,180,60,0.25)); }
          50% { filter: drop-shadow(0 0 15px rgba(255,180,60,0.6)); }
          100% { filter: drop-shadow(0 0 6px rgba(255,180,60,0.25)); }
        }
        .haya-btn-pulse {
          animation: buttonPulse 3s infinite;
          box-shadow: 0 0 20px rgba(255,170,50,.6), 0 0 50px rgba(255,170,50,.4);
        }
        .haya-btn-pulse:hover {
          box-shadow: 0 0 30px rgba(255,170,50,.8), 0 0 70px rgba(255,170,50,.6);
        }
        @keyframes buttonPulse {
          0% { box-shadow: 0 0 20px rgba(255,170,50,.6), 0 0 50px rgba(255,170,50,.4); }
          50% { box-shadow: 0 0 30px rgba(255,170,50,.8), 0 0 70px rgba(255,170,50,.6); }
          100% { box-shadow: 0 0 20px rgba(255,170,50,.6), 0 0 50px rgba(255,170,50,.4); }
        }
      `}</style>
    </section>
  );
};

const MemoizedHayaOsintSection = memo(HayaOsintSection);
export default MemoizedHayaOsintSection;

