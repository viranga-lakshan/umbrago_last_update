'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function AlAInGalleriesSection({ data }) {
  useEffect(() => {
    console.log('[AlAInGalleriesSection] Data received:', data);
    if (data?.images) {
      console.log('[AlAInGalleriesSection] Images:', data.images);
    }
  }, [data]);

  if (!data) {
    console.log('[AlAInGalleriesSection] No data provided');
    return null;
  }

  const {
    smallTitle,
    mainTitle,
    description,
    buttonText,
    buttonBackgroundColor,
    backgroundColor,
    images,
  } = data;

  return (
    <section
      className="w-full py-16 lg:py-24"
      style={{ backgroundColor: backgroundColor || '#F5F5F5' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center">
            {/* Small Title */}
            {smallTitle && (
              <p className="text-[18px] leading-[24px] font-bold uppercase text-[#1B1F27] mb-4">
                {smallTitle}
              </p>
            )}

            {/* Main Title */}
            {mainTitle && (
              <h1 className="text-[32px] xl:text-[48px] leading-[40px] xl:leading-[56px] font-medium heading-font lg:max-w-[500px] text-[#33130A] mb-6">
                {mainTitle}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className="text-[16px] leading-[24px] text-[#1B1F27] mb-8 max-w-[500px] whitespace-pre-line">
                {description}
              </p>
            )}

            {/* Button */}
            {buttonText && (
              <button
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-[#1B1F27] text-[#1B1F27] font-medium text-[16px] hover:bg-[#1B1F27] hover:text-white transition-all duration-300 w-fit group"
                style={{
                  backgroundColor: buttonBackgroundColor || '#ffffff',
                }}
              >
                {buttonText}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Right Side - Image Grid */}
          <div className="w-full">
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {/* First Row - Two equal images */}
                {images[0] && (
                  <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
                    <Image
                      src={images[0].url}
                      alt={images[0].alt}
                      fill
                      unoptimized
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      onError={e => {
                        console.error('Image load error:', images[0].url);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {images[1] && (
                  <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
                    <Image
                      src={images[1].url}
                      alt={images[1].alt}
                      fill
                      unoptimized
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      onError={e => {
                        console.error('Image load error:', images[1].url);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Second Row - One tall image on left, two stacked on right */}
                {images[2] && (
                  <div className="relative w-full h-[300px] row-span-2 overflow-hidden bg-gray-200">
                    <Image
                      src={images[2].url}
                      alt={images[2].alt}
                      fill
                      unoptimized
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      onError={e => {
                        console.error('Image load error:', images[2].url);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  {images[3] && (
                    <div className="relative w-full h-[142px] overflow-hidden bg-gray-200">
                      <Image
                        src={images[3].url}
                        alt={images[3].alt}
                        fill
                        unoptimized
                        className="object-cover hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        onError={e => {
                          console.error('Image load error:', images[3].url);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  {images[4] && (
                    <div className="relative w-full h-[142px] overflow-hidden bg-gray-200">
                      <Image
                        src={images[4].url}
                        alt={images[4].alt}
                        fill
                        unoptimized
                        className="object-cover hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        onError={e => {
                          console.error('Image load error:', images[4].url);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Third Row - Two equal images */}
                {images[5] && (
                  <div className="relative w-full h-[200px] overflow-hidden bg-gray-200">
                    <Image
                      src={images[5].url}
                      alt={images[5].alt}
                      fill
                      unoptimized
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      onError={e => {
                        console.error('Image load error:', images[5].url);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              // Fallback placeholder
              <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center h-[400px]">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
