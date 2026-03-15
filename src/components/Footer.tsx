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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://github.com/fralstan-boop/etwf/blob/main/hayacorp.png?raw=true" 
                alt="HayaCorp logo"
                className="footer-brand-stamp"
              />
            </div>
            <p className="mt-4 text-sm text-[#2a1b10]/80 max-w-xs leading-relaxed">
              {siteConfig.brand.mission}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b140d]/60 mb-4">
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

          {/* Social */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b140d]/60 mb-4">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-[#1b140d]/5 border border-[#1b140d]/10 flex items-center justify-center text-[#2a1b10] hover:text-[#000000] hover:bg-[#1b140d]/10 transition-all duration-300"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#2a1b10]/70 font-medium">
              {siteConfig.links.email}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="h-px w-full bg-[#1b140d]/10 mt-10" />
        <p className="mt-6 text-center text-xs text-[#2a1b10]/60 font-medium">
          © {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
