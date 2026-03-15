"use client";

import { useState, useEffect } from "react";
import CardNav from "@/components/ui/CardNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Map the navigation items to the 3-card structure requested
  const navItems = [
    {
      title: "Navigation",
      background: "#0B1426",
      links: [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "Community", href: "#community" },
      ]
    },
    {
      title: "Projects",
      background: "#101C35",
      links: [
        { label: "Work", href: "#work" },
        { label: "HayaOSINT", href: "#hayaosint" },
        { label: "HayaSMP", href: "#smp" },
        { label: "Services", href: "#services" },
      ]
    },
    {
      title: "Connect",
      background: "#16284A",
      links: [
        { label: "Contact", href: "#contact" },
        { label: "Our Discord", href: "https://dsc.gg/hayanura" },
        { label: "YouTube Channel", href: "https://www.youtube.com/@HAYANURA" },
        { label: "Instagram", href: "https://instagram.com/@hayanura_official" },
      ]
    }
  ];

  return (
    <nav role="navigation" aria-label="Main navigation" className="relative z-[1000]">
      <CardNav navItems={navItems} scrolled={scrolled} />
    </nav>
  );
}
