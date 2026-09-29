'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import RotatingText from '@/components/ui/RotatingText'
import { serif } from '@/lib/fonts'
import Image from 'next/image'
import Link from 'next/link'

const sliderImages = [
  { src: '/Images/image.png', alt: 'THE PERFUME ESSENCE luxury collection 1' },
  { src: '/Images/image copy.png', alt: 'THE PERFUME ESSENCE luxury collection 2' },
  { src: '/Images/image copy 2.png', alt: 'THE PERFUME ESSENCE luxury collection 3' },
  { src: '/Images/image copy 3.png', alt: 'THE PERFUME ESSENCE luxury collection 4' },
  { src: '/Images/image copy 4.png', alt: 'THE PERFUME ESSENCE luxury collection 5' },
  { src: '/Images/image copy 5.png', alt: 'THE PERFUME ESSENCE luxury collection 6' },
  { src: '/Images/image copy 6.png', alt: 'THE PERFUME ESSENCE luxury collection 7' },
  { src: '/Images/image copy 7.png', alt: 'THE PERFUME ESSENCE luxury collection 8' },
  { src: '/Images/image copy 8.png', alt: 'THE PERFUME ESSENCE luxury collection 9' },
  { src: '/Images/image copy 9.png', alt: 'THE PERFUME ESSENCE luxury collection 10' },
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Autonomous auto-slider: continues moving smoothly on its own
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 3800)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [nextSlide, currentIndex])

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className='relative w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-1 pb-6 sm:pb-10 flex flex-col items-center overflow-hidden'>
      {/* Refined Rotating Header */}
      <div className='text-center my-2 sm:my-3'>
        <span className='text-[10px] sm:text-xs uppercase tracking-[0.35em] text-amber-800 font-semibold mb-1 block'>
          THE PERFUME ESSENCE • HAUTE PARFUMERIE
        </span>
        <RotatingText
          texts={['Luxury Perfumes', 'Signature Fragrances', 'Exclusive Editions', 'Artisanal Scents']}
          mainClassName="px-4 text-2xl sm:text-3xl md:text-5xl lg:text-[54px] font-normal text-zinc-900 text-center max-w-4xl mx-auto my-1 tracking-tight"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2800}
        />
      </div>

      {/* Slider Container - Decreased height & perfect framing to avoid cutting image */}
      <div
        className='relative w-full h-[45vh] sm:h-[55vh] md:h-[64vh] lg:h-[68vh] min-h-[300px] sm:min-h-[400px] max-h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl select-none group shadow-2xl border border-stone-200/70 bg-stone-950'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            className='absolute inset-0 w-full h-full'
          >
            <Image
              src={sliderImages[currentIndex].src}
              alt={sliderImages[currentIndex].alt}
              fill
              priority={currentIndex === 0 || currentIndex === 1}
              sizes="(max-width: 768px) 100vw, 1440px"
              className="w-full h-full object-contain"
            />
            {/* Elegant Luxury Vignette Overlays */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 pointer-events-none' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none' />
          </motion.div>
        </AnimatePresence>

        {/* Previous Slide Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className='absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover:opacity-100'
        >
          <FiChevronLeft className='w-5 h-5 sm:w-6 sm:h-6' />
        </button>

        {/* Next Slide Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className='absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover:opacity-100'
        >
          <FiChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
        </button>

        {/* Call To Action Buttons */}
        <div className='absolute w-full flex flex-row justify-center items-center gap-3 sm:gap-4 left-1/2 bottom-12 sm:bottom-14 -translate-x-1/2 z-20 px-4'>
          <Link
            className={`${serif.className} text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-medium backdrop-blur-md border rounded-full border-white/80 bg-white/25 text-white hover:bg-white hover:text-black text-center shadow-2xl hover:scale-105 transition-all duration-300`}
            href="/collections"
          >
            Explore Collections
          </Link>
          <Link
            className={`${serif.className} text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2.5 sm:py-3 font-medium border rounded-full border-zinc-700 bg-zinc-950/80 text-white hover:bg-black hover:border-amber-600/50 text-center shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-md`}
            href="/collections/perfumes"
          >
            Shop Perfumes
          </Link>
        </div>

        {/* Slide Indicator Dots */}
        <div className='absolute bottom-3.5 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10'>
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${idx === currentIndex
                ? 'w-7 sm:w-8 h-1.5 bg-amber-400 shadow-sm'
                : 'w-2 sm:w-2.5 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero


