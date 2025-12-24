import { getMediaUrl, stripHtml } from './media';

/**
 * Fetch NavBar content by language (client-side via API route)
 * @param {string} language - Language code ('en' or 'ar')
 */
export async function fetchNavBarByLanguage(language = 'en') {
  try {
    const res = await fetch(`/api/umbraco/navbar?language=${language}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Fetch failed for navbar (${language})`, res.status);
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching navbar:', error);
    return null;
  }
}

/**
 * Map NavBar data from API response
 * @param {object} navBarPage - The navbar page data from API
 */
export function mapNavBarData(navBarPage) {
  if (!navBarPage?.properties) {
    return {
      logo: null,
      backgroundColor: '#ffffff',
      buttonText: 'Book Tickets',
      buttonBackgroundColor: '#000000',
    };
  }

  const props = navBarPage.properties;
  const logoImages = props.logo || [];
  const logoUrl = logoImages[0]?.url || null;
  const backgroundColor = props.backgroundColor || '#ffffff';
  const buttonText = stripHtml(props.buttonText) || 'Book Tickets';
  const buttonBackgroundColor = props.buttonBackgorundColor || '#000000';

  return {
    logo: logoUrl ? getMediaUrl(logoUrl) : null,
    backgroundColor,
    buttonText,
    buttonBackgroundColor,
  };
}
