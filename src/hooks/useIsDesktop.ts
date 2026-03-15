"use client";

import { useEffect, useState } from "react";

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setIsDesktop(media.matches);
      setChecked(true);
    };

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return { isDesktop, checked };
}
