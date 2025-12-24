export default function MuseumLocationMap({ mapUrl = '' }) {
  // Fallback URL if no mapUrl provided
  const defaultMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.7551234567!2d55.7654321!3d24.2123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8ab3f4d5e6c789%3A0x1234567890abcdef!2sAl%20Ain%20Museum!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae';

  return (
    <div className="w-full h-full">
      <iframe
        src={mapUrl || defaultMapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '500px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
