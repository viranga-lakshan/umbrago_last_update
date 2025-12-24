'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
