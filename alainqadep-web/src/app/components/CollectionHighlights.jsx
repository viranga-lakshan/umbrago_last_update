import CollectionHighlightCard from './CollectionHighlightCard';

export default function CollectionHighlights({
  sectionTitle = 'COLLECTION HIGHLIGHTS',
  backgroundColor = '#E8DCC8',
  collections = [],
}) {
  return (
    <section className="py-10 md:py-8" style={{ backgroundColor }}>
      <div className="w-full px-8 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-sm md:text-base tracking-[0.2em] uppercase font-semibold text-gray-900">
            {sectionTitle}
          </h2>
          <div className="mt-2 h-[2px] w-16 bg-gray-900"></div>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-6 pb-4">
            {collections.map((collection, index) => (
              <CollectionHighlightCard
                key={collection.id || index}
                galleryName={collection.galleryName}
                period={collection.period}
                artefactName={collection.artefactName}
                image={collection.image}
                variant={collection.variant || (index % 2 === 0 ? 'blue' : 'orange')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
