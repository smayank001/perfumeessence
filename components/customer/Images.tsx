'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Images = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  const [activeImage, setActiveImage] = useState(images[0] || '/Images/logo.png');

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-4 font-serif">
      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div
          className="
            flex xl:flex-col gap-3
            overflow-x-auto xl:overflow-y-auto
            max-h-[460px]
            xl:max-h-[600px]
            xl:w-24
            scrollbar-thin
          "
        >
          {images.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(item)}
              className={`
                flex-shrink-0
                w-20 h-24
                overflow-hidden
                bg-[#F5F0F7]
                border
                transition-all duration-300
                cursor-pointer
                ${
                  activeImage === item
                    ? 'border-[#C8A45D] shadow-sm'
                    : 'border-[#D8CEDA] hover:border-[#68447F] opacity-75 hover:opacity-100'
                }
              `}
            >
              <Image
                src={item}
                alt={`${name} thumbnail ${i}`}
                width={80}
                height={96}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* MAIN IMAGE */}
      <div className="w-full flex-1 relative aspect-[4/5] bg-[#F5F0F7] border border-[#D8CEDA] overflow-hidden group">
        <Image
          src={activeImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
};

export default Images;
