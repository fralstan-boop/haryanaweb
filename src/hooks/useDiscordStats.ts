import { useState, useEffect } from "react";

export function useDiscordStats() {
  const [stats, setStats] = useState({ members: 2928, online: 354 });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/discord-stats");
        if (res.ok) {
          const data = await res.json();
          if (data && data.members > 0) {
            setStats(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Discord stats", error);
      }
    }
    
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  return stats;
}
