import EventCard from './EventCard';

export default function WhatsOnSection({ events = [] }) {
  // Ensure we have at least 3 events for the layout
  const displayEvents =
    events.length >= 3
      ? events.slice(0, 3)
      : [
          ...events,
          ...Array(3 - events.length).fill({
            eventLabel: 'EVENT',
            eventDate: 'Coming Soon',
            eventTitle: 'Event Details',
            eventButton: 'Learn More',
            eventImage: null,
          }),
        ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-sm tracking-[0.3em] uppercase text-gray-600 mb-2">WHAT'S ON</h2>
        </div>

        {/* Cards grid */}
        <div className="space-y-6">
          {/* Card 1 - Large (Full width) */}
          <EventCard
            label={displayEvents[0].eventLabel}
            date={displayEvents[0].eventDate}
            title={displayEvents[0].eventTitle}
            buttonText={displayEvents[0].eventButton}
            image={displayEvents[0].eventImage || '/image/placeholder.jpg'}
            isLarge={true}
          />

          {/* Cards 2 & 3 - Small (Half width each) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EventCard
              label={displayEvents[1].eventLabel}
              date={displayEvents[1].eventDate}
              title={displayEvents[1].eventTitle}
              buttonText={displayEvents[1].eventButton}
              image={displayEvents[1].eventImage || '/image/placeholder.jpg'}
              isLarge={false}
            />
            <EventCard
              label={displayEvents[2].eventLabel}
              date={displayEvents[2].eventDate}
              title={displayEvents[2].eventTitle}
              buttonText={displayEvents[2].eventButton}
              image={displayEvents[2].eventImage || '/image/placeholder.jpg'}
              isLarge={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
