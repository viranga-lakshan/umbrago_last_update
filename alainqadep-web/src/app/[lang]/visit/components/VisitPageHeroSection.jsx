'use client';

export default function VisitPageHeroSection({ heroData }) {
  if (!heroData) return null;

  const { title, backgroundImage } = heroData;

  return (
    <section
      className="relative h-[calc(100vh-4cm)] w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined,
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-8 md:px-16 lg:px-20 pb-32">
          <div className="max-w-4xl">
            <h1 className="text-white font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-wide">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
