"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-5 sm:px-8 py-14 sm:py-20 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-lg sm:text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug text-center">
          HomeAtlas curates world-class modern architecture and trophy estates, 
          connecting discerning collectors with residences that redefine spatial luxury, privacy, and architectural permanence.
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
        <Image
          src="/images/architecture-center.jpg"
          alt="Modern luxury coastal estate with infinity pool at dusk"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
