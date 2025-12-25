import Image from 'next/image';

export default function ServiceSection({
  title,
  description,
  image,
  reverse = false,
  backgroundColor = '#ffffff',
}) {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor }}>
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
            {title && (
              <h2 className="text-[32px] xl:text-[48px] leading-[40px] xl:leading-[56px] font-medium heading-font mb-4 lg:mb-6 text-[#1B1F27]">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-[#666666] text-[16px] lg:text-[18px] leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>

          {/* Image */}
          <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
            {image && (
              <div className="relative w-full h-[300px] lg:h-[400px] xl:h-[500px] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={title || 'Service image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
