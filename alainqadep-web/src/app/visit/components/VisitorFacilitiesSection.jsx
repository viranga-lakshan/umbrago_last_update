import VisitorServiceGroup from './VisitorServiceGroup';

export default function VisitorFacilitiesSection({ data }) {
  console.log('VisitorFacilitiesSection - Received data:', data);

  if (!data) {
    console.log('VisitorFacilitiesSection - No data, returning null');
    return null;
  }

  const { title, sectionIntro, backgroundColor, serviceGroups } = data;

  return (
    <section className="py-16 px-6" style={{ backgroundColor: backgroundColor || '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        {title && (
          <p className="text-[18px] font-bold uppercase text-[#312C22] mb-4 tracking-wide">
            {title}
          </p>
        )}

        {/* Section Intro */}
        {sectionIntro && (
          <h2 className="text-[48px] leading-[56px] font-medium text-[#1B1F27] heading-font mb-12">
            {sectionIntro}
          </h2>
        )}

        {/* Service Groups */}
        {serviceGroups && serviceGroups.length > 0 && (
          <div className="space-y-0">
            {serviceGroups.map((group, index) => (
              <VisitorServiceGroup key={index} data={group} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
