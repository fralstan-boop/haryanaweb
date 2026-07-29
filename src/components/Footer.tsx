import { siteConfig } from "@/lib/site.config";
import Image from "next/image";
import {
  FaYoutube,
  FaDiscord,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

const socialLinks = [
  { icon: FaYoutube, href: siteConfig.links.youtube, label: "YouTube" },
  { icon: FaDiscord, href: siteConfig.links.discord, label: "Discord" },
  { icon: FaXTwitter, href: siteConfig.links.twitter, label: "Twitter / X" },
  { icon: FaInstagram, href: siteConfig.links.instagram, label: "Instagram" },
];


export default function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-pattern" />

      <div className="footer-content mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/hayacorp.png" 
                alt="HayaCorp logo"
                className="footer-brand-stamp"
              />
            </div>
            <p className="mt-4 text-sm text-slate-300/80 max-w-xs leading-relaxed mx-auto md:mx-0">
              {siteConfig.brand.mission}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold font-cinzel uppercase tracking-[0.2em] text-amber-500 mb-6 drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteConfig.nav.slice(1, 7).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xs font-bold font-cinzel uppercase tracking-[0.2em] text-amber-500 mb-6 drop-shadow-sm">
              Connect
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-300"
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
            
            <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/5 shadow-inner flex flex-col items-center md:items-start w-full max-w-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Business Enquiries</span>
              <p className="text-sm text-slate-200 font-medium">
                {siteConfig.links.email}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12" />
        <p className="mt-6 text-center text-xs text-slate-400/80 font-medium tracking-wide">
          © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
