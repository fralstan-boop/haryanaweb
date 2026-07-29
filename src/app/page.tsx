import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BackgroundEffects from "@/components/BackgroundEffects";
import PageSections from "@/components/PageSections";
import { getYouTubeData } from "@/data/fetchVideos";

// Static imports for light above-the-fold content
import HeroSection from "@/components/sections/HeroSection";
import CreatorSection from "@/components/sections/CreatorSection";

export default async function Home() {
  const videoData = await getYouTubeData();

  // videoData is an object: { row1Items: [...], row2Items: [...] }
  // Extract and deduplicate videos for the schema
  const allVideos = [...(videoData.row1Items || []), ...(videoData.row2Items || [])];
  const uniqueVideos = Array.from(new Map(allVideos.map(v => [v.id || v.youtubeId, v])).values());

  // Generate VideoObject Schema for AI indexing
  const videoSchemas = uniqueVideos.map((video: any) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.title,
    "thumbnailUrl": video.thumbnail,
    "uploadDate": "2024-01-01T08:00:00+08:00", // Fallback if API doesn't provide exact date
    "embedUrl": `https://www.youtube.com/embed/${video.youtubeId || video.id}`,
    "publisher": {
      "@type": "Organization",
      "name": "HAYANURA",
      "logo": {
        "@type": "ImageObject",

        "url": "https://hayanura.in/logo.png"
      }
    }
  }));

  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemas) }}
      />
      <PageTransition>
        <main className="relative z-10 flex flex-col bg-[#02060F]">
          <HeroSection />
          <CreatorSection />
          <PageSections initialVideoData={videoData} />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
