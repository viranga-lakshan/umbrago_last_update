'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FooterHeader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchFooterHeaderData = async () => {
      try {
        setLoading(true);
        console.log(`[FooterHeader] Fetching data for language: ${language}`);

        const response = await fetch(`/api/umbraco/footerHeader?language=${language}`);
        const result = await response.json();

        console.log('[FooterHeader] API Response:', result);

        if (result?.properties) {
          setData(result.properties);
          console.log('[FooterHeader] Data set successfully');
        }
      } catch (error) {
        console.error('[FooterHeader] Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterHeaderData();
  }, [language]);

  // Helper function to extract text from markup or object
  const extractText = data => {
    if (!data) return '';
    // If data is an object with markup property
    if (typeof data === 'object' && data.markup) {
      return data.markup.replace(/<[^>]*>/g, '').trim();
    }
    // If data is already a string
    if (typeof data === 'string') {
      return data.replace(/<[^>]*>/g, '').trim();
    }
    return '';
  };

  // Helper function to extract URL from buttonUrl markup or object
  const extractUrl = data => {
    if (!data) return '/';
    let markup = data;
    // If data is an object with markup property
    if (typeof data === 'object' && data.markup) {
      markup = data.markup;
    }
    const match = markup.match(/href="([^"]*)"/);
    return match ? match[1] : '/';
  };

  if (loading || !data) {
    return (
      <section className="relative h-[400px] md:h-[350px] bg-gray-800 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    );
  }

  const headingText = extractText(data.headingText);
  const descriptionText =
    typeof data.descriptionText === 'string'
      ? data.descriptionText
      : extractText(data.descriptionText) || '';
  const buttonText = extractText(data.buttonText);
  const buttonUrl = extractUrl(data.buttonUrl);
  const backgroundImageUrl = data.backgroundImage?.[0]?.url
    ? `https://localhost:44355${data.backgroundImage[0].url}`
    : '/image/explore-banner.webp';
  const triangularColor = data.triangularOverlayColor || '#C1523E';

  return (
    <section
      className="relative h-[400px] md:h-[350px] bg-cover bg-center flex items-center overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Triangular design element with dynamic color */}
      <div
        className="absolute left-0 top-0 w-[300px] h-full opacity-90"
        style={{
          backgroundColor: triangularColor,
          clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 100%)',
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Text */}
        <div className="text-white">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">{headingText}</h2>
        </div>

        {/* Right Text + Button */}
        <div className="text-white md:text-left text-center max-w-md md:ml-auto">
          <p className="text-base md:text-lg mb-6">{descriptionText}</p>

          <Link
            href={buttonUrl}
            className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
