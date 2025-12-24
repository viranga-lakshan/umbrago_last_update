'use client';

import { useEffect, useState, use } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  getVisitPage,
  getVisitHeroSectionFromVisitPage,
  getBreadcrumbNavFromVisitPage,
  getTicketsOpeningHoursFromVisitPage,
} from '../../lib/umbraco';
import VisitPageHeroSection from '../../visit/components/VisitPageHeroSection';
import BreadcrumbNav from '../../components/BreadcrumbNav';
import TicketsAndOpeningHoursSection from '../../visit/components/TicketsAndOpeningHoursSection';

export default function VisitPage({ params }) {
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitPage, setVisitPage] = useState(null);

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
        console.log(`[Visit Page] Fetching data for language: ${language}`);
        const pageData = await getVisitPage(language);

        console.log('[Visit Page] Data received:', pageData);

        if (pageData) {
          setVisitPage(pageData);
        } else {
          setError('No data received from API');
        }
      } catch (error) {
        console.error('[Visit Page] Error loading data:', error);
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

  // Extract section data
  const heroData = visitPage ? getVisitHeroSectionFromVisitPage(visitPage) : null;
  const breadcrumbData = visitPage ? getBreadcrumbNavFromVisitPage(visitPage) : null;
  const ticketsData = visitPage ? getTicketsOpeningHoursFromVisitPage(visitPage) : null;

  return (
    <main>
      {heroData && <VisitPageHeroSection heroData={heroData} />}
      {breadcrumbData && <BreadcrumbNav {...breadcrumbData} />}
      {ticketsData && <TicketsAndOpeningHoursSection data={ticketsData} />}
    </main>
  );
}
