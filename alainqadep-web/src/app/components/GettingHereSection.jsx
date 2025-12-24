import TransportAccordion from './TransportAccordion';
import MuseumLocationMap from './MuseumLocationMap';

export default function GettingHereSection({
  smallTitle = 'GETTING HERE',
  mainTitle = 'Plan Your Journey',
  transportOptions = [],
  googleMapEmbed = '',
  backgroundColor = '#ffffff',
}) {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="w-full px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Transport options */}
          <div>
            {/* Section header */}
            <div className="mb-8">
              <p className="text-sm tracking-[0.2em] uppercase font-semibold text-gray-900 mb-4">
                {smallTitle}
              </p>
              <div className="h-[2px] w-12 bg-gray-900 mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">{mainTitle}</h2>
            </div>

            {/* Transport accordion */}
            <TransportAccordion items={transportOptions} />
          </div>

          {/* Right side - Map */}
          <div className="lg:pl-8">
            <MuseumLocationMap mapUrl={googleMapEmbed} />
          </div>
        </div>
      </div>
    </section>
  );
}
