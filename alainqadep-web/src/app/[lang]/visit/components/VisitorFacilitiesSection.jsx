import VisitorServiceGroup from './VisitorServiceGroup';
import ServiceSection from './ServiceSection';

export default function VisitorFacilitiesSection({ data }) {
  console.log('VisitorFacilitiesSection - Received data:', data);

  if (!data) return null;

  const { title, sectionIntro, backgroundColor, serviceGroups, individualServices } = data;

  return (
    <>
      {/* ================= TOP SECTION (Title + Intro) ================= */}
      <section className="py-8 px-6" style={{ backgroundColor: backgroundColor || '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          {title && (
            <p className="text-[18px] font-bold uppercase text-[#312C22] mb-4 tracking-wide">
              {title}
            </p>
          )}

          {/* Section Intro */}
          {sectionIntro && (
            <h2 className="text-[48px] leading-[56px] font-medium text-[#1B1F27] heading-font">
              {sectionIntro}
            </h2>
          )}
        </div>
      </section>

      {/* ================= BOTTOM SECTION (Service Groups – FULL WIDTH) ================= */}
      {serviceGroups && serviceGroups.length > 0 && (
        <div className="w-full">
          {serviceGroups.map((group, index) => (
            <VisitorServiceGroup key={index} data={group} />
          ))}
        </div>
      )}

      {/* ================= INDIVIDUAL SERVICES (Alternating Layout) ================= */}
      {individualServices && individualServices.length > 0 && (
        <div className="w-full">
          {individualServices.map((service, index) => (
            <ServiceSection
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              backgroundColor={service.backgroundColor}
              reverse={index % 2 !== 0} // Alternate: even index = image right, odd index = image left
            />
          ))}
        </div>
      )}
    </>
  );
}
