import {
  FaBullhorn,
  FaFilm,
  FaScissors,
  FaHandshake,
  FaNewspaper,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export const services: Service[] = [
  {
    id: "s1",
    title: "Sponsored Segments",
    description:
      "Reach 286K+ engaged viewers through natively integrated sponsored segments in geopolitical content.",
    icon: FaBullhorn,
  },
  {
    id: "s2",
    title: "Geopolitical Animations",
    description:
      "Custom animated explainers on defence, diplomacy, or historical topics, tailored to your brand narrative.",
    icon: FaFilm,
  },
  {
    id: "s3",
    title: "Video Editing",
    description:
      "Professional editing for creators and brands. Cinematic motion graphics, pacing, and storytelling.",
    icon: FaScissors,
  },
  {
    id: "s4",
    title: "Brand Collaborations",
    description:
      "Strategic partnerships with brands aligned to education, tech, defence, and Indian cultural identity.",
    icon: FaHandshake,
  },
  {
    id: "s5",
    title: "Media Partnerships",
    description:
      "Collaborate on documentary-style series, news analysis, or cross-platform content projects.",
    icon: FaNewspaper,
  },
];
