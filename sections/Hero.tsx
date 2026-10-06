'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface HeroSlide {
  id: number;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3?: string;
  subtext: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  notesTag: string;
  image: string;
  alt: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'THE PERFUME ESSENCE • EST. 2024',
    headingLine1: '',
    headingLine2: '',
    headingLine3: '',
    subtext:
      '',
    primaryBtnText: 'SHOP PERFUMES',
    primaryBtnLink: '/collections/perfumes',
    secondaryBtnText: 'EXPLORE COLLECTION',
    secondaryBtnLink: '/collections/all',
    notesTag: 'Extrait de Parfum • Rare Amber & Night Jasmine',
    image: '/moon_essence_1.jpg',
    alt: 'THE PERFUME ESSENCE - Moon Essence Luxury Perfume Campaign',
  },
  {
    id: 2,
    eyebrow: 'MOON ESSENCE • HAUTE PARFUMERIE',
    headingLine1: '',
    headingLine2: '',
    headingLine3: '',
    subtext:
      '',
    primaryBtnText: 'DISCOVER MOON ESSENCE',
    primaryBtnLink: '/collections/perfumes',
    secondaryBtnText: 'SIGNATURE EDITIONS',
    secondaryBtnLink: '/collections/deals',
    notesTag: 'Amethyst Nights • Moonlight Violet & Mysore Sandalwood',
    image: '/moon_essence_2.jpg',
    alt: 'MOON ESSENCE - Amethyst Nights Nocturnal Fragrance Campaign',
  },
  {
    id: 3,
    eyebrow: 'THE SIGNATURE COLLECTION',
    headingLine1: '',
    headingLine2: '',
    headingLine3: '',
    subtext:
      ', captivating impression.',
    primaryBtnText: 'SHOP BESTSELLERS',
    primaryBtnLink: '/collections/deals',
    secondaryBtnText: 'ALL EDITIONS',
    secondaryBtnLink: '/collections/all',
    notesTag: 'Private Atelier • Royal Oud & Amber Céleste',
    image: '/moon_essence_3.jpg',
    alt: 'THE SIGNATURE COLLECTION - Haute Parfumerie Flacons',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrent(idx);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = setInterval(nextSlide, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isAutoPlaying]);

  const activeSlide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#19151D] text-[#F7F2E8] select-none font-serif min-h-[640px] h-[82vh] sm:h-[86vh] lg:h-[88vh] max-h-[940px] flex items-center"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      aria-label="Moon Essence Luxury Hero Slider"
    >
      {/* Background Slides with Smooth Luxury Crossfade & Subtle Zoom */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeSlide.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Cinematic Moon Essence Atmosphere & Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#19151D]/90 via-[#21132F]/70 to-[#19151D]/30 md:from-[#19151D]/95 md:via-[#21132F]/65 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#19151D] via-transparent to-[#19151D]/40" />
          <div className="absolute inset-0 bg-[#2C183D]/15 pointer-events-none mix-blend-color" />
        </motion.div>
      </AnimatePresence>

      {/* Foreground Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 flex items-center">
        <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6">

          {/* Eyebrow & Notes Badge */}
          <motion.div
            key={`eyebrow-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 sm:w-12 bg-[#C8A45D]" />
            <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#C8A45D] font-normal">
              {activeSlide.eyebrow}
            </span>
          </motion.div>

          {/* Editorial Main Heading */}
          <motion.div
            key={`heading-${current}`}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.05] tracking-tight font-normal text-[#F7F2E8] drop-shadow-sm">
              <span>{activeSlide.headingLine1}</span> <br />
              <span className="italic text-[#DCC7A3] font-normal">{activeSlide.headingLine2}</span>{' '}
              {activeSlide.headingLine3 && (
                <>
                  <br />
                  <span>{activeSlide.headingLine3}</span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            key={`subtext-${current}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-[#F7F2E8]/85 max-w-xl font-normal leading-relaxed tracking-wide"
          >
            {activeSlide.subtext}
          </motion.p>

          {/* Notes Tag */}
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 py-1 px-3 bg-[#21132F]/80 backdrop-blur-sm border border-[#C8A45D]/40 text-[10px] sm:text-[11px] text-[#DCC7A3] tracking-[0.18em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
            <span>{activeSlide.notesTag}</span>
          </motion.div>

          {/* Call To Action Buttons */}
          <motion.div
            key={`buttons-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2"
          >
            <Link
              href={activeSlide.primaryBtnLink}
              className="btn-luxury-primary !bg-[#21132F] !text-[#F7F2E8] !border-[#C8A45D] hover:!bg-[#C8A45D] hover:!text-[#19151D] shadow-[0_8px_24px_-6px_rgba(33,19,47,0.6)]"
            >
              <span>{activeSlide.primaryBtnText}</span>
              <FiArrowRight className="ml-2.5 w-4 h-4" />
            </Link>

            {activeSlide.secondaryBtnText && activeSlide.secondaryBtnLink && (
              <Link
                href={activeSlide.secondaryBtnLink}
                className="btn-luxury-ghost-light"
              >
                <span>{activeSlide.secondaryBtnText}</span>
              </Link>
            )}
          </motion.div>

        </div>
      </div>

      {/* Slider Left & Right Circular Controls */}
      <div className="hidden sm:flex absolute right-6 md:right-12 bottom-12 z-30 items-center gap-3">
        <button
          onClick={prevSlide}
          aria-label="Previous Campaign Slide"
          className="w-11 h-11 rounded-full border border-[#F7F2E8]/30 bg-[#19151D]/50 backdrop-blur-md text-[#F7F2E8] flex items-center justify-center hover:border-[#C8A45D] hover:bg-[#21132F] hover:text-[#C8A45D] transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Campaign Slide"
          className="w-11 h-11 rounded-full border border-[#F7F2E8]/30 bg-[#19151D]/50 backdrop-blur-md text-[#F7F2E8] flex items-center justify-center hover:border-[#C8A45D] hover:bg-[#21132F] hover:text-[#C8A45D] transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Editorial Progress Indicators (01 —— 02 —— 03) */}
      <div className="absolute left-5 sm:left-8 lg:left-12 bottom-6 sm:bottom-10 z-30 flex items-center gap-4 sm:gap-6">
        {slides.map((s, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group flex items-center gap-2.5 cursor-pointer py-2 focus:outline-none"
            >
              <span
                className={`text-[11px] sm:text-xs tracking-[0.2em] font-serif transition-colors duration-300 ${isActive ? 'text-[#C8A45D] font-semibold' : 'text-[#F7F2E8]/50 group-hover:text-[#F7F2E8]'
                  }`}
              >
                0{s.id}
              </span>
              <span
                className={`h-[1.5px] transition-all duration-500 ease-out ${isActive
                  ? 'w-10 sm:w-16 bg-[#C8A45D]'
                  : 'w-4 sm:w-6 bg-[#F7F2E8]/30 group-hover:w-8 group-hover:bg-[#F7F2E8]/70'
                  }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
