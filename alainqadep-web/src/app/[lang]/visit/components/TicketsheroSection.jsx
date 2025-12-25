export default function TicketsHeroSection({ heroData }) {
  if (!heroData) return null;

  const { backgroundImage, title, description, buttonText, buttonColor } = heroData;

  return (
    <section
      className="relative h-[400px] w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url("${backgroundImage}")` : undefined,
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-8 md:px-16 lg:px-20">
          <div className="max-w-xl">
            <h2 className="text-white font-serif text-5xl md:text-6xl mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-white/95 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              {description}
            </p>
            <button className="bg-white text-black px-8 py-3.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-gray-100">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
