"use client";

import { useState, useCallback, useRef, useEffect, memo } from "react";
import SectionWrapper from "@/components/SectionWrapper";
import { staggerItem } from "@/components/SectionWrapper";
import { motion, useReducedMotion, AnimatePresence, useInView } from "framer-motion";
import { FaPaperPlane, FaChevronDown } from "react-icons/fa6";
import Waves from "@/components/ui/Waves";
import emailjs from "@emailjs/browser";

const categories = [
  "Business Inquiry",
  "Collaboration",
  "Custom Project",
  "Sponsorship",
  "Media Partnership",
  "Other",
];

// EmailJS Credentials
const PUBLIC_KEY = "2nSuIW15fyWa1tRU8";
const SERVICE_ID = "service_um4150e";
const TEMPLATE_ADMIN = "template_6c3to9b";
const TEMPLATE_AUTOREPLY = "template_p3g0fsg";

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { margin: "200px 0px" });
  const prefersReducedMotion = useReducedMotion();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "cooldown" | "error">("idle");
  const [lastSubmit, setLastSubmit] = useState(0);

  // Custom dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Honeypot check (Temporarily disabled for testing as requested)
      /*
      if (formState.honeypot && formState.honeypot.trim() !== "") {
        console.warn("Spam detected via honeypot.");
        return;
      }
      */

      // Cooldown check (prevent spamming)
      const now = Date.now();
      if (now - lastSubmit < 30000) {
        setStatus("cooldown");
        return;
      }

      if (!formState.category) {
        alert("Please select a category.");
        return;
      }

      setStatus("sending");
      setLastSubmit(now);

      try {
        const params = {
          name: formState.name,
          email: formState.email,
          category: formState.category,
          message: formState.message,
        };

        // 1. Send Inquiry to Admin
        await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, params, PUBLIC_KEY);

        // 2. Send Auto-reply to User
        await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, params, PUBLIC_KEY);

        setStatus("sent");
        setFormState({ name: "", email: "", category: "", message: "", honeypot: "" });
        
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    },
    [formState, lastSubmit]
  );

  const inputStyles =
    "contact-panel-input w-full";

  return (
    <div ref={containerRef} className={`relative ${!isVisible ? 'paused-animations' : ''}`} style={{ contain: 'layout paint' }}>
      {/* ── Background Layer (Rendered behind SectionWrapper at z-0) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Waves
          lineColor="rgba(255, 180, 0, 0.95)"
          backgroundColor="transparent"
          waveSpeedX={0.0125}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
        {/* Soft edge masks to gently integrate top and bottom */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy-950/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/30 to-transparent" />
      </div>

      <SectionWrapper
        id="contact"
        title="Get in Touch"
        subtitle="Business inquiries, collaborations, and custom projects."
        className="overflow-hidden relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24"
        hideDivider={true}
        noPadding={true}
      >

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          className="contact-panel p-8"
          variants={prefersReducedMotion ? {} : staggerItem}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="honeypot"
              value={formState.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputStyles}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Category
              </label>
              <div
                className={`${inputStyles} cursor-pointer flex justify-between items-center min-h-[46px]`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <span className={formState.category ? "text-text-primary" : "text-text-muted/60"}>
                  {formState.category || "Select a category"}
                </span>
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <FaChevronDown className="text-text-muted/60 text-sm" />
                </motion.div>
              </div>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -15, scaleY: 0.9, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, scaleY: 0.95, filter: "blur(2px)" }}
                    transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.8 }}
                    className="absolute z-20 w-full mt-2 py-2 bg-navy-900/90 backdrop-blur-xl border border-[rgba(200,155,60,0.35)] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] origin-top overflow-hidden"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className="w-full text-left px-5 py-3 text-sm text-text-secondary hover:text-saffron-400 hover:bg-white/5 transition-colors"
                        onClick={() => {
                          setFormState((prev) => ({ ...prev, category: cat }));
                          setIsDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Hidden input to ensure required validation passes during form submit */}
              <input 
                type="text" 
                name="category" 
                required 
                value={formState.category} 
                onChange={() => {}} 
                className="absolute opacity-0 h-0 w-0" 
                tabIndex={-1} 
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell us about your project or idea..."
                className={`${inputStyles} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "cooldown"}
              className={`w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
                status === "error" 
                  ? "bg-red-500/80 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                  : "bg-gradient-to-r from-saffron-500 to-saffron-600 text-navy-900 hover:from-saffron-400 hover:to-saffron-500 hover:shadow-[0_0_32px_rgba(255,140,26,0.4)]"
              }`}
            >
              <FaPaperPlane />
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                  ? "Message Sent!"
                  : status === "error"
                    ? "Failed to Send"
                    : status === "cooldown"
                      ? "Please wait..."
                      : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
    </div>
  );
};

const MemoizedContactSection = memo(ContactSection);
export default MemoizedContactSection;

