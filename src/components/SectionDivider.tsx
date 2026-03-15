import Image from "next/image";

const dividers = [
  "/images/dividers/divider1.png",
  "/images/dividers/divider2.png",
  "/images/dividers/divider3.png",
];

interface SectionDividerProps {
  index: number;
}

export default function SectionDivider({ index }: SectionDividerProps) {
  const imgSrc = dividers[index % dividers.length];

  return (
    <div className="w-full flex justify-center items-center relative z-10 pointer-events-none -my-8 md:-my-12 mix-blend-screen h-0 overflow-visible">
      <Image
        src={imgSrc}
        alt="Section Divider"
        width={800}
        height={50}
        unoptimized
        className="w-[45%] max-w-[300px] h-auto object-contain opacity-70 translate-y-6"
        style={{
          filter: "drop-shadow(0 0 15px rgba(255,180,60,0.25))",
        }}
      />
    </div>
  );
}
