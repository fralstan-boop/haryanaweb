"use client";

import { useEffect, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

const FireParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInit(true);
        });
      });
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="fire-particles"
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#FF8228",
          },
          number: {
            value: 20, // slightly lower count
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
          },
          opacity: {
            value: { min: 0.1, max: 0.35 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: {
            value: 2,
          },
          move: {
            enable: true,
            speed: 0.4, // slightly slower
            direction: "top", 
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default memo(FireParticles);

