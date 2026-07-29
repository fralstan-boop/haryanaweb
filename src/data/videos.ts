export interface Video {
  id: string;
  title: string;
  views: string;
  youtubeId: string;
  url: string;
  isShort?: boolean;
}

export const stripe1Videos: Video[] = [
  {
    id: "s1",
    title: "OPERATION SINDOOR ❤️‍🔥🇮🇳 - Countryballs Edit",
    youtubeId: "ZkQLGfHEWHc",
    views: "10.5M Views",
    url: "https://youtube.com/shorts/ZkQLGfHEWHc",
    isShort: true,
  },
  {
    id: "s2",
    title: "BMV or BMW 🤔 - Take the edit either 😋🎀",
    youtubeId: "1_xSPlqyg3w",
    views: "3.7M Views",
    url: "https://youtube.com/shorts/1_xSPlqyg3w",
    isShort: true,
  },
  {
    id: "yt1",
    title: "Chath Puja 🪔 - Countryballs Edit",
    youtubeId: "gS1QuaAXCds",
    views: "14.9K Views",
    url: "https://youtu.be/gS1QuaAXCds",
  },
  {
    id: "s3",
    title: "Plan Backfired 💀🙏 #countryballs #india",
    youtubeId: "Px0sxx0EoJ4",
    views: "1.2M Views",
    url: "https://youtube.com/shorts/Px0sxx0EoJ4",
    isShort: true,
  },
  {
    id: "yt2",
    title: "RAW 🇮🇳 Edit 💀😩🔥 #countryballs",
    youtubeId: "umJfPDVTUaY",
    views: "55.9K Views",
    url: "https://youtu.be/umJfPDVTUaY",
  },
  {
    id: "yt4",
    title: "Hormuz Blocked!? Not a problem! 😎",
    youtubeId: "0xmydXjXqgI",
    views: "664K Views",
    url: "https://youtube.com/shorts/0xmydXjXqgI",
    isShort: true,
  },
  {
    id: "yt6",
    title: "What are the GREATEST Indian empires?",
    youtubeId: "9JkhQrqs3rI",
    views: "1.2M Views",
    url: "https://youtu.be/9JkhQrqs3rI",
  },
];

export const stripe2Videos: Video[] = [
  {
    id: "s4",
    title: "NUCLEAR TRIADS 💀🔥 #shorts #mapping",
    youtubeId: "JB0K9gdK0Hk",
    views: "816K Views",
    url: "https://youtube.com/shorts/JB0K9gdK0Hk",
    isShort: true,
  },
  {
    id: "s5",
    title: "Bihar now 🤡 vs Bihar then 🗿",
    youtubeId: "CkZZrsOYpsY",
    views: "866K Views",
    url: "https://youtube.com/shorts/CkZZrsOYpsY",
    isShort: true,
  },
  {
    id: "s6",
    title: "\"The top 4\"-...😂💀🔥 #countryballs",
    youtubeId: "mX9ziwolH30",
    views: "9.2M Views",
    url: "https://youtube.com/shorts/mX9ziwolH30",
    isShort: true,
  },
  {
    id: "s7",
    title: "What are the GREATEST Indian empires?🤔",
    youtubeId: "bMnPFrzvK7k",
    views: "796K Views",
    url: "https://youtube.com/shorts/bMnPFrzvK7k",
    isShort: true,
  },
  {
    id: "yt8",
    title: "1971 INDO-PAK BANGLADESH LIBERATION WAR EDIT",
    youtubeId: "GzJ_hwv0Ul4",
    views: "3.5M Views",
    url: "https://youtu.be/GzJ_hwv0Ul4",
  },
  {
    id: "yt9",
    title: "Indian 🇮🇳 Air Force Edit🔥🗣️ #indianarmy",
    youtubeId: "f2a6zBRjzKc",
    views: "340K Views",
    url: "https://youtu.be/f2a6zBRjzKc",
  },
  {
    id: "yt10",
    title: "IAF 🇮🇳 - MIG 25 EDIT | भारतीय वायु सेना",
    youtubeId: "JpED2aEHgU8",
    views: "420K Views",
    url: "https://youtu.be/JpED2aEHgU8",
  },
];

// Fallback legacy export for backwards compatibility
export const videos: Video[] = stripe1Videos;


