"use client";

import dynamic from "next/dynamic";
import LazySection from "@/components/LazySection";
import { Video } from "@/data/videos";

// Dynamic imports for heavy below-the-fold sections
const FeaturedWorkSection = dynamic(() => import("@/components/sections/FeaturedWorkSection"), { 
  ssr: false, 
  loading: () => <div className="h-[400px]" /> 
});
const HayaOsintSection = dynamic(() => import("@/components/sections/HayaOsintSection"), { 
  ssr: false, 
  loading: () => <div className="h-[600px]" /> 
});
const CommunitySection = dynamic(() => import("@/components/sections/CommunitySection"), { 
  ssr: false, 
  loading: () => <div className="h-[600px]" /> 
});
const HayaSMPSection = dynamic(() => import("@/components/sections/HayaSMPSection"), { 
  ssr: false, 
  loading: () => <div className="h-[600px]" /> 
});
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { 
  ssr: false, 
  loading: () => <div className="h-[600px]" /> 
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { 
  ssr: false, 
  loading: () => <div className="h-[600px]" /> 
});

interface PageSectionsProps {
  initialVideoData?: {
    row1Items: Video[];
    row2Items: Video[];
  };
}

export default function PageSections({ initialVideoData }: PageSectionsProps) {
  return (
    <>
      <LazySection><FeaturedWorkSection videoData={initialVideoData} /></LazySection>
      <LazySection><HayaOsintSection /></LazySection>
      <LazySection><CommunitySection /></LazySection>
      <LazySection><HayaSMPSection /></LazySection>
      <LazySection><ServicesSection /></LazySection>
      <LazySection><ContactSection /></LazySection>
    </>
  );
}
