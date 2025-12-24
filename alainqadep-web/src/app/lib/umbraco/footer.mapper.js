import { fetchPageByType } from './fetchPage';
import { stripHtml } from './media';

/**
 * Get Footer Page content
 */
export async function getFooterPage(culture = null) {
  return fetchPageByType('footer', culture);
}

/**
 * Extract footer data from footer page
 */
export function getFooterDataFromPage(footerPage) {
  if (!footerPage) return null;

  const props = footerPage.properties || {};

  return {
    stayConnectedTitle: stripHtml(props.stayConnectedTitle?.markup) || 'Stay Connected',
    stayConnectedText:
      stripHtml(props.stayConnectedText?.markup) ||
      'Get updates, stories, and news as Al Ain Museum takes shape.',
    contactNameLabel: stripHtml(props.contactNameLabel?.markup) || 'Your Name',
    contactEmailLabel: stripHtml(props.contactEmailLabel?.markup) || 'Your Email',
    submitButtonText: stripHtml(props.submitButtonText?.markup) || 'Submit',
  };
}
