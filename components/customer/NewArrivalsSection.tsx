'use client';

import React, { useRef, useEffect } from 'react';
import CardTwo from './CardTwo';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';
import { productType } from '@/type';

const NewArrivalsSection = ({ products }: { products: productType[] }) => {
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

  const list = products && products.length > 0 ? products : [];

  return (
    <section className="relative w-full">
      
      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <CardTwo collectionSlug={item.category || 'perfumes'} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          ref={prevRef}
          aria-label="Previous"
          className="swiper-btn"
        >
          <FiArrowLeft />
        </button>
        <button
          ref={nextRef}
          aria-label="Next"
          className="swiper-btn"
        >
          <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
