"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Slower animation - more viewport range
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      
      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;
        
        return (
          <span
            key={index}
            className="transition-colors duration-150"
            style={{
              color: isRevealed ? "var(--foreground)" : "#e4e4e7",
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

const sideImages = [
  {
    src: "/images/feature-architecture.jpg",
    alt: "Modernist glass estate facade",
    position: "left",
    span: 1,
  },
  {
    src: "/images/feature-smarthome.jpg",
    alt: "High-end architectural interior",
    position: "left",
    span: 1,
  },
  {
    src: "/images/feature-panoramic.jpg",
    alt: "Contemporary luxury pool terrace",
    position: "right",
    span: 1,
  },
  {
    src: "/images/estate-residence-2.jpg",
    alt: "Architectural dining pavilion",
    position: "right",
    span: 1,
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const descriptionText = "Experience residential living elevated by world-class architecture. Every HomeAtlas estate balances sustainable geothermal climate engineering, panoramic solar-optimized glass, and timeless natural materials. From oceanfront bluffs to alpine summits, each property is an enduring sanctuary in harmony with its surroundings.";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);

      // Text scroll progress
      if (textSectionRef.current) {
        const textRect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const startOffset = windowHeight * 0.9;
        const endOffset = windowHeight * 0.1;
        
        const totalDistance = startOffset - endOffset;
        const currentPosition = startOffset - textRect.top;
        
        const newTextProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
        setTextProgress(newTextProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Title fades out first (0 to 0.2)
  const titleOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after title fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations (optimized so all images are balanced & visible on mobile and desktop)
  const centerWidth = isMobile
    ? 100 - (imageProgress * 52) // 100% down to 48% on mobile
    : 100 - (imageProgress * 58); // 100% down to 42% on desktop
  const centerHeight = isMobile
    ? 100 - (imageProgress * 48) // 100% down to 52% on mobile to fit cleanly in viewport
    : 100 - (imageProgress * 30);
  const sideWidth = isMobile
    ? imageProgress * 23.5 // reaches 23.5% on mobile (23.5 + 48 + 23.5 = 95%)
    : imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * (isMobile ? 12 : 24);
  const gap = imageProgress * (isMobile ? 6 : 16);

  // Vertical offset: 0 on mobile to keep all side images aligned and visible within viewport
  const sideTranslateY = isMobile ? 0 : -(imageProgress * 15);
  const paddingVal = imageProgress * (isMobile ? 6 : 16);
  const paddingBottomVal = isMobile ? paddingVal : 60 + (imageProgress * 40);

  // Calculate grayscale for text section based on textProgress
  const grayscaleAmount = Math.round((1 - textProgress) * 100);

  return (
    <section ref={sectionRef} className="relative bg-foreground overflow-x-clip">
      {/* Sticky container for scroll animation with 100dvh support */}
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-center justify-center"
            style={{ 
              gap: `${gap}px`, 
              paddingTop: `${paddingVal}px`,
              paddingLeft: `${paddingVal}px`,
              paddingRight: `${paddingVal}px`,
              paddingBottom: `${paddingBottomVal}px`,
            }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: `${centerHeight}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={isMobile ? "25vw" : "22vw"}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Center Image */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/architecture-center.jpg"
                alt="Aerial view of luxury modern architectural oceanfront compound"
                fill
                sizes={isMobile ? "50vw" : "42vw"}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40" />
              
              {/* Title Text - Fades out word by word with blur */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                <h2 className="max-w-3xl font-medium leading-tight tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                  {["Architecture", "Meets", "Sanctuary."].map((word, index) => {
                    // Each word fades out sequentially based on scrollProgress
                    const wordFadeStart = index * 0.07; // Architecture: 0, Meets: 0.07, Sanctuary: 0.14
                    const wordFadeEnd = wordFadeStart + 0.07;
                    const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
                    const wordOpacity = 1 - wordProgress;
                    const wordBlur = wordProgress * 10; // 0px to 10px blur
                    
                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={{
                          opacity: wordOpacity,
                          filter: `blur(${wordBlur}px)`,
                          transition: 'opacity 0.1s linear, filter 0.1s linear',
                          marginRight: index < 2 ? '0.3em' : '0',
                        }}
                      >
                        {word}
                        {index === 1 && <br />}
                      </span>
                    );
                  })}
                </h2>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: `${centerHeight}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={isMobile ? "25vw" : "22vw"}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Description Section with Background Image and Scroll Reveal */}
      <div 
        ref={textSectionRef}
        className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
      >
        {/* Background Image with Grayscale Filter */}
        

        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
