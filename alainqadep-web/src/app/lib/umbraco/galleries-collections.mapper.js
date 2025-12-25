import { getMediaUrl, stripHtml } from './media';

/**
 * Get Hero Section data from Galleries & Collections Page
 */
export function getHeroSectionFromGalleriesPage(galleriesPage) {
  if (!galleriesPage?.properties?.sections?.items) {
    return null;
  }

  const items = galleriesPage.properties.sections.items;
  const heroItem = items.find(item => item.content?.contentType === 'visitPageHeroSection');

  if (!heroItem?.content?.properties) {
    return null;
  }

  const props = heroItem.content.properties;
  const title = stripHtml(props.title?.markup || props.title) || 'Galleries & Collections';
  const backgroundImages = props.backgroundImage || [];
  const imageUrl = backgroundImages[0]?.url || null;

  return {
    title,
    backgroundImage: imageUrl ? getMediaUrl(imageUrl) : null,
  };
}

/**
 * Get Breadcrumb Navigation data from Galleries & Collections Page
 */
export function getBreadcrumbNavFromGalleriesPage(galleriesPage) {
  if (!galleriesPage?.properties?.sections?.items) {
    return null;
  }

  const items = galleriesPage.properties.sections.items;
  const breadcrumbItem = items.find(item => item.content?.contentType === 'breadcrumbNav');

  if (!breadcrumbItem?.content?.properties) {
    return null;
  }

  const props = breadcrumbItem.content.properties;
  const homeLink =
    stripHtml(props.breadcrumbHomeLink?.markup || props.breadcrumbHomeLink) || 'Home';
  const title =
    stripHtml(props.breadcrumbTitle?.markup || props.breadcrumbTitle) || 'Galleries & Collections';
  const backgroundColor = props.breadcrumbBackgroundColor || '#ffffff';

  return {
    items: [
      { label: homeLink, href: '/' },
      { label: title, href: null },
    ],
    backgroundColor,
  };
}

/**
 * Get Al Ain Galleries Section data from Galleries & Collections Page
 */
export function getAlAinGalleriesSectionFromGalleriesPage(galleriesPage) {
  if (!galleriesPage?.properties?.sections?.items) {
    return null;
  }

  const items = galleriesPage.properties.sections.items;
  const galleriesItem = items.find(item => item.content?.contentType === 'alAinGalleries');

  if (!galleriesItem?.content?.properties) {
    return null;
  }

  const props = galleriesItem.content.properties;

  return {
    smallTitle: stripHtml(props.largeHeadline?.markup || props.largeHeadline) || 'AL AIN GALLERIES',
    mainTitle:
      stripHtml(props.header?.markup || props.header) ||
      'Explore the Emirates Heritage and Culture',
    description: props.descriptionText || '',
    buttonText: stripHtml(props.buttonText?.markup || props.buttonText) || 'Explore',
    buttonBackgroundColor: props.buttonBackgroundColor || '#ffffff',
    backgroundColor: props.backgroundColor || '#cccccc',
    images: (props.images || []).map(img => ({
      url: getMediaUrl(img.url),
      alt: img.name || 'Gallery Image',
      width: img.width,
      height: img.height,
    })),
  };
}
