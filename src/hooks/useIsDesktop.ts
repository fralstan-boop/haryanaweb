"use client";

import { useEffect, useState } from "react";

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    
    const checkIsDesktop = () => {
      // 1. Check screen width (Standard desktop breakpoint)
      const isLargeScreen = media.matches;
      
      // 2. Check User Agent (Allows mobile users in "Desktop Mode")
      // Mobile "Desktop Mode" usually spoofs a Desktop UA (Windows, Macintosh, or X11/Linux)
      const ua = navigator.userAgent;
      const isDesktopUA = /Windows|Macintosh|X11/.test(ua);
      
      // We allow access if it's a large screen OR a desktop-spoofing UA
      return isLargeScreen || isDesktopUA;
    };

    const update = () => {
      setIsDesktop(checkIsDesktop());
      setChecked(true);
    };

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return { isDesktop, checked };
}
