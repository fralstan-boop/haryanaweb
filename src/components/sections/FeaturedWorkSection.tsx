"use client";

import { useRef, memo, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { FaYoutube, FaEye } from "react-icons/fa6";

import SectionWrapper, { staggerItem } from "@/components/SectionWrapper";
import GlowButton from "@/components/GlowButton";
import { stripe1Videos, stripe2Videos, Video } from "@/data/videos";
import dynamic from "next/dynamic";
import Image from "next/image";

const PrismaticBurstDynamic = dynamic(() => import("@/components/ui/PrismaticBurst"), { ssr: false });

const VideoCard = ({ video }: { video: Video }) => {
  // Use hqdefault (480x360) for optimal balance of sharpness and decode performance
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
  );
  const [isFallback, setIsFallback] = useState(false);

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[250px] md:w-[320px] h-[175px] md:h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-lg transition-all duration-300 hover:scale-[1.04] hover:z-20 hover:border-amber-500/50 hover:shadow-[0_12px_30px_rgba(245,158,11,0.25)] flex flex-col justify-between p-4 select-none touch-manipulation"
    >
      {/* Background Image & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden flex items-center justify-center">
        {video.isShort ? (
          <>
            {/* Layer 1: Ambient Blurred Background Fill */}
            <Image
              src={thumbSrc}
              alt=""
              width={480}
              height={360}
              sizes="(max-width: 768px) 250px, 320px"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-[3.5] blur-[24px] brightness-[0.45] opacity-90 transition-transform duration-500 group-hover:scale-[3.8]"
              loading="lazy"
            />
            {/* Layer 2: Crisp Un-cropped Foreground Composition */}
            <div className="relative z-[1] h-[95%] aspect-[9/16] overflow-hidden rounded-md shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <Image
                src={thumbSrc}
                alt={video.title}
                width={480}
                height={360}
                sizes="(max-width: 768px) 250px, 320px"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none scale-[1.12] transition-transform duration-500 group-hover:scale-[1.2]"
                loading="lazy"
                onError={() => {
                  if (!isFallback) {
                    setIsFallback(true);
                    setThumbSrc(`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`);
                  }
                }}
              />
            </div>
          </>
        ) : (
          /* Standard Landscape Video */
          <Image
            src={thumbSrc}
            alt={video.title}
            width={480}
            height={360}
            sizes="(max-width: 768px) 250px, 320px"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => {
              if (!isFallback) {
                setIsFallback(true);
                setThumbSrc(`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`);
              }
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-[2]" />
      </div>

      {/* Top Header Badge (YouTube Badge + Views) */}
      <div className="relative z-10 flex items-center justify-between w-full gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-md border bg-red-600/90 border-red-400/30">
          <FaYoutube className="text-sm" />
          <span>YouTube</span>
        </span>

        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-950/80 border border-white/10 text-slate-200 backdrop-blur-md whitespace-nowrap shadow-sm">
          <FaEye className="text-amber-400 text-xs" />
          {video.views}
        </span>
      </div>

      {/* Bottom Content Info */}
      <div className="relative z-10 flex flex-col gap-1 text-left mt-auto">
        <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">
          @HAYANURA
        </span>
        <h3 className="text-sm md:text-[15px] font-bold text-white line-clamp-2 leading-tight drop-shadow-sm group-hover:text-amber-200 transition-colors">
          {video.title}
        </h3>
      </div>
    </a>
  );
};

const FeaturedWorkSection = ({ 
  videoData 
}: { 
  videoData?: { row1Items: Video[]; row2Items: Video[] } 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { margin: "200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;
  
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  // Double arrays for seamless infinite loop (translateX 0 -> -50%)
  const row1Items = videoData?.row1Items || [...stripe1Videos, ...stripe1Videos];
  const row2Items = videoData?.row2Items || [...stripe2Videos, ...stripe2Videos];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-6 ${!isVisible ? "paused-animations" : ""}`}
      style={{ contain: "layout paint" }}
    >
      {/* Background Prismatic Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <PrismaticBurstDynamic
          animationType="rotate3d"
          intensity={2}
          speed={0.5}
          distort={0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={0}
          mixBlendMode="lighten"
          noiseAmount={0}
          colors={["#ff007a", "#4d3dff", "#ffffff"]}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#02060F_25%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060F] via-transparent to-[#02060F] opacity-80 pointer-events-none" />
      </div>

      <SectionWrapper
        id="work"
        title="Featured Animation Marvels"
        subtitle="Cinematic animations exploring power, conflict, and the stories that shaped civilizations."
      >
        <motion.div variants={noMotion ? {} : staggerItem} className="relative w-full overflow-hidden mt-2">
          {/* Marquee Stripes Wrapper with CSS Mask for perfect edge fading */}
          <div 
            className="flex flex-col gap-6 w-full py-4 max-w-[100vw]"
            onTouchStart={() => setIsTouchPaused(true)}
            onTouchEnd={() => setIsTouchPaused(false)}
            onTouchCancel={() => setIsTouchPaused(false)}
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)'
            }}
          >
            {/* Stripe 1: Right to Left (Countryballs) */}
            <div className="marquee-container w-full overflow-hidden flex">
              <div className={`marquee-track-left flex w-max flex-nowrap gap-6 shrink-0 ${noMotion ? "" : "animate-marquee-left"} ${!isVisible || isTouchPaused ? "[animation-play-state:paused]" : ""} hover:[animation-play-state:paused]`}>
                {row1Items.map((video, idx) => (
                  <VideoCard key={`r1-${video.id}-${idx}`} video={video} />
                ))}
              </div>
            </div>

            {/* Stripe 2: Left to Right (Military & Geopolitics Animations) */}
            <div className="marquee-container w-full overflow-hidden flex">
              <div className={`marquee-track-right flex w-max flex-nowrap gap-6 shrink-0 ${noMotion ? "" : "animate-marquee-right"} ${!isVisible || isTouchPaused ? "[animation-play-state:paused]" : ""} hover:[animation-play-state:paused]`}>
                {row2Items.map((video, idx) => (
                  <VideoCard key={`r2-${video.id}-${idx}`} video={video} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <GlowButton href="https://www.youtube.com/@HAYANURA" external variant="secondary">
            Explore More Animations
          </GlowButton>
        </div>
      </SectionWrapper>

      {/* Embedded Scoped CSS Keyframes for GPU-accelerated continuous scrolling */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
          will-change: transform;
        }

        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

const MemoizedFeaturedWorkSection = memo(FeaturedWorkSection);
export default MemoizedFeaturedWorkSection;




