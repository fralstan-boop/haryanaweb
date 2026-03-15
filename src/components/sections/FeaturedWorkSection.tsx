"use client";

import { useRef, memo } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

import SectionWrapper from "@/components/SectionWrapper";
import { staggerItem } from "@/components/SectionWrapper";
import GlowButton from "@/components/GlowButton";
import { videos } from "@/data/videos";
import dynamic from "next/dynamic";
const ChromaGrid = dynamic(() => import("@/components/ui/ChromaGrid"), { ssr: false });
const PrismaticBurstDynamic = dynamic(() => import("@/components/ui/PrismaticBurst"), { ssr: false });

const FeaturedWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { margin: "200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;


  const chromaItems = videos.map((video) => ({
    image: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    title: video.title,
    subtitle: video.views,
    handle: "@HAYANURA",
    borderColor: "#FF8228",
    gradient: "linear-gradient(145deg, #0A1F3D, #050B18)",
    url: `https://youtu.be/${video.youtubeId}`,
  }));

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${!isVisible ? 'paused-animations' : ''}`} style={{ contain: 'layout paint' }}>

      <div className="absolute inset-0 pointer-events-none z-0">
        <PrismaticBurstDynamic
          animationType="rotate3d"
          intensity={2}
          speed={0.5}
          distort={0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={0} // Exactly matching the ReactBits demo screenshot provided by the user
          mixBlendMode="lighten"
          colors={['#ff007a', '#4d3dff', '#ffffff']}
        />
        {/* UNIQUE SOLUTION: A "Vignette Void" that places darkness ONLY exactly behind the text and expanding outward transparently, protecting legibility without washing out the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#02060F_25%,transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060F] via-transparent to-[#02060F] opacity-80 pointer-events-none" />
      </div>

      <SectionWrapper
        id="work"
        title="Featured Animation Marvels"
        subtitle="Cinematic animations exploring power, conflict, and the stories that shaped civilizations."
      >
        <motion.div
          variants={noMotion ? {} : staggerItem}
        >
          <ChromaGrid
            items={chromaItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </motion.div>

        <div className="mt-14 text-center">
          <GlowButton href="https://www.youtube.com/@HAYANURA" external variant="secondary">
            Explore More
          </GlowButton>
        </div>
      </SectionWrapper>
    </div>
  );
};

const MemoizedFeaturedWorkSection = memo(FeaturedWorkSection);
export default MemoizedFeaturedWorkSection;



