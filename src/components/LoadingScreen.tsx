"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Set a session cookie (no expires date) so the server knows not to render this again
    // until the user closes their browser and starts a new session.
    document.cookie = "hayanura-loading-seen=true; path=/; samesite=strict";

    // Show for 3.5 seconds total
    const timer = setTimeout(() => {
      setShow(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.15,
            filter: "blur(10px)", 
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden pointer-events-auto"
        >
          {/* Deep ambient background pulse */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            className="absolute w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,1)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* The Text Container */}
            <div className="relative flex items-center justify-center">
              {/* Base Text (Ultra-faint phantom text) */}
              <h1 className="font-garamond text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] font-normal pl-[0.2em] select-none text-[#0a0a0a]">
                Hayanura
              </h1>
              
              {/* Top Text (Illuminated Gold) */}
              <motion.h1 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 2.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="absolute font-garamond text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] font-normal pl-[0.2em] select-none text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                style={{
                  backgroundImage: "linear-gradient(to right, #FDE68A, #D4AF37, #FFF8D6, #D4AF37, #996515)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundSize: "200% auto",
                }}
              >
                Hayanura
              </motion.h1>
              
              {/* Anamorphic Lens Flare (Sweeps with the text) */}
              <motion.div
                initial={{ left: "-10%", opacity: 0 }}
                animate={{ left: "110%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20"
              >
                {/* Core bright spot */}
                <div className="w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]" />
                {/* Horizontal anamorphic flare */}
                <div className="absolute w-[150px] md:w-[300px] h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent blur-[1px]" />
                <div className="absolute w-[80px] md:w-[150px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]" />
                {/* Vertical soft spike */}
                <div className="absolute w-[1px] h-[80px] bg-gradient-to-b from-transparent via-white to-transparent blur-[1px]" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
              className="flex items-center gap-2 sm:gap-3 mt-6 z-10"
            >
              <span className="text-saffron-500/70 font-sans uppercase tracking-[0.2em] text-[9px] sm:text-[11px] font-medium">Animation</span>
              <span className="text-saffron-500/40 text-[8px] sm:text-[10px]">&bull;</span>
              <span className="text-saffron-500/70 font-sans uppercase tracking-[0.2em] text-[9px] sm:text-[11px] font-medium">Awareness</span>
              <span className="text-saffron-500/40 text-[8px] sm:text-[10px]">&bull;</span>
              <span className="text-saffron-500/70 font-sans uppercase tracking-[0.2em] text-[9px] sm:text-[11px] font-medium">Geopolitics</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
