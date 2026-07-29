"use client";

import { memo, useState, useCallback, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { FaCompass, FaCheck, FaMap } from "react-icons/fa6";
import { siteConfig } from "@/lib/site.config";
import CanvasStarfield from "@/components/CanvasStarfield";

// ─────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────
const SERVER_IP = "smp.hayanura.in";
const GOLD = "#c9a24e";
const GOLD_LT = "#e8d5a3";
const TEAL = "#5fa8b5";
const EMERALD = "#164f3b";

// ─────────────────────────────────────────────
// Hero CSS
// ─────────────────────────────────────────────
const HERO_CSS = `
/* ── Hero container: exactly one viewport ── */
.haya-smp-hero {
    position: relative;
    width: 100%;
    min-height: 600px;
    height: 82svh;
    max-height: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background:
        radial-gradient(ellipse 140% 45% at 50% 105%, rgba(201,162,78,0.13) 0%, rgba(95,168,181,0.06) 30%, transparent 60%),
        linear-gradient(
            180deg,
            #1e1a12 0%,
            #17202e 12%,
            #14324a 30%,
            #0f2438 50%,
            #0a1a2c 68%,
            #071520 82%,
            #050e18 100%
        );
}

.hero-sunrise {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120vw;
    height: 35vh;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(
        ellipse 100% 80% at 50% 100%,
        rgba(246,217,144,0.1) 0%,
        rgba(201,162,78,0.05) 40%,
        transparent 70%
    );
}

.hero-grid {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
}
.hero-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(0deg, rgba(201,162,78,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,162,78,0.02) 1px, transparent 1px);
    background-size: 100% 80px, 80px 100%;
}

.hero-tick {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    background: rgba(201,162,78,0.15);
}
.hero-tick--t { top:0; left:50%; width:1px; height:10px; transform:translateX(-50%); }
.hero-tick--b { bottom:0; left:50%; width:1px; height:10px; transform:translateX(-50%); }
.hero-tick--l { left:0; top:50%; height:1px; width:10px; transform:translateY(-50%); }
.hero-tick--r { right:0; top:50%; height:1px; width:10px; transform:translateY(-50%); }
.hero-tick--tl { top:0; left:25%; width:1px; height:6px; opacity:0.5; }
.hero-tick--tr { top:0; left:75%; width:1px; height:6px; opacity:0.5; }

.hero-coord {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    font-family: var(--font-inter), sans-serif;
    font-size: 8px;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: rgba(201,162,78,0.1);
}

.hero-earth {
    position: absolute;
    bottom: -25%;
    left: 50%;
    transform: translateX(-50%);
    width: clamp(600px, 100vw, 1100px);
    aspect-ratio: 1;
    z-index: 2;
    pointer-events: none;
}

.hero-earth-atmo {
    position: absolute;
    inset: -3%;
    border-radius: 50%;
    box-shadow:
        0 -30px 60px 15px rgba(201,162,78,0.07),
        0 -15px 40px 8px rgba(95,168,181,0.05);
    pointer-events: none;
}

.hero-earth-rim {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
        ellipse 70% 25% at 50% 3%,
        rgba(246,217,144,0.14) 0%,
        rgba(201,162,78,0.05) 50%,
        transparent 80%
    );
    pointer-events: none;
}

.hero-earth-vignette {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45%;
    z-index: 3;
    pointer-events: none;
    background: linear-gradient(to top, #050e18 0%, rgba(5,14,24,0.5) 50%, transparent 100%);
}

.hero-text-backdrop {
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(650px, 85vw);
    height: 280px;
    z-index: 3;
    pointer-events: none;
    background: radial-gradient(
        ellipse at 50% 50%,
        rgba(250,240,210,0.06) 0%,
        rgba(20,50,74,0.04) 40%,
        transparent 70%
    );
}

@keyframes hero-text-shine {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
}
.hero-animate-shine {
    background-size: 200% auto !important;
    animation: hero-text-shine 5s linear infinite;
}

@media (max-width: 640px) {
    .hero-coord { display: none; }
    .hero-tick--tl, .hero-tick--tr { display: none; }
    .hero-grid::before {
        background-size: 100% 55px, 55px 100%;
    }
    .hero-earth {
        bottom: -20%;
        width: clamp(500px, 110vw, 800px);
    }
    .hero-text-backdrop {
        height: 220px;
        top: 35%;
    }
}
`;

// ─────────────────────────────────────────────
// Earth Horizon
// ─────────────────────────────────────────────
const EarthHorizon = memo(({ reduced }: { reduced: boolean }) => (
    <motion.div
        className="hero-earth"
        aria-hidden
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut", delay: 0 }}
    >
        <motion.div
            className="w-full h-full"
            animate={reduced ? {} : { y: [0, -5, 0] }}
            transition={reduced ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
        >
            <div className="hero-earth-atmo" />
            <div className="hero-earth-rim" />
            <picture>
                <source srcSet="/images/earth-globe.webp" type="image/webp" />
                <img
                    src="/images/earth-globe.webp"
                    alt="HayaSMP Earth"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    className="w-full h-full object-cover rounded-full"
                    style={{ clipPath: "circle(50% at 50% 50%)", opacity: 0.8 }}
                />
            </picture>
        </motion.div>
    </motion.div>
));
EarthHorizon.displayName = "EarthHorizon";

// ─────────────────────────────────────────────
// Section Component
// ─────────────────────────────────────────────
const HayaSMPSection = () => {
    const [copied, setCopied] = useState(false);
    const reduced = useReducedMotion() ?? false;
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useInView(ref, { margin: "200px 0px" });

    const handleCopyIP = useCallback(() => {
        navigator.clipboard.writeText(SERVER_IP);
        setCopied(true);
        const t = setTimeout(() => setCopied(false), 3000);
        return () => clearTimeout(t);
    }, []);

    return (
        <section ref={ref} id="hayasmp" className="relative w-full">
            <style>{HERO_CSS}</style>

            {isVisible && (
                <motion.div
                    className="haya-smp-hero"
                    initial="hidden"
                    animate="visible"
                    aria-label="HayaSMP Earth — Hero"
                >
                    {/* ── Atmosphere layers ── */}
                    <div className="hero-sunrise" aria-hidden />
                    <CanvasStarfield />
                    <div className="hero-grid" aria-hidden />

                    {/* ── Compass ticks ── */}
                    <div className="hero-tick hero-tick--t" aria-hidden />
                    <div className="hero-tick hero-tick--b" aria-hidden />
                    <div className="hero-tick hero-tick--l" aria-hidden />
                    <div className="hero-tick hero-tick--r" aria-hidden />
                    <div className="hero-tick hero-tick--tl" aria-hidden />
                    <div className="hero-tick hero-tick--tr" aria-hidden />

                    {/* ── Coordinates ── */}
                    <span className="hero-coord" style={{ top: "16%", left: "3.5%" }} aria-hidden>45°12′ N</span>
                    <span className="hero-coord" style={{ top: "16%", right: "3.5%" }} aria-hidden>12°28′ E</span>

                    {/* ── Text backdrop glow ── */}
                    <div className="hero-text-backdrop" aria-hidden />

                    {/* ── Earth Horizon ── */}
                    <EarthHorizon reduced={reduced} />
                    <div className="hero-earth-vignette" aria-hidden />

                    {/* ═══ CONTENT ═══ */}
                    <div
                        className="relative z-10 flex flex-col items-center px-5 w-full max-w-4xl"
                        style={{ marginTop: "-2vh" }}
                    >
                        {/* Top label */}
                        <motion.div
                            className="flex items-center gap-3 mb-3 sm:mb-4"
                        >
                            <span style={{ width: 24, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}55)`, display: "inline-block" }} />
                            <span style={{
                                fontFamily: "var(--font-cinzel), serif",
                                fontSize: 10,
                                fontWeight: 600,
                                letterSpacing: "0.3em",
                                color: TEAL,
                                textTransform: "uppercase" as const,
                            }}>
                                HAYASMP EARTH
                            </span>
                            <span style={{ width: 24, height: 1, background: `linear-gradient(90deg, ${GOLD}55, transparent)`, display: "inline-block" }} />
                        </motion.div>

                        {/* Heading: Minecraft SMP. */}
                        <motion.h1
                            className="text-center leading-[1.05] m-0"
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontWeight: 800,
                                fontSize: "clamp(3rem, 9vw, 8rem)",
                                background: `linear-gradient(135deg, #ffffff 0%, #a2d7dd 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 0 25px rgba(95,168,181,0.45)) drop-shadow(0 4px 10px rgba(5,14,24,0.8))",
                                paddingBottom: "0.08em",
                                letterSpacing: "-0.02em"
                            }}
                        >
                            Minecraft SMP.
                        </motion.h1>

                        {/* Heading: One World. Infinite Stories. */}
                        <motion.span
                            className={`block text-center leading-[1.1] mt-1 ${reduced ? "" : "hero-animate-shine"}`}
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                fontWeight: 700,
                                fontStyle: "italic",
                                fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
                                background: `linear-gradient(to right, ${GOLD} 0%, #f6d990 20%, #ffffff 50%, #f6d990 80%, ${GOLD} 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 0 35px rgba(201,162,78,0.6)) drop-shadow(0 4px 15px rgba(5,14,24,0.9))",
                                paddingBottom: "0.08em",
                            }}
                        >
                            One World. Infinite Stories.
                        </motion.span>

                        {/* Divider */}
                        <motion.div
                            className="flex items-center gap-2.5 mt-4 mb-4"
                        >
                            <span style={{ width: 32, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,162,78,0.25))`, display: "inline-block" }} />
                            <span style={{ width: 4, height: 4, border: "1px solid rgba(201,162,78,0.25)", transform: "rotate(45deg)", display: "inline-block" }} />
                            <span style={{ width: 32, height: 1, background: `linear-gradient(90deg, rgba(201,162,78,0.25), transparent)`, display: "inline-block" }} />
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            className="text-center m-0 max-w-xl"
                            style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
                                fontWeight: 400,
                                lineHeight: 1.6,
                                color: "rgba(245,240,228,0.7)",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Claim Nations &ensp;·&ensp; Build Empires &ensp;·&ensp; Rewrite History
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-3.5 w-full sm:w-auto items-center"
                        >
                            {/* Primary: Begin Your Journey */}
                            <button
                                onClick={handleCopyIP}
                                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer transition-all duration-200"
                                style={{
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    letterSpacing: "0.07em",
                                    textTransform: "uppercase" as const,
                                    padding: "15px 30px",
                                    background: copied
                                        ? "linear-gradient(135deg, #1a6b4f, #164f3b)"
                                        : `linear-gradient(135deg, ${EMERALD}, #1a6b4f)`,
                                    color: copied ? GOLD_LT : "#f5f0e4",
                                    border: `1.5px solid ${GOLD}`,
                                    borderRadius: 3,
                                    boxShadow: "0 3px 14px rgba(22,79,59,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
                                }}
                                onMouseEnter={(e) => {
                                    if (!copied) {
                                        e.currentTarget.style.background = "linear-gradient(135deg, #1f7d5a, #1a6b4f)";
                                        e.currentTarget.style.boxShadow = `0 5px 20px rgba(22,79,59,0.5), 0 0 0 1px ${GOLD}`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = `linear-gradient(135deg, ${EMERALD}, #1a6b4f)`;
                                    e.currentTarget.style.boxShadow = "0 3px 14px rgba(22,79,59,0.35), inset 0 1px 0 rgba(255,255,255,0.05)";
                                }}
                                aria-label="Copy server IP"
                            >
                                {copied ? <FaCheck size={15} style={{ color: GOLD_LT }} /> : <FaCompass size={15} style={{ opacity: 0.85 }} />}
                                {copied ? "IP Copied!" : "Begin Your Journey"}
                            </button>

                            {/* Secondary: View World Map */}
                            <a
                                href="https://smp.hayanura.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-2.5 w-full sm:w-auto transition-all duration-200"
                                style={{
                                    fontFamily: "var(--font-inter), sans-serif",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    letterSpacing: "0.07em",
                                    textTransform: "uppercase" as const,
                                    textDecoration: "none",
                                    padding: "15px 30px",
                                    background: "rgba(245,240,228,0.05)",
                                    color: "rgba(245,240,228,0.65)",
                                    border: "1px solid rgba(201,162,78,0.22)",
                                    borderRadius: 3,
                                }}
                                onMouseEnter={(e) => {
                                    const t = e.currentTarget;
                                    t.style.background = "rgba(245,240,228,0.09)";
                                    t.style.borderColor = "rgba(201,162,78,0.4)";
                                    t.style.color = GOLD_LT;
                                }}
                                onMouseLeave={(e) => {
                                    const t = e.currentTarget;
                                    t.style.background = "rgba(245,240,228,0.05)";
                                    t.style.borderColor = "rgba(201,162,78,0.22)";
                                    t.style.color = "rgba(245,240,228,0.65)";
                                }}
                            >
                                <FaMap size={15} style={{ opacity: 0.7 }} />
                                Explore SMP Website
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </section>
    );
};

const MemoizedHayaSMPSection = memo(HayaSMPSection);
export default MemoizedHayaSMPSection;
