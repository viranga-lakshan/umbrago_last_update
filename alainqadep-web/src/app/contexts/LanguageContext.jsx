'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update document direction for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);

    // Navigate to new language path
    if (pathname === '/' || pathname === '') {
      router.push(`/${newLanguage}`);
    } else {
      // Replace language segment in current path
      const pathSegments = pathname.split('/').filter(Boolean);
      if (pathSegments[0] === 'en' || pathSegments[0] === 'ar') {
        pathSegments[0] = newLanguage;
      } else {
        pathSegments.unshift(newLanguage);
      }
      router.push(`/${pathSegments.join('/')}`);
    }
  };

  const getCultureCode = () => {
    return language === 'ar' ? 'ar' : 'en-US';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, getCultureCode }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
