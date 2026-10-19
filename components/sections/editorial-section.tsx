"use client";

const specs = [
  { label: "Portfolio Value", value: "$2.4B+" },
  { label: "Global Destinations", value: "34" },
  { label: "Private Estates", value: "140+" },
  { label: "Client Satisfaction", value: "99.4%" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className={`border-b border-border p-4 sm:p-6 md:p-8 text-center md:border-b-0 ${
              index % 2 === 0 ? "border-r" : ""
            } md:border-r md:last:border-r-0`}
          >
            <p className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-2xl sm:text-3xl md:text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          src="/real-estate-video.mp4"
        />
      </div>
    </section>
  );
}
