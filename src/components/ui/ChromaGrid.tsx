"use client";

import { useRef, useEffect, useCallback } from "react";
import "./ChromaGrid.css";

interface ChromaGridItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

export default function ChromaGrid({
  items,
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
}: ChromaGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    targetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * damping;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * damping;

      const px = ((mouseRef.current.x / grid.offsetWidth) * 100).toFixed(1);
      const py = ((mouseRef.current.y / grid.offsetHeight) * 100).toFixed(1);

      grid.style.setProperty("--x", `${px}%`);
      grid.style.setProperty("--y", `${py}%`);
      grid.style.setProperty("--r", `${radius}px`);

      // Per-card spotlight
      const cards = grid.querySelectorAll<HTMLElement>(".chroma-card");
      cards.forEach((card) => {
        const cr = card.getBoundingClientRect();
        const gr = grid.getBoundingClientRect();
        const cx = mouseRef.current.x - (cr.left - gr.left);
        const cy = mouseRef.current.y - (cr.top - gr.top);
        card.style.setProperty("--mouse-x", `${cx}px`);
        card.style.setProperty("--mouse-y", `${cy}px`);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, damping, radius]);

  const cols = Math.min(items.length, 3);

  return (
    <div
      ref={gridRef}
      className="chroma-grid"
      style={{ "--cols": cols } as React.CSSProperties}
    >
      {/* Overlay */}
      <div className="chroma-overlay" />
      {/* Fade */}
      <div className="chroma-fade" style={{ opacity: fadeOut }} />

      {items.map((item, i) => {
        const Wrapper = item.url ? "a" : "div";
        const linkProps = item.url
          ? { href: item.url, target: "_blank" as const, rel: "noopener noreferrer" }
          : {};

        return (
          <Wrapper
            key={i}
            className="chroma-card"
            style={{
              "--card-border": item.borderColor || "#FF8228",
              "--card-gradient": item.gradient || "linear-gradient(145deg, #0A1F3D, #050B18)",
              "--spotlight-color": "rgba(255,130,40,0.15)",
            } as React.CSSProperties}
            {...linkProps}
          >
            <div className="chroma-img-wrapper">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="chroma-info">
              <h3>{item.title}</h3>
              <span className="role">{item.subtitle}</span>
              {item.handle && <span className="handle">{item.handle}</span>}
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
