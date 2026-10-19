"use client";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "The Beverly Glass Pavilion",
    description: "5 Bed · 7 Bath · 8,400 sq ft · Beverly Hills, CA",
    price: "$14.8M",
    image: "/images/collection-glass-pavilion.jpg",
  },
  {
    id: 2,
    name: "The Aspen Ridge Chalet",
    description: "6 Bed · 8 Bath · 9,200 sq ft · Aspen, CO",
    price: "$22.5M",
    image: "/images/collection-alpine-chalet.jpg",
  },
  {
    id: 3,
    name: "The Tribeca Sky Penthouse",
    description: "4 Bed · 5 Bath · 5,600 sq ft · New York, NY",
    price: "$18.9M",
    image: "/images/collection-sky-penthouse.jpg",
  },
  {
    id: 4,
    name: "The Mediterranean Sea Villa",
    description: "5 Bed · 6 Bath · 7,100 sq ft · Costa Brava, Spain",
    price: "€11.2M",
    image: "/images/collection-coastal-villa.jpg",
  },
  {
    id: 5,
    name: "The Sonora Desert Sanctuary",
    description: "4 Bed · 5 Bath · 6,800 sq ft · Scottsdale, AZ",
    price: "$9.45M",
    image: "/images/collection-desert-villa.jpg",
  },
  {
    id: 6,
    name: "The Miami Waterfront Compound",
    description: "7 Bed · 9 Bath · 11,500 sq ft · Miami Beach, FL",
    price: "$28.0M",
    image: "/images/collection-waterfront-estate.jpg",
  },
];

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="px-4 sm:px-6 py-12 sm:py-16 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Featured Private Residences
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-16 sm:pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div 
          className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide overscroll-x-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group flex-shrink-0 w-[80vw] sm:w-[70vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
