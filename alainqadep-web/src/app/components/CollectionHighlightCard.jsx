 export default function CollectionHighlightCard({
  galleryName,
  period,
  artefactName,
  image,
  variant = 'blue',
}) {
  const bgColor = variant === 'orange' ? 'bg-[#D4884A]' : 'bg-[#B8C5D6]';
  const textColor = variant === 'orange' ? 'text-white' : 'text-gray-900';

  return (
    <div
      className="
        group cursor-pointer overflow-hidden shadow-md hover:shadow-xl
        transition-all duration-300
        w-[320px] md:w-[360px]
        shrink-0
      "
    >
      {/* Image section */}
      <div className="relative h-[200px] md:h-[240px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        />
      </div>

      {/* Content section */}
      <div
        className={`${bgColor} ${textColor} p-6 md:p-8 min-h-[200px] flex flex-col justify-between`}
      >
        <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-2">
          {galleryName}
        </h3>

        <p className="text-xs tracking-wider uppercase mb-4">{period}</p>

        <h2 className="text-3xl md:text-4xl font-serif leading-tight">
          {artefactName}
        </h2>
      </div>
    </div>
  );
}
