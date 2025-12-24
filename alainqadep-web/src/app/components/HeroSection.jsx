'use client';

import { useState, useEffect } from 'react';

export default function HeroSection({ backgroundImages, heroTitle, heroDescription }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (backgroundImages?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [backgroundImages]);

  const currentImage = backgroundImages?.[currentImageIndex] || backgroundImages?.[0];

  return (
    <section
      className="relative h-[calc(100vh-4cm)] w-full overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: currentImage ? `url("${currentImage}")` : undefined,
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-8 md:px-16 lg:px-20 pb-32">
          <div className="max-w-4xl">
            <p className="text-white/90 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-light">
              {heroDescription}
            </p>

            <h1 className="text-white font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-wide">
              {heroTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Indicators */}
      {backgroundImages?.length > 1 && (
        <div className="absolute bottom-28 left-8 md:left-16 lg:left-20 flex gap-3 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'w-12 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
