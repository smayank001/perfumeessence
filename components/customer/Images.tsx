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
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-4">
      
      {/* THUMBNAILS */}
      <div
        className="
          flex xl:flex-col gap-3
          overflow-x-auto xl:overflow-y-auto
          max-h-[460px]
          xl:max-h-[600px]
          xl:w-28
          scrollbar-thin
        "
      >
        {images.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(item)}
            className={`
              flex-shrink-0
              w-22 h-24
              overflow-hidden
              transition
              ${
                activeImage === item
                  ? 'border-black'
                  : 'border-zinc-200 hover:border-zinc-400'
              }
            `}
          >
            <Image
              src={item}
              alt={`${name} thumbnail ${i}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="w-full max-w-[520px]  overflow-hidden">
        <Image
          src={activeImage}
          alt={name}
          width={600}
          height={600}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Images;
