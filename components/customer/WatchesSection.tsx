'use client';

import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import { productType } from '@/type';
import CardTwo from './CardTwo';

const WatchesSection = ({ watches }: { watches: productType[] }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const list = watches && watches.length > 0 ? watches : [];

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 16 },
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="!pb-4"
      >
        {list.map((item: productType, index) => (
          <SwiperSlide key={item._id || index} className="h-auto">
            <CardTwo collectionSlug={item.category || 'perfumes'} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Refined Navigation Controls */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#D8CEDA]">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#68447F]">
          {list.length} Featured Items
        </span>

        <div className="flex items-center gap-3">
          <button
            ref={prevRef}
            aria-label="Previous Featured Items"
            className="w-10 h-10 border border-[#D8CEDA] bg-[#FFFFFF] hover:bg-[#21132F] hover:text-[#F7F2E8] hover:border-[#21132F] transition-all flex items-center justify-center text-[#21132F] cursor-pointer shadow-sm"
          >
            <FiArrowLeft className="w-4 h-4" />
          </button>
          <button
            ref={nextRef}
            aria-label="Next Featured Items"
            className="w-10 h-10 border border-[#D8CEDA] bg-[#FFFFFF] hover:bg-[#21132F] hover:text-[#F7F2E8] hover:border-[#21132F] transition-all flex items-center justify-center text-[#21132F] cursor-pointer shadow-sm"
          >
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchesSection;
