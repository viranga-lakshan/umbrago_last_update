// ============================================================================
// 🌍 UMBRACO API - Clean Architecture
// ============================================================================
// This is the main entry point for all Umbraco-related functionality.
// Use this file to import functions in your components and pages.

// API Layer - Page fetchers
export { fetchPageByType, getHomePage, getVisitPage } from './fetchPage';

// NavBar Mappers
export { fetchNavBarByLanguage, mapNavBarData } from './navbar.mapper';

// Home Page Mappers
export {
  getNavBarDataFromHome,
  getHeroSectionFromHome,
  getWhatsOnFromHome,
  getCollectionHighlightsFromHome,
  getGettingHereFromHome,
} from './home.mapper';

// Visit Page Mappers
export {
  getVisitHeroSectionFromVisitPage,
  getBreadcrumbNavFromVisitPage,
  getTicketsOpeningHoursFromVisitPage,
  getGettingHereFromVisitPage,
  getVisitorFacilitiesFromVisitPage,
} from './visit.mapper';

// Footer Page Mappers
export { getFooterPage, getFooterDataFromPage } from './footer.mapper';

// Utilities
export { getMediaUrl, stripHtml } from './media';

// ============================================================================
// 🔄 BACKWARD COMPATIBILITY - Deprecated functions
// ============================================================================
// These functions still work but are deprecated. Use the new functions above.

import { getHomePage } from './fetchPage';
import {
  getNavBarDataFromHome,
  getHeroSectionFromHome,
  getWhatsOnFromHome,
  getCollectionHighlightsFromHome,
  getGettingHereFromHome,
} from './home.mapper';

/**
 * @deprecated Use getHomePage() + getNavBarDataFromHome()
 */
export async function getNavBarData() {
  const homePage = await getHomePage();
  return getNavBarDataFromHome(homePage);
}

/**
 * @deprecated Use getHomePage() + getHeroSectionFromHome()
 */
export async function getHeroSectionData() {
  const homePage = await getHomePage();
  return getHeroSectionFromHome(homePage);
}

/**
 * @deprecated Use getHomePage() + getWhatsOnFromHome()
 */
export async function getWhatsOnEvents() {
  const homePage = await getHomePage();
  return getWhatsOnFromHome(homePage);
}

/**
 * @deprecated Use getHomePage() + getCollectionHighlightsFromHome()
 */
export async function getCollectionHighlights() {
  const homePage = await getHomePage();
  return getCollectionHighlightsFromHome(homePage);
}

/**
 * @deprecated Use getHomePage() + getGettingHereFromHome()
 */
export async function getGettingHereData() {
  const homePage = await getHomePage();
  return getGettingHereFromHome(homePage);
}
