'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function GalleriesCollections() {
  const { language } = useLanguage();

  return (
    <main className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-6">
        {language === 'ar' ? 'المعارض والمقتنيات' : 'Galleries & Collections'}
      </h1>
      <p className="text-lg text-gray-700">
        {language === 'ar'
          ? 'استكشف معارضنا ومقتنياتنا الواسعة في متحف العين'
          : 'Explore our extensive galleries and collections at Al Ain Museum.'}
      </p>
    </main>
  );
}
