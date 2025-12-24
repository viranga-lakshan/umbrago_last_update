import { getMediaUrl, stripHtml } from './media';

/**
 * Get NavBar data from Home Page
 */
export function getNavBarDataFromHome(homePage) {
  if (!homePage?.properties?.navBarSection) {
    return {
      logo: null,
      backgroundColor: '#ffffff',
      buttonText: 'Book Tickets',
      buttonBackgroundColor: '#1f2937',
    };
  }

  const items = homePage.properties.navBarSection.items || [];
  if (items.length === 0) {
    return {
      logo: null,
      backgroundColor: '#ffffff',
      buttonText: 'Book Tickets',
      buttonBackgroundColor: '#1f2937',
    };
  }

  const props = items[0].content?.properties || {};

  const logoImages = props.logo || [];
  const logoUrl = logoImages[0]?.url || null;
  const backgroundColor = props.backgroundColor || '#ffffff';
  const buttonText = stripHtml(props.buttonText) || 'Book Tickets';
  const buttonBackgroundColor = props.buttonBAckgroundColor || '#1f2937';

  return {
    logo: logoUrl ? getMediaUrl(logoUrl) : null,
    backgroundColor,
    buttonText,
    buttonBackgroundColor,
  };
}

/**
 * Get Hero Section data from Home Page
 */
export function getHeroSectionFromHome(homePage) {
  if (!homePage?.properties?.pageSections?.items) {
    return null;
  }

  const items = homePage.properties.pageSections.items || [];
  const heroItem = items.find(item => item.content?.contentType === 'heroSection');

  if (!heroItem?.content?.properties) {
    return null;
  }

  const props = heroItem.content.properties;
  const backgroundImages = (props.backgroundImage || []).map(img => getMediaUrl(img.url));
  const heroTitle = stripHtml(props.heroTitle) || '';
  const heroDescription = props.heroDescription || '';

  return {
    backgroundImages,
    heroTitle,
    heroDescription,
  };
}

/**
 * Get What's On Events from Home Page
 */
export function getWhatsOnFromHome(homePage) {
  if (!homePage?.properties?.pageSections?.items) {
    return [];
  }

  const items = homePage.properties.pageSections.items || [];
  const whatsOnItems = items.filter(item => item.content?.contentType === 'whatSOn');

  return whatsOnItems.map((item, index) => {
    const props = item.content?.properties || {};
    const eventLabel = stripHtml(props.eventLabel) || 'EVENT';
    const eventDate = stripHtml(props.eventDate);
    const eventTitle = stripHtml(props.eventTitle) || 'Untitled Event';
    const eventButton = stripHtml(props.eventButton) || 'Know More';
    const eventImages = props.eventImage || [];
    const imageUrl = eventImages[0]?.url || null;
    const eventType = props.eventType?.[0] || 'SMALL';

    return {
      id: item.content?.id || index + 1,
      eventLabel,
      eventDate,
      eventTitle,
      eventButton,
      eventImage: imageUrl ? getMediaUrl(imageUrl) : null,
      type: eventType,
    };
  });
}

/**
 * Get Collection Highlights from Home Page
 */
export function getCollectionHighlightsFromHome(homePage) {
  if (!homePage?.properties?.pageSections?.items) {
    return { sectionTitle: 'COLLECTION HIGHLIGHTS', backgroundColor: '#E8DCC8', items: [] };
  }

  const items = homePage.properties.pageSections.items || [];
  const collectionItem = items.find(
    item => item.content?.contentType === 'collectionHighlightsSection'
  );

  if (!collectionItem?.content?.properties) {
    return { sectionTitle: 'COLLECTION HIGHLIGHTS', backgroundColor: '#E8DCC8', items: [] };
  }

  const sectionProps = collectionItem.content.properties;
  const highlightItems = sectionProps.highlightItems?.items || [];
  const sectionTitle = stripHtml(sectionProps.sectionTitle) || 'COLLECTION HIGHLIGHTS';
  const backgroundColor = sectionProps.backgroundColor || '#E8DCC8';

  const collections = highlightItems.map((item, index) => {
    const props = item.content?.properties || {};
    const galleryName = stripHtml(props.galleryName) || 'GALLERY NAME';
    const period = stripHtml(props.period);
    const artefactName = stripHtml(props.artefactName) || 'Artefact Name';
    const cardImages = props.cardImage || [];
    const imageUrl = cardImages[0]?.url || null;
    const cardVariant = props.cardVariant?.[0] || (index % 2 === 0 ? 'blue' : 'orange');

    return {
      id: item.content?.id || index + 1,
      galleryName,
      period,
      artefactName,
      image: imageUrl ? getMediaUrl(imageUrl) : null,
      variant: cardVariant,
    };
  });

  return {
    sectionTitle,
    backgroundColor,
    items: collections,
  };
}

/**
 * Get Getting Here Section from Home Page
 */
export function getGettingHereFromHome(homePage) {
  if (!homePage?.properties?.pageSections?.items) {
    return null;
  }

  const items = homePage.properties.pageSections.items || [];
  const gettingHereItem = items.find(item => item.content?.contentType === 'gettingHere');

  if (!gettingHereItem?.content?.properties) {
    return null;
  }

  const props = gettingHereItem.content.properties;
  const smallTitle = stripHtml(props.smallTitle) || 'GETTING HERE';
  const mainTitle = stripHtml(props.mainTitle) || 'Plan Your Journey';
  const journeyMethodParts = props.journeyMethodPart?.items || [];

  const transportOptions = journeyMethodParts.map(item => {
    const itemProps = item.content?.properties || {};
    return {
      title: stripHtml(itemProps.methodTitle),
      content: stripHtml(itemProps.description),
    };
  });

  const googleMapEmbed = props.googleMapEmbed || '';
  const backgroundColor = props.backgraoundColor || '#ffffff';

  return {
    smallTitle,
    mainTitle,
    transportOptions,
    googleMapEmbed,
    backgroundColor,
  };
}
