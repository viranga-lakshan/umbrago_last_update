export default function OpeningHoursPanel({ openingHours }) {
  if (!openingHours) return null;

  const { title, note, galleriesTitle, weekdayHours, weekendHours, lastEntryNote } = openingHours;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-8 md:px-16 lg:px-20 py-10">
      {/* Left Column - Opening Hours */}
      <div className="text-white">
        <h3 className="text-3xl md:text-4xl font-serif mb-4">{title}</h3>
        <p className="text-white text-base">{note}</p>
      </div>

      {/* Right Column - Galleries & Exhibitions */}
      <div className="text-white">
        <h4 className="text-xl font-semibold mb-3">{galleriesTitle}</h4>
        <div className="space-y-1 text-white">
          <p className="text-base">
            <strong>{weekdayHours.split(':')[0]}:</strong>
            {weekdayHours.split(':').slice(1).join(':')}
          </p>
          <p className="text-base">
            <strong>{weekendHours.split(':')[0]}:</strong>
            {weekendHours.split(':').slice(1).join(':')}
          </p>
          <p className="text-sm mt-3 text-white/90">{lastEntryNote}</p>
        </div>
      </div>
    </div>
  );
}
