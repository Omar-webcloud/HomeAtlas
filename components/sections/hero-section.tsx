"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "HOMEATLAS";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
    alt: "Modern luxury villa architecture",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000",
    alt: "Contemporary estate with reflection pool",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
    alt: "Minimalist luxury living pavilion",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000",
    alt: "Architectural terrace at dusk",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations (optimized for both mobile and desktop)
  const centerWidth = isMobile 
    ? 100 - (imageProgress * 24) // 100% to 76% on mobile so image stays prominent
    : 100 - (imageProgress * 58); // 100% to 42% on desktop
  const centerHeight = isMobile
    ? 100 - (imageProgress * 20)
    : 100 - (imageProgress * 30);
  const sideWidth = isMobile
    ? imageProgress * 12
    : imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100);
  const sideTranslateRight = 100 - (imageProgress * 100);
  const borderRadius = imageProgress * (isMobile ? 16 : 24);
  const gap = imageProgress * (isMobile ? 8 : 16);
  
  // Vertical offset for side columns
  const sideTranslateY = -(imageProgress * (isMobile ? 8 : 15));

  return (
    <section ref={sectionRef} className="relative bg-background overflow-x-clip">
      {/* Sticky container for scroll animation with 100dvh support */}
      <div className="sticky top-0 h-screen h-[100dvh] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ 
              gap: `${gap}px`, 
              padding: `${imageProgress * (isMobile ? 8 : 16)}px`, 
              paddingBottom: `${isMobile ? 40 + (imageProgress * 30) : 60 + (imageProgress * 40)}px` 
            }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
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
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
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
                src="/images/estate-hero-main.jpg"
                alt="Modern luxury architectural estate at sunset with infinity pool"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Text - Fades out first, vertically centered on mobile and bottom-aligned on desktop */}
              <div 
                className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start overflow-hidden px-3 sm:px-6 md:px-8 pb-0 md:pb-6"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-center md:text-left text-[9.5vw] xs:text-[11vw] sm:text-[13vw] md:text-[15vw] lg:text-[16.5vw] font-medium leading-[0.85] tracking-tight sm:tracking-tighter text-white select-none whitespace-nowrap">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
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
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
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

      {/* Tagline Section */}
      <div className="px-6 pt-20 pb-20 sm:pt-32 sm:pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Curated, timeless
          <br />
          and architectural sanctuaries.
        </p>
      </div>
    </section>
  );
}
