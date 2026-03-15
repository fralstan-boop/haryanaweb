export const colors = {
  saffron: {
    50: "#fff4e6",
    100: "#ffe0b2",
    200: "#ffcc80",
    300: "#ffb347",
    400: "#ff9e2c",
    500: "#ff8c1a",
    600: "#e67a17",
    DEFAULT: "#ff8c1a",
    glow: "rgba(255,140,26,0.35)",
    glowStrong: "rgba(255,140,26,0.55)",
    glowSubtle: "rgba(255,140,26,0.12)",
  },
  navy: {
    950: "#040a17",
    900: "#081326",
    800: "#0c1a33",
    700: "#111f3d",
    600: "#172648",
    DEFAULT: "#081326",
  },
  charcoal: {
    900: "#0a0f1e",
    800: "#0f172a",
    700: "#1a2236",
    600: "#242d42",
    DEFAULT: "#0f172a",
  },
  gold: {
    400: "#f6b73c",
    500: "#e5a52e",
    DEFAULT: "#f6b73c",
  },
  text: {
    primary: "#eef2f7",
    secondary: "#8e9bb8",
    muted: "#556380",
  },
} as const;

export const animation = {
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
    snappy: [0.68, -0.55, 0.27, 1.55] as const,
    entrance: [0.0, 0.0, 0.2, 1.0] as const,
    cinematic: [0.16, 1, 0.3, 1] as const,
  },
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    cinematic: 1.0,
    epic: 1.4,
  },
} as const;

export const shadows = {
  glow: `0 0 24px rgba(255,140,26,0.3)`,
  glowStrong: `0 0 48px rgba(255,140,26,0.45)`,
  glowSubtle: `0 0 12px rgba(255,140,26,0.15)`,
  card: "0 4px 24px rgba(0,0,0,0.5)",
  cardHover: "0 12px 48px rgba(0,0,0,0.7), 0 0 20px rgba(255,140,26,0.1)",
} as const;
