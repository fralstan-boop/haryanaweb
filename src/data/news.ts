export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  category: string;
  date: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    headline: "India Successfully Tests Agni-VI ICBM",
    summary:
      "India's strategic missile programme reaches a new milestone with the successful test of the Agni-VI, extending range to 12,000 km.",
    category: "Defence",
    date: "2026-03-10",
  },
  {
    id: "n2",
    headline: "South China Sea Tensions Escalate",
    summary:
      "Philippines and China face renewed confrontation near the Second Thomas Shoal as US conducts freedom-of-navigation ops.",
    category: "Geopolitics",
    date: "2026-03-08",
  },
  {
    id: "n3",
    headline: "India-France Rafale Marine Deal Signed",
    summary:
      "Indian Navy finalises order for 26 Rafale-M fighters for INS Vikrant, strengthening Indo-Pacific presence.",
    category: "Defence",
    date: "2026-03-05",
  },
  {
    id: "n4",
    headline: "Arctic Shipping Routes Reshape Global Trade",
    summary:
      "Melting ice opens new northern passages. India, Russia, and China jockey for strategic advantage.",
    category: "Global Affairs",
    date: "2026-03-02",
  },
];
