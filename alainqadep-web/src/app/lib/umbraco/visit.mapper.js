import { getMediaUrl, stripHtml } from './media';

/**
 * Get Visit Page Hero Section data from Visit Page
 */
export function getVisitHeroSectionFromVisitPage(visitPage) {
  if (!visitPage?.properties?.visitPageSection?.items) {
    return null;
  }

  const items = visitPage.properties.visitPageSection.items;
  const heroItem = items.find(item => item.content?.contentType === 'visitPageHeroSection');

  if (!heroItem?.content?.properties) {
    return null;
  }

  const props = heroItem.content.properties;
  const title = stripHtml(props.title) || 'Visit';
  const backgroundImages = props.backgroundImage || [];
  const imageUrl = backgroundImages[0]?.url || null;

  return {
    title,
    backgroundImage: imageUrl ? getMediaUrl(imageUrl) : null,
  };
}

/**
 * Get Breadcrumb Navigation data from Visit Page
 */
export function getBreadcrumbNavFromVisitPage(visitPage) {
  if (!visitPage?.properties?.visitPageSection?.items) {
    return null;
  }

  const items = visitPage.properties.visitPageSection.items;
  const breadcrumbItem = items.find(item => item.content?.contentType === 'breadcrumbNav');

  if (!breadcrumbItem?.content?.properties) {
    return null;
  }

  const props = breadcrumbItem.content.properties;
  const homeLink = stripHtml(props.breadcrumbHomeLink) || 'Home';
  const title = stripHtml(props.breadcrumbTitle) || 'Visit';
  const backgroundColor = props.breadcrumbBackgroundColor || '#f9fafb';

  return {
    items: [
      { label: homeLink, href: '/' },
      { label: title, href: null },
    ],
    backgroundColor,
  };
}

/**
 * Get Tickets and Opening Hours Section data from Visit Page
 */
export function getTicketsOpeningHoursFromVisitPage(visitPage) {
  if (!visitPage?.properties?.visitPageSection?.items) {
    return null;
  }

  const items = visitPage.properties.visitPageSection.items;
  const ticketsItem = items.find(item => item.content?.contentType === 'ticketsOpeningHours');

  if (!ticketsItem?.content?.properties) {
    return null;
  }

  const props = ticketsItem.content.properties;
  const title = stripHtml(props.title) || 'TICKETS & OPENING HOURS';
  const mainBackgroundColor = props.mainBackgroundColor || '#ffffff';

  // Extract Tickets Hero Section
  const ticketsHeroItems = props.ticketsHeroSection?.items || [];
  let ticketsHero = null;
  if (ticketsHeroItems.length > 0) {
    const heroProps = ticketsHeroItems[0].content?.properties || {};
    const heroImages = heroProps.heroBackgroundImage || [];
    const imageUrl = heroImages[0]?.url || null;

    ticketsHero = {
      backgroundImage: imageUrl ? getMediaUrl(imageUrl) : null,
      title: stripHtml(heroProps.heroTitle) || 'Ready To Explore?',
      description: heroProps.heroDescription || '',
      buttonText: stripHtml(heroProps.heroButtonText) || 'Book Now',
      buttonColor: heroProps.heroButtonColor || '#ffffff',
    };
  }

  // Extract Opening Hours Bar Section
  const openingHoursItems = props.openingHoursBarSection?.items || [];
  let openingHours = null;
  let openingHoursBackgroundColor = '#ac0c0c';
  if (openingHoursItems.length > 0) {
    const hoursProps = openingHoursItems[0].content?.properties || {};

    openingHours = {
      title: stripHtml(hoursProps.openingHoursTitle) || 'Opening Hours',
      note: stripHtml(hoursProps.openingHoursNote) || '',
      galleriesTitle: stripHtml(hoursProps.galleriesTitle) || 'Galleries & Exhibitions:',
      weekdayHours: stripHtml(hoursProps.weekdayHours) || '',
      weekendHours: stripHtml(hoursProps.weekendHours2) || '',
      lastEntryNote: stripHtml(hoursProps.lastEntryNote) || '',
    };

    openingHoursBackgroundColor =
      hoursProps.openingHourBarBackgroundColor || mainBackgroundColor || '#ac0c0c';
  }

  return {
    title,
    mainBackgroundColor,
    openingHoursBackgroundColor,
    ticketsHero,
    openingHours,
  };
}

/**
 * Get Getting Here Section data from Visit Page
 */
export function getGettingHereFromVisitPage(visitPage) {
  if (!visitPage?.properties?.gettingHereSection) {
    return null;
  }

  const items = visitPage.properties.gettingHereSection.items || [];
  if (items.length === 0) {
    return null;
  }

  const props = items[0].content?.properties || {};
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
  const backgroundColor = props.backgraoundColor || props.backgroundColor || '#ffffff';

  return {
    smallTitle,
    mainTitle,
    transportOptions,
    googleMapEmbed,
    backgroundColor,
  };
}

/**
 * Get Visitor Facilities Section data from Visit Page
 */
