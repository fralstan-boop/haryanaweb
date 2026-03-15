"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import "./CardNav.css";

interface CardNavProps {
  navItems: {
    title: string;
    links: { label: string; href: string }[];
    background: string;
  }[];
  scrolled: boolean;
}

export default function CardNav({ navItems, scrolled }: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isOpen) {
      gsap.to(container, {
        height: "auto", // Automatically resolves to the required height of expanded cards
        duration: 0.65,
        ease: "back.out(1.2)", // Soft bounce on container expansion
      });
      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.55,
        ease: "back.out(1.5)", // Soft bounce on items appearing
        delay: 0.15,
      });
    } else {
      gsap.to(container, {
        height: 64, // Collapsed height
        duration: 0.5,
        ease: "back.in(1.2)", // Bouncy retreat for container
        delay: 0.15,
      });
      gsap.to(cardsRef.current, {
        y: 20,
        opacity: 0,
        stagger: 0.04,
        duration: 0.4,
        ease: "back.in(1.5)", // Bouncy retreat for items
      });
    }
  }, [isOpen]);

  // Close menu on navigation
  useEffect(() => {
    const handleHashChange = () => setIsOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className={`card-nav-container ${scrolled ? "scrolled" : ""}`}>
      <div ref={containerRef} className={`card-nav ${isOpen ? "open" : ""}`}>
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
        <div className="card-nav-content">
          {navItems.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="nav-card"
              style={{ background: item.background }}
            >
              <h3 className="nav-card-label">{item.title}</h3>
              <div className="nav-card-links">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nav-card-link group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="nav-card-link-icon">↗</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
