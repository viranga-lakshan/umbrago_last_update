'use client';

import { useLanguage } from '../../contexts/LanguageContext';

export default function TheMuseum() {
  const { language } = useLanguage();

  return (
    <main className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-6">{language === 'ar' ? 'عن المتحف' : 'The Museum'}</h1>
      <p className="text-lg text-gray-700">
        {language === 'ar'
          ? 'تعرف على تاريخ وقصة متحف العين'
          : 'Learn about the history and story of Al Ain Museum.'}
      </p>
    </main>
  );
}
