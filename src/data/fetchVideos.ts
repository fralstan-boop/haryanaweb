import { stripe1Videos, stripe2Videos, Video } from "./videos";

export async function getYouTubeData() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.log("No YOUTUBE_API_KEY found, falling back to static video data.");
    return { row1Items: [...stripe1Videos, ...stripe1Videos], row2Items: [...stripe2Videos, ...stripe2Videos] };
  }

  const allVideos = [...stripe1Videos, ...stripe2Videos];
  // Filter only youtube/shorts based on url/platform if needed.
  // The user requested YouTube-only, and all current static entries are YT.
  const videoIds = allVideos.map((v) => v.youtubeId).filter(Boolean);

  if (videoIds.length === 0) {
    return { row1Items: [...stripe1Videos, ...stripe1Videos], row2Items: [...stripe2Videos, ...stripe2Videos] };
  }

  try {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(",")}&key=${apiKey}`;
    // Next.js standard static build-time fetching (caches the result)
    const res = await fetch(url, { cache: 'force-cache' });

    if (!res.ok) {
      console.error("YouTube API error:", await res.text());
      return { row1Items: [...stripe1Videos, ...stripe1Videos], row2Items: [...stripe2Videos, ...stripe2Videos] };
    }

    const data = await res.json();
    const statsMap = new Map();

    data.items?.forEach((item: any) => {
      const views = item.statistics?.viewCount || 0;
      let viewString = "";

      // Format view counts like "1.2M Views" or "45K Views"
      if (views >= 1000000) {
        viewString = (views / 1000000).toFixed(1).replace(/\.0$/, '') + "M Views";
      } else if (views >= 1000) {
        viewString = (views / 1000).toFixed(1).replace(/\.0$/, '') + "K Views";
      } else {
        viewString = views + " Views";
      }

      statsMap.set(item.id, {
        title: item.snippet?.title,
        views: viewString,
      });
    });

    const mergeData = (videos: Video[]) =>
      videos.map(v => {
        const liveData = statsMap.get(v.youtubeId);
        if (liveData) {
          return {
            ...v,
            title: liveData.title || v.title,
            views: liveData.views || v.views,
          };
        }
        return v;
      });

    const updatedRow1 = mergeData(stripe1Videos);
    const updatedRow2 = mergeData(stripe2Videos);

    return {
      row1Items: [...updatedRow1, ...updatedRow1],
      row2Items: [...updatedRow2, ...updatedRow2]
    };
  } catch (error) {
    console.error("Failed to fetch YouTube data:", error);
    return { row1Items: [...stripe1Videos, ...stripe1Videos], row2Items: [...stripe2Videos, ...stripe2Videos] };
  }
}
