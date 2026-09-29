import React from 'react';
import Image from 'next/image';
import ScrollZoom from '@/components/ui/ScrollZoom';

const ImageSection = () => {
  return (
    <section className="w-full px-0 sm:px-6 md:px-12 py-10">
      {/* ScrollZoom handles the scale logic */}
      <ScrollZoom>
        <div className="relative w-full h-[70vh] sm:h-[90vh] overflow-hidden rounded-none sm:rounded-[40px]">
          <Image 
            src="/hand.webp" 
            alt="THE PERFUME ESSENCE hand image of luxury jewelry and watches" 
            fill // Use fill for better responsive control
            priority // High priority as it's a large visual element
            className="object-cover object-right sm:object-center"
            sizes="100vw"
          />
          
          {/* Optional: Luxury Overlay for Text/Brand Feel */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </ScrollZoom>
    </section>
  );
}

export default ImageSection;