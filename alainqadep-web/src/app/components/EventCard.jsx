export default function EventCard({ type, label, date, title, buttonText, image, isLarge }) {
  if (isLarge) {
    // Large card (Card 1) - Full width, dark overlay
    return (
      <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden group cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url("${image}")` }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

        <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
          {/* Label */}
          <div>
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-wider uppercase">
              {label}
            </span>
          </div>

          {/* Bottom content */}
          <div>
            <p className="text-white/80 text-sm mb-3">{date}</p>
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
              {title}
            </h3>
            <button className="inline-flex items-center gap-2 text-white text-sm tracking-wide hover:gap-4 transition-all duration-300">
              {buttonText}
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Small cards (Card 2 & 3) - Half width with red bottom section
  return (
    <div className="group cursor-pointer overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Image section */}
      <div className="relative h-[280px] md:h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        />
      </div>

      {/* Red bottom section */}
      <div className="bg-[#A0503C] p-6 md:p-8">
        {/* Label */}
        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs tracking-wider uppercase mb-4">
          {label}
        </span>

        <h3 className="text-white text-2xl md:text-3xl font-serif mb-3 leading-tight">{title}</h3>

        <p className="text-white/80 text-sm mb-5">{date}</p>

        <button className="inline-flex items-center gap-2 text-white text-sm tracking-wide border border-white/40 px-5 py-2 hover:bg-white/10 hover:gap-4 transition-all duration-300">
          {buttonText}
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}
