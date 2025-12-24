/**
 * Fetch home page content by language via API route
 * @param {string} language - Language code ('en' or 'ar')
 */
export async function getHomePage(language = 'en') {
  try {
    const res = await fetch(`/api/umbraco/home?language=${language}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Fetch failed for home page (${language})`, res.status);
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching home page:', error);
    return null;
  }
}

/**
 * Fetch visit page content by language via API route
 * @param {string} language - Language code ('en' or 'ar')
 */
export async function getVisitPage(language = 'en') {
  try {
    const res = await fetch(`/api/umbraco/visit?language=${language}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Fetch failed for visit page (${language})`, res.status);
      return null;
    }

    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching visit page:', error);
    return null;
  }
}

/**
 * Generic function to fetch any page type
 * @param {string} type - Page type identifier
 * @param {string} language - Language code
 */
export async function fetchPageByType(type, language = 'en') {
  if (type === 'home') {
    return getHomePage(language);
  }
  if (type === 'visit') {
    return getVisitPage(language);
  }

  console.warn(`Page type "${type}" not yet implemented`);
  return null;
}
