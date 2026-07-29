"use client";

import { useEffect, useState } from "react";

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const check = () => {
      const ua = navigator.userAgent;
      const isGoogleBot = /Googlebot|Mediapartners-Google|AdsBot-Google/i.test(ua);
      const isDesktopUA = /Windows|Macintosh|Linux/i.test(ua);
      
      const mediaQuery = window.matchMedia("(min-width: 1024px)");
      
      // A device is considered "desktop" if:
      // 1. It has a large screen width (Desktop/Tablet landscape)
      // 2. Its User Agent explicitly claims to be a desktop OS (Desktop Mode on mobile)
      // 3. It's identified as Googlebot (to avoid blocking SEO crawlers)
      setIsDesktop(mediaQuery.matches || isDesktopUA || isGoogleBot);
      setChecked(true);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return { isDesktop, checked };
}
