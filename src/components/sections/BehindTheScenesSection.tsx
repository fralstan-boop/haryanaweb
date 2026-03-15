"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import dynamic from "next/dynamic";
import GlowButton from "@/components/GlowButton";
import { siteConfig } from "@/lib/site.config";

const CardSwap = dynamic(() => import("@/components/ui/CardSwap"), { ssr: false });

const workflowSteps = [
  {
    title: "Research",
    desc: "Deep-diving into historical archives, military papers, and OSINT sources to build a factual foundation.",
    accent: "#ff8c1a",
    img: "https://images.unsplash.com/photo-1614064641913-a53b50c05878?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Script Writing",
    desc: "Crafting engaging narratives that balance geopolitical complexity with clear styling and storytelling.",
    accent: "#4299e1",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Animation",
    desc: "Bringing scripts to life with cinematic motion — dynamic maps, troop movements, and visual metaphors.",
    accent: "#2b6cb0",
    img: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Editing & Polish",
    desc: "Final sound design, atmospheric effects, and pacing refinement to ensure every video feels premium.",
    accent: "#f6b73c",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function BehindTheScenesSection() {
  const prefersReducedMotion = useReducedMotion();
  const noMotion = !!prefersReducedMotion;

  return (
    <section id="behind" className="relative py-24 overflow-hidden bg-transparent">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Section Header Centered at top */}
        <motion.div
          className="text-center mb-16"
          initial={noMotion ? {} : { opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-saffron-500 mb-4">
            Behind the Scenes
          </h2>
          <div className="relative inline-block">
            <div
              className="absolute -inset-10 rounded-full -z-10 blur-[80px]"
              style={{ background: "rgba(255,130,40,0.12)" }}
            />
            <h3 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary tracking-wider leading-none mb-6">
              The Production Workflow
            </h3>
          </div>
          <p className="text-base sm:text-lg text-text-secondary/80 max-w-2xl mx-auto mb-8">
            From raw intelligence to cinematic cut — discover how HAYANURA is meticulously constructed.
          </p>
          <GlowButton href={siteConfig.links.youtube} external variant="secondary">
            Our YouTube Channel
          </GlowButton>
        </motion.div>

        {/* Giant Landscape Card Swap */}
        <motion.div
          className="w-full flex justify-center items-center"
          style={{ minHeight: "650px", position: "relative" }}
          initial={noMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CardSwap
            width={960}
            height={550}
            cardDistance={40}
            verticalDistance={40}
            delay={5000}
            pauseOnHover={true}
            skewAmount={2}
          >
            {workflowSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  "--card-accent": step.accent,
                } as React.CSSProperties}
              >
                {/* Image Background */}
                <img
                  src={step.img}
                  alt={step.title}
                  className="card-img-bg"
                />

                {/* Top Window UI Bar */}
                <div className="card-top-bar">
                  <div className="flex items-center gap-1.5 mr-3">
                    <div className="card-top-dot" />
                    <div className="card-top-dot" />
                    <div className="card-top-dot" />
                  </div>
                  <span className="card-top-text">&lt;/&gt; {step.title}</span>
                </div>

                {/* Giant Number Inside */}
                <span className="card-giant-number">{i + 1}</span>

                {/* Bottom Right Info Area */}
                <div className="card-info-bottom">
                  <span className="card-info-step">STEP 0{i + 1}</span>
                  <h3 className="card-info-title">{step.title}</h3>
                  <p className="card-info-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </CardSwap>
        </motion.div>

      </div>
    </section>
  );
}
