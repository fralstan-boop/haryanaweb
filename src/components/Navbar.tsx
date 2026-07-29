"use client";

import { useState, useEffect } from "react";
import CardNav from "@/components/ui/CardNav";
import { FaHome, FaInfoCircle, FaUsers, FaBriefcase, FaSearch, FaCubes, FaHandshake, FaEnvelope, FaDiscord, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
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
        { label: "Home", href: "#hero", icon: <FaHome /> },
        { label: "About", href: "#about", icon: <FaInfoCircle /> },
        { label: "Community", href: "#community", icon: <FaUsers />, hideOnMobile: true },
      ]
    },
    {
      title: "Projects",
      background: "#101C35",
      links: [
        { label: "Work", href: "#work", icon: <FaBriefcase /> },
        { label: "HayaOSINT", href: "#hayaosint", icon: <FaSearch /> },
        { label: "HayaSMP", href: "#hayasmp", icon: <FaCubes />, hideOnMobile: true },
        { label: "Services", href: "#services", icon: <FaHandshake /> },
      ]
    },
    {
      title: "Connect",
      background: "#16284A",
      links: [
        { label: "Contact", href: "#contact", icon: <FaEnvelope /> },
        { label: "Our Discord", href: "https://dsc.gg/hayanura", icon: <FaDiscord /> },
        { label: "YouTube Channel", href: "https://www.youtube.com/@HAYANURA", icon: <FaYoutube /> },
        { label: "Instagram", href: "https://instagram.com/@hayanura_official", icon: <FaInstagram /> },
      ]
    }
  ];

  return (
    <nav role="navigation" aria-label="Main navigation" className="relative z-[1000]">
      <CardNav navItems={navItems} scrolled={scrolled} />
    </nav>
  );
}
