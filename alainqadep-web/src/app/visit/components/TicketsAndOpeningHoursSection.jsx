 import TicketsHeroSection from './TicketsheroSection';
import OpeningHoursPanel from './OpeningHoursPanel';

export default function TicketsAndOpeningHoursSection({ data }) {
  if (!data) return null;

  const {
    title,
    mainBackgroundColor,
    openingHoursBackgroundColor,
    ticketsHero,
    openingHours,
  } = data;

  return (
    <section className="w-full">
      {/* SECTION TITLE (CMS BACKGROUND COLOR) */}
      <div
        className="border-b-2 border-black px-8 py-6 md:px-16 lg:px-32"
        style={{ backgroundColor: mainBackgroundColor }}
      >
        <h2 className="text-sm font-bold tracking-widest uppercase text-black">
          {title}
        </h2>
      </div>

      {/* MAIN FULL-WIDTH BACKGROUND */}
      <div
        className="w-full"
        style={{ backgroundColor: mainBackgroundColor }}
      >
        {/* CENTERED CONTENT WITH GAP */}
        <div className="mx-auto max-w-7xl px-8 py-10 md:px-16 lg:px-4 space-y-10">
          {/* Tickets Hero Section */}
          <TicketsHeroSection heroData={ticketsHero} />

          {/* OPENING HOURS BACKGROUND */}
          <div
            className="w-full"
            style={{ backgroundColor: openingHoursBackgroundColor }}
          >
            <OpeningHoursPanel openingHours={openingHours} />
          </div>
        </div>
      </div>
    </section>
  );
}