export function getVisitorFacilitiesFromVisitPage(visitPage) {
  if (!visitPage?.properties?.visitPageSection?.items) {
    console.log('[Mapper] No visitPageSection.items found');
    return null;
  }

  const items = visitPage.properties.visitPageSection.items;
  const facilitiesItem = items.find(
    item => item.content?.contentType === 'visitorFacilitiesSection'
  );

  if (!facilitiesItem?.content?.properties) {
    console.log('[Mapper] No facilitiesItem found');
    return null;
  }

  const props = facilitiesItem.content.properties;

  // Fix: title and sectionIntro are objects with markup property
  const title = stripHtml(props.title?.markup || props.title) || 'VISITOR FACILITIES & AMENITIES';
  const sectionIntro =
    stripHtml(props.sectionIntro?.markup || props.sectionIntro) ||
    'Services To Better Your Experience';
  const backgroundColor = props.backgroundColor || '#ffffff';

  console.log('[Mapper] Extracted title:', title);
  console.log('[Mapper] Extracted sectionIntro:', sectionIntro);

  // Extract service groups and individual services
  const sectionItems = props.sections?.items || [];
  const serviceGroups = [];
  const individualServices = [];

  sectionItems.forEach(item => {
    const contentType = item.content?.contentType;

    if (contentType === 'visitorServicesGroup') {
      // Handle service groups (with image cards)
      const groupProps = item.content?.properties || {};
      const groupTitle = stripHtml(groupProps.groupTitle?.markup || groupProps.groupTitle) || '';
      const services = groupProps.services || '';
      const groupBackgroundColor = groupProps.backgroundColor || '#e9e9e9';

      // Extract image cards
      const imageCartItems = groupProps.imagecart?.items || [];
      const imageCards = imageCartItems.map(cardItem => {
        const cardProps = cardItem.content?.properties || {};
        const imageTitle = stripHtml(cardProps.imageTitle?.markup || cardProps.imageTitle) || '';
        const images = cardProps.image || [];
        const imageUrl = images[0]?.url || null;

        return {
          title: imageTitle,
          image: imageUrl ? getMediaUrl(imageUrl) : null,
          width: images[0]?.width || 0,
          height: images[0]?.height || 0,
        };
      });

      serviceGroups.push({
        type: 'serviceGroup',
        title: groupTitle,
        description: services,
        backgroundColor: groupBackgroundColor,
        imageCards,
      });
    } else if (contentType === 'services') {
      // Handle individual services
      const serviceProps = item.content?.properties || {};
      const serviceTitle = stripHtml(serviceProps.title?.markup || serviceProps.title) || '';
      const serviceDescription = serviceProps.description || '';
      const images = serviceProps.image || [];
      const imageUrl = images[0]?.url || null;
      const serviceBackgroundColor = serviceProps.backgroundColor || '#ffffff';

      individualServices.push({
        type: 'service',
        title: serviceTitle,
        description: serviceDescription,
        image: imageUrl ? getMediaUrl(imageUrl) : null,
        backgroundColor: serviceBackgroundColor,
      });
    }
  });

  console.log('[Mapper] Service groups count:', serviceGroups.length);
  console.log('[Mapper] Individual services count:', individualServices.length);

  return {
    title,
    sectionIntro,
    backgroundColor,
    serviceGroups,
    individualServices,
  };
}

/**
 * Get Visitor Guidelines Section data from Visit Page
 */
export function getVisitorGuidelinesFromVisitPage(visitPage) {
  if (!visitPage?.properties?.visitPageSection?.items) {
    console.log('[Mapper] No visitPageSection.items found');
    return null;
  }

  const items = visitPage.properties.visitPageSection.items;
  const guidelinesItem = items.find(item => item.content?.contentType === 'visitorGuidelines');

  if (!guidelinesItem?.content?.properties) {
    console.log('[Mapper] No guidelinesItem found');
    return null;
  }

  const props = guidelinesItem.content.properties;

  const eyebrowLabel =
    stripHtml(props.eyebrowLabel?.markup || props.eyebrowLabel) || 'VISITOR GUIDELINES';
  const title = stripHtml(props.title?.markup || props.title) || '';
  const bodyText = stripHtml(props.bodyText?.markup || props.bodyText) || '';
  const buttonLabel = stripHtml(props.buttonLabel?.markup || props.buttonLabel) || 'Guidelines';

  // Extract button link
  let buttonLink = '';
  if (props.buttonLink?.markup) {
    const linkMatch = props.buttonLink.markup.match(/href="([^"]+)"/);
    buttonLink = linkMatch ? linkMatch[1] : '';
  }

  // Extract side image
  const images = props.sideImage || [];
  const imageUrl = images[0]?.url || null;
  const backgroundColor = props.backgroundColor || '#ebebeb';

  return {
    eyebrowLabel,
    title,
    bodyText,
    buttonLabel,
    buttonLink,
    sideImage: imageUrl ? getMediaUrl(imageUrl) : null,
    backgroundColor,
  };
}
