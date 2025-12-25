'use client';

import { useEffect, useState, use } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  getGalleriesCollectionsPage,
  getHeroSectionFromGalleriesPage,
  getBreadcrumbNavFromGalleriesPage,
  getAlAinGalleriesSectionFromGalleriesPage,
} from '../../lib/umbraco';
import PageHeroSection from '../../components/PageHeroSection';
import BreadcrumbNav from '../../components/BreadcrumbNav';
import AlAInGalleriesSection from './components/AlAInGalleriesSection';

export default function GalleriesCollections({ params }) {
  const { language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleriesPage, setGalleriesPage] = useState(null);

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
        console.log(`[Galleries Page] Fetching data for language: ${language}`);
        const pageData = await getGalleriesCollectionsPage(language);

        console.log('[Galleries Page] Data received:', pageData);

        if (pageData) {
          setGalleriesPage(pageData);
        } else {
          setError('No data received from API');
        }
      } catch (error) {
        console.error('[Galleries Page] Error loading data:', error);
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
  const heroData = galleriesPage ? getHeroSectionFromGalleriesPage(galleriesPage) : null;
  const breadcrumbData = galleriesPage ? getBreadcrumbNavFromGalleriesPage(galleriesPage) : null;
  const alAinGalleriesData = galleriesPage
    ? getAlAinGalleriesSectionFromGalleriesPage(galleriesPage)
    : null;

  return (
    <main>
      {heroData && <PageHeroSection heroData={heroData} />}
      {breadcrumbData && <BreadcrumbNav {...breadcrumbData} />}
      {alAinGalleriesData && <AlAInGalleriesSection data={alAinGalleriesData} />}
    </main>
  );
}
