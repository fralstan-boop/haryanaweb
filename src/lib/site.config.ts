export const siteConfig = {
  brand: {
    name: "HAYANURA",
    tagline: "Geopolitics • History • Animated Storytelling",
    mission:
      "Explaining geopolitics and history for the Indian generation.",
    description:
      "HAYANURA creates animated geopolitical and historical narratives focused on global power struggles, military developments, and historical transformations, primarily for an Indian audience.",
    seoDescription:
      "HAYANURA | Animated geopolitical and historical storytelling for India. 287K+ subscribers, 137M+ views. Explore world history, defence updates, and modern Indian narratives.",
  },

  stats: {
    subscribers: "287,543",
    subscribersShort: "287K+",
    totalViews: "137,417,961",
    totalViewsShort: "137M+",
    discordMembers: "2928+",
  },

  links: {
    youtube: "https://www.youtube.com/@HAYANURA",
    discord: "https://dsc.gg/hayanura",
    twitter: "https://x.com/AdityaBhas79458",
    instagram: "https://instagram.com/@hayanura_official",
    hayaosint: "https://hayalandia.netlify.app",
    hayasmp: "https://smp.hayanura.in",
    email: "adbhs478@gmail.com",
  },

  nav: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "HayaOSINT", href: "#hayaosint" },
    { label: "Community", href: "#community" },
    { label: "HayaSMP", href: "#hayasmp" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
