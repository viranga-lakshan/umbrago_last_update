import Image from 'next/image';

export default function VisitorGuidelinesSection({ data }) {
  if (!data) return null;

  const { eyebrowLabel, title, bodyText, buttonLabel, buttonLink, sideImage, backgroundColor } =
    data;

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: backgroundColor || '#ebebeb' }}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            {/* Eyebrow Label */}
            {eyebrowLabel && (
              <div className="relative">
                <h3 className="text-[18px] leading-[24px] font-bold text-[#1B1F27] mb-2 uppercase">
                  {eyebrowLabel}
                </h3>
                <div className="w-12 h-1 bg-[#1B1F27]"></div>
              </div>
            )}

            {/* Title */}
            {title && (
              <h1 className="text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] font-medium text-[#1B1F27] heading-font">
                {title}
              </h1>
            )}

            {/* Body Text */}
            {bodyText && (
              <p className="text-[18px] lg:text-[20px] leading-relaxed text-[#4D4E56] max-w-2xl">
                {bodyText}
              </p>
            )}

            {/* Button */}
            {buttonLabel && buttonLink && (
              <div>
                <a
                  href={buttonLink}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#1B1F27] text-white text-[16px] font-semibold hover:bg-[#2a2f3a] transition-colors border border-[#1B1F27]"
                >
                  {buttonLabel}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full h-[300px] lg:h-[500px] xl:h-[600px]">
            {sideImage && (
              <Image
                src={sideImage}
                alt={title || 'Visitor Guidelines'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
