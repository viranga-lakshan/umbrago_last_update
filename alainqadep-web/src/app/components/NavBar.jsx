'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchNavBarByLanguage, mapNavBarData } from '../lib/umbraco';

export default function Navbar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [navBarData, setNavBarData] = useState({
    logo: null,
    backgroundColor: '#ffffff',
    buttonText: 'Book Tickets',
    buttonBackgroundColor: '#000000',
  });

  // Fetch navbar data when language changes
  useEffect(() => {
    async function loadNavBarData() {
      const data = await fetchNavBarByLanguage(language);
      if (data) {
        const mappedData = mapNavBarData(data);
        setNavBarData(mappedData);
      }
    }
    loadNavBarData();
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-9'
      }`}
      style={{ backgroundColor: navBarData.backgroundColor, borderBottom: '1px solid #e5e5e5' }}
    >
      <div className="max-w-7xl mx-auto px-48 flex items-center justify-between">
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-20 -mx-70">
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center">
            {navBarData.logo && !logoError ? (
              <img
                src={navBarData.logo}
                alt="Al Ain Museum Logo"
                width={120}
                height={70}
                className="object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex flex-col gap-1">
                <div
                  className="text-base tracking-widest text-gray-700"
                  style={{ direction: 'rtl' }}
                >
                  متحف العين
                </div>
                <div className="text-ll font-medium tracking-wider text-gray-900">
                  AL AIN MUSEUM
                </div>
              </div>
            )}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 relative top-5">
            <Link
              href={`/${language}/visit`}
              className={`text-l font-bold tracking-widest transition-colors duration-300 uppercase ${
                pathname.includes('/visit')
                  ? 'text-gray-600 border-b border-gray-900'
                  : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              VISIT
            </Link>

            <Link
              href={`/${language}/galleries-collections`}
              className={`text-l font-bold tracking-widest transition-colors duration-300 uppercase ${
                pathname.includes('/galleries-collections')
                  ? 'text-gray-600 border-b border-gray-900'
                  : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              GALLERIES & COLLECTIONS
            </Link>

            <Link
              href={`/${language}/the-museum`}
              className={`text-l font-bold tracking-widest transition-colors duration-300 uppercase ${
                pathname.includes('/the-museum')
                  ? 'text-gray-600 border-b border-gray-900'
                  : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              THE MUSEUM
            </Link>
          </div>
        </div>

        {/* Right side: Language & Book Tickets */}
        <div className="flex items-center gap-8 -mx-75 pos relative top-4">
          <button
            onClick={toggleLanguage}
            className="text-s font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 tracking-wide"
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>

          <Link
            href="/book-tickets"
            className="text-white px-5 py-3 text-xs font-bold tracking-wider transition-colors duration-300 uppercase"
            style={{
              backgroundColor: navBarData.buttonBackgroundColor,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = `${navBarData.buttonBackgroundColor}dd`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = navBarData.buttonBackgroundColor;
            }}
          >
            {navBarData.buttonText}
          </Link>
        </div>
      </div>
    </nav>
  );
}
