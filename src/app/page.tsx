import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import BackgroundEffects from "@/components/BackgroundEffects";
import PageSections from "@/components/PageSections";

// Static imports for light above-the-fold content
import HeroSection from "@/components/sections/HeroSection";
import CreatorSection from "@/components/sections/CreatorSection";

export default function Home() {
  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <PageTransition>
        <main className="relative z-10 flex flex-col bg-[#02060F]">
          <HeroSection />
          <CreatorSection />
          <PageSections />

        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
