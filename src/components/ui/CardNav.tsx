"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import "./CardNav.css";

interface CardNavProps {
  navItems: {
    title: string;
    links: { label: string; href: string; icon?: React.ReactNode }[];
    background: string;
  }[];
  scrolled: boolean;
}

export default function CardNav({ navItems, scrolled }: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on navigation
  useEffect(() => {
    const handleHashChange = () => setIsOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className={`card-nav-container ${scrolled ? "scrolled" : ""}`}>
      <div className={`card-nav ${isOpen ? "open" : ""}`}>
        {/* Top Navbar Area */}
        <div className="card-nav-top">
          {/* Left: Hamburger */}
          <div
            className={`hamburger-menu ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleMenu();
            }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Right: Brand and Logo */}
          <a
            href="#hero"
            className="logo-container"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-2.5">
              <span className="font-cinzel text-[17px] font-bold tracking-[0.14em] brand-text">
                HAYANURA
              </span>
              <Image
                src="/logo.png"
                alt="HAYANURA Logo"
                width={32}
                height={32}
                unoptimized
                className="rounded-sm object-contain"
              />
            </div>
          </a>
        </div>

        {/* Expanded Navigation Cards Area */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { height: "auto", opacity: 1 },
                collapsed: { height: 0, opacity: 0 }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 pt-2 flex flex-col md:flex-row gap-5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: isOpen ? index * 0.05 : 0,
                      ease: "easeOut"
                    }}
                    className="flex-1 rounded-[18px] p-7 md:p-9 flex flex-col border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    style={{ background: item.background }}
                  >
                    <h3 className="font-cinzel font-bold text-xl md:text-2xl text-amber-500 mb-6 tracking-wider drop-shadow-md">
                      {item.title}
                    </h3>
                    <div className="flex flex-col gap-4">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="group font-inter text-[15px] font-medium text-slate-300 hover:text-white flex items-center transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="flex items-center justify-center text-[15px] w-9 h-9 rounded-full bg-white/5 text-amber-500 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-orange-500 group-hover:text-navy-950 mr-4 transition-all duration-300 shadow-sm">
                            {link.icon ? link.icon : "↗"}
                          </span>
                          <span className="group-hover:translate-x-1.5 transition-transform duration-300 tracking-wide">
                            {link.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
