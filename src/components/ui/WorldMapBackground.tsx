"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function WorldMapBackground() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none flex items-center justify-center overflow-hidden z-0">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120, center: [20, 15] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isIndia = geo.properties.name === "India";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isIndia ? "rgba(255, 130, 40, 0.4)" : "transparent"}
                  stroke={isIndia ? "#FF8228" : "rgba(255, 130, 40, 0.4)"}
                  strokeWidth={isIndia ? 1.5 : 0.5}
                  style={{
                    default: {
                      outline: "none",
                      filter: isIndia
                        ? "drop-shadow(0 0 8px rgba(255,130,40,0.8))"
                        : "drop-shadow(0 0 2px rgba(255,130,40,0.15))",
                      animation: isIndia ? "mapPulse 4s infinite ease-in-out" : "none",
                    },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <style jsx>{`
        @keyframes mapPulse {
          0% { opacity: 0.7; filter: drop-shadow(0 0 4px rgba(255, 130, 40, 0.4)); }
          50% { opacity: 1; filter: drop-shadow(0 0 12px rgba(255, 130, 40, 0.8)); }
          100% { opacity: 0.7; filter: drop-shadow(0 0 4px rgba(255, 130, 40, 0.4)); }
        }
      `}</style>
    </div>
  );
}
