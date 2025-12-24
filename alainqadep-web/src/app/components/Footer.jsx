'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

import FooterHeader from './FooterHeader';

export default function Footer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [footerData, setFooterData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { language } = useLanguage();

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        console.log(`[Footer] Fetching data for language: ${language}`);
        const response = await fetch(`/api/umbraco/footer?language=${language}`);
        const data = await response.json();
        console.log('[Footer] Data received:', data);
        setFooterData(data);
      } catch (error) {
        console.error('[Footer] Error fetching data:', error);
      }
    };

    fetchFooterData();
  }, [language]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/umbraco/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setName('');
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use data from Umbraco or fallback to defaults
  const stayConnectedTitle = footerData?.stayConnectedTitle || 'Stay Connected';
  const stayConnectedText =
    footerData?.stayConnectedText || 'Get updates, stories, and news as Al Ain Museum takes shape.';
  const nameLabel = footerData?.contactNameLabel || 'Your Name';
  const emailLabel = footerData?.contactEmailLabel || 'Your Email';
  const submitText = footerData?.submitButtonText || 'Submit';

  return (
    <div>
      <FooterHeader />

      <footer className="bg-[#03424c] text-white">
        {/* Newsletter Section */}
        <div className="border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{stayConnectedTitle}</h3>
                <p className="text-gray-400 text-sm">{stayConnectedText}</p>
              </div>

              <div className="w-full md:w-auto">
                <form onSubmit={handleSubmit} className="flex gap-4 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder={nameLabel}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-transparent border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-white w-full md:w-64 disabled:opacity-50"
                  />

                  <input
                    type="email"
                    placeholder={emailLabel}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-transparent border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-white w-full md:w-64 disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2 bg-transparent border border-white text-white hover:bg-white hover:text-[#1a1d2e] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : submitText}
                  </button>
                </form>

                {/* Success/Error Message */}
                {message.text && (
                  <div
                    className={`mt-4 p-3 rounded text-sm ${
                      message.type === 'success'
                        ? 'bg-green-900/30 text-green-200 border border-green-700'
                        : 'bg-red-900/30 text-red-200 border border-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Logo & Contact */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <img
                  src="/image/logo-shrink.svg"
                  alt="Al Ain Museum Logo"
                  className="h-20 w-auto"
                />
              </div>

              <div className="text-sm text-gray-400 space-y-2">
                <p>Central District - Al Ain - United Arab Emirates</p>
                <p>+971 000 00 00 00</p>
              </div>
            </div>

            {/* Visit */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">VISIT</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/visit" className="hover:text-white underline">
                    Hours & Admission
                  </Link>
                </li>
                <li>
                  <Link href="/visit" className="hover:text-white underline">
                    Location & Directions
                  </Link>
                </li>
                <li>
                  <Link href="/visit" className="hover:text-white underline">
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link href="/visit" className="hover:text-white underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">CONNECT</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:text-white underline">
                    Join our Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Media Centre */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">MEDIA CENTRE</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="/media" className="hover:text-white underline">
                    Brand
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">FOLLOW US</h4>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0011.14-4.02v-6.95a8.16 8.16 0 004.65 1.46v-3.4a4.84 4.84 0 01-1.2-.5z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>© 2025 Al Ain Museum</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white">
                  Privacy Notice
                </Link>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
                <Link href="/terms" className="hover:text-white">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
