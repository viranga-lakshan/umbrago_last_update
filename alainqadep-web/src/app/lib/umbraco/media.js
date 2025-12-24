const UMBRACO_URL = 'https://localhost:44355';

/**
 * Convert relative media URL → full URL
 */
export function getMediaUrl(relativeUrl) {
  if (!relativeUrl) return null;
  return `${UMBRACO_URL}${relativeUrl}`;
}

/**
 * Strip HTML tags from markup
 */
export function stripHtml(data) {
  if (!data) return '';
  const markup = typeof data === 'object' ? data.markup : data;
  return typeof markup === 'string' ? markup.replace(/<[^>]*>/g, '').trim() : '';
}
