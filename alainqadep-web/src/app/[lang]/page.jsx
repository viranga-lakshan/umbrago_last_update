'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import {
  getHomePage,
  getHeroSectionFromHome,
  getWhatsOnFromHome,
  getCollectionHighlightsFromHome,
  getGettingHereFromHome,
} from '../lib/umbraco';
import HeroSection from '../components/HeroSection';
import WhatsOnSection from '../components/WhatsOnSection';
import CollectionHighlights from '../components/CollectionHighlights';
import GettingHereSection from '../components/GettingHereSection';

export default function LangHome({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homePage, setHomePage] = useState(null);

  // Unwrap params Promise
  const resolvedParams = use(params);
  const urlLang = resolvedParams.lang || 'en';

  // Sync URL language with context
  useEffect(() => {
    if (urlLang !== language) {
      setLanguage(urlLang);
    }
  }, [urlLang, language, setLanguage]);

  // Fetch page data when language changes
  useEffect(() => {
    async function loadPageData() {
      setLoading(true);
      setError(null);
      try {
        console.log(`[Page] Fetching home page for language: ${language}`);
        const pageData = await getHomePage(language);

        console.log('[Page] Home page data:', pageData);

        if (pageData) {
          setHomePage(pageData);
        } else {
          setError('No data received from API');
        }
      } catch (error) {
        console.error('[Page] Error loading page data:', error);
        setError(error.message || 'Failed to load page data');
      } finally {
        setLoading(false);
      }
    }

    loadPageData();
  }, [language]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Error loading page</div>
          <div className="text-gray-600">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Render sections dynamically based on API order
  const renderSection = (item, index) => {
    const contentType = item.content?.contentType;

    switch (contentType) {
      case 'heroSection': {
        const heroData = getHeroSectionFromHome(homePage);
        return heroData ? <HeroSection key={index} {...heroData} /> : null;
      }
      case 'whatSOn': {
        // Get all whatSOn items (not just this one)
        const whatsOnData = getWhatsOnFromHome(homePage);
        // Only render once for the first whatSOn item
        const isFirstWhatsOn =
          homePage.properties.pageSections.items.findIndex(
            i => i.content?.contentType === 'whatSOn'
          ) === index;
        return isFirstWhatsOn && whatsOnData?.length > 0 ? (
          <WhatsOnSection key={index} events={whatsOnData} />
        ) : null;
      }
      case 'collectionHighlightsSection': {
        const collectionsData = getCollectionHighlightsFromHome(homePage);
        return collectionsData?.items?.length > 0 ? (
          <CollectionHighlights
            key={index}
            sectionTitle={collectionsData.sectionTitle}
            backgroundColor={collectionsData.backgroundColor}
            collections={collectionsData.items}
          />
        ) : null;
      }
      case 'gettingHere': {
        const gettingHereData = getGettingHereFromHome(homePage);
        return gettingHereData ? <GettingHereSection key={index} {...gettingHereData} /> : null;
      }
      default:
        return null;
    }
  };

  return (
    <main>
      {homePage?.properties?.pageSections?.items?.map((item, index) => renderSection(item, index))}
    </main>
  );
}
