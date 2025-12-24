import Image from 'next/image';

export default function VisitorServiceGroup({ data }) {
  if (!data) {
    return null;
  }

  const { title, description, backgroundColor, imageCards } = data;

  return (
    <section className="py-12 px-6" style={{ backgroundColor: backgroundColor || '#e9e9e9' }}>
      <div className="max-w-7xl mx-auto">
        {/* Group Title */}
        {title && (
          <h3 className="text-[38px] leading-[40px] font-medium text-black heading-font mb-8">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <div className="mb-8 max-w-4xl">
            <p className="text-[#33130A] text-base whitespace-pre-wrap">{description}</p>
          </div>
        )}

        {/* Image Cards Grid */}
        {imageCards && imageCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageCards.map((card, index) => (
              <div key={index} className="flex flex-col">
                {/* Image */}
                {card.image && (
                  <div className="relative w-full h-[250px] mb-4 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title || `Service image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Card Title */}
                {card.title && <p className="text-[24px] text-[#33130A]">{card.title}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
